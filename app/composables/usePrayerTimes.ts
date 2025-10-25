/**
 * Composable for fetching and managing Islamic prayer times using Aladhan API
 * Provides live countdown, prayer status detection, and automatic updates
 */

interface PrayerTime {
  name: string;
  displayName: string;
  startTime: string;
  iqamahTime: string;
  timestamp: number;
  icon: string;
  status: "completed" | "active" | "upcoming";
}

interface PrayerTimesData {
  prayers: PrayerTime[];
  nextPrayer: PrayerTime | null;
  countdown: string;
  hijriDate: string;
  gregorianDate: string;
  location: string;
}

interface UsePrayerTimesReturn {
  prayerData: Ref<PrayerTimesData | null>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  fetchPrayerTimes: (
    latitude: number,
    longitude: number,
    method?: number
  ) => Promise<void>;
  refreshPrayerTimes: () => Promise<void>;
}

export const usePrayerTimes = (): UsePrayerTimesReturn => {
  const prayerData = useState<PrayerTimesData | null>("prayerTimes", () => null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Store last fetch params for refresh
  const lastFetchParams = ref<{
    latitude: number;
    longitude: number;
    method: number;
  } | null>(null);

  // Calculation methods: https://aladhan.com/calculation-methods
  // 4 = Umm Al-Qura University, Makkah (default for Saudi Arabia)
  const DEFAULT_METHOD = 4;

  // Prayer icons
  const PRAYER_ICONS: Record<string, string> = {
    Fajr: "☀️",
    Sunrise: "🌅",
    Dhuhr: "☀️",
    Asr: "🌤️",
    Maghrib: "🌆",
    Isha: "🌙",
    Jummah: "🕌",
  };

  // Add 15 minutes to prayer start time for Iqamah (can be customized)
  const calculateIqamahTime = (startTime: string): string => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes + 15, 0, 0);
    return date.toTimeString().slice(0, 5);
  };

  // Convert 24h time to timestamp for comparison
  const timeToTimestamp = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  };

  // Format countdown time
  const formatCountdown = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Determine prayer status based on current time
  const determinePrayerStatus = (
    prayers: PrayerTime[],
    currentTimestamp: number
  ): { updatedPrayers: PrayerTime[]; nextPrayer: PrayerTime | null } => {
    let nextPrayer: PrayerTime | null = null;

    // Filter out Sunrise as it's not a prayer time
    const actualPrayers = prayers
      .filter((p) => p.name !== "Sunrise")
      .sort((a, b) => a.timestamp - b.timestamp);

    const updatedPrayers = actualPrayers.map((prayer) => {
      if (prayer.timestamp < currentTimestamp) {
        return { ...prayer, status: "completed" as const };
      } else if (!nextPrayer) {
        nextPrayer = prayer;
        return { ...prayer, status: "active" as const };
      } else {
        return { ...prayer, status: "upcoming" as const };
      }
    });

    // If all prayers are completed, next prayer is Fajr of tomorrow
    if (!nextPrayer && updatedPrayers.length > 0) {
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;
      const rolledPrayers = updatedPrayers.map((prayer, index) => {
        const rolledTimestamp = prayer.timestamp + ONE_DAY_MS;
        return {
          ...prayer,
          timestamp: rolledTimestamp,
          status: index === 0 ? ("active" as const) : ("upcoming" as const),
        };
      });

      nextPrayer = rolledPrayers[0] as PrayerTime;
      return { updatedPrayers: rolledPrayers, nextPrayer };
    }

    return { updatedPrayers, nextPrayer };
  };

  // Live countdown updater
  let countdownInterval: NodeJS.Timeout | null = null;

  const startCountdown = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
      if (!prayerData.value || !prayerData.value.nextPrayer) return;

      const now = Date.now();
      const timeUntilNext =
        prayerData.value.nextPrayer.timestamp - now;

      if (timeUntilNext <= 0) {
        // Prayer time reached, refresh data
        refreshPrayerTimes();
        return;
      }

      prayerData.value.countdown = formatCountdown(timeUntilNext);

      // Update prayer statuses
      const { updatedPrayers, nextPrayer } = determinePrayerStatus(
        prayerData.value.prayers,
        now
      );
      prayerData.value.prayers = updatedPrayers;
      prayerData.value.nextPrayer = nextPrayer;
    }, 1000); // Update every second
  };

  // Stop countdown when component unmounts
  onUnmounted(() => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  });

  /**
   * Fetch prayer times from Aladhan API
   */
  const fetchPrayerTimes = async (
    latitude: number,
    longitude: number,
    method: number = DEFAULT_METHOD
  ): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    // Store params for refresh
    lastFetchParams.value = { latitude, longitude, method };

    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.code !== 200) {
        throw new Error(data.data || "Failed to fetch prayer times");
      }

      const timings = data.data.timings;
      const date = data.data.date;
      const meta = data.data.meta;

      // Parse prayer times
      const prayers: PrayerTime[] = [
        {
          name: "Fajr",
          displayName: "Fajr",
          startTime: timings.Fajr,
          iqamahTime: calculateIqamahTime(timings.Fajr),
          timestamp: timeToTimestamp(timings.Fajr),
          icon: PRAYER_ICONS.Fajr,
          status: "upcoming",
        },
        {
          name: "Sunrise",
          displayName: "Sunrise",
          startTime: timings.Sunrise,
          iqamahTime: "",
          timestamp: timeToTimestamp(timings.Sunrise),
          icon: PRAYER_ICONS.Sunrise,
          status: "upcoming",
        },
        {
          name: "Dhuhr",
          displayName: "Dhuhr",
          startTime: timings.Dhuhr,
          iqamahTime: calculateIqamahTime(timings.Dhuhr),
          timestamp: timeToTimestamp(timings.Dhuhr),
          icon: PRAYER_ICONS.Dhuhr,
          status: "upcoming",
        },
        {
          name: "Asr",
          displayName: "Asr",
          startTime: timings.Asr,
          iqamahTime: calculateIqamahTime(timings.Asr),
          timestamp: timeToTimestamp(timings.Asr),
          icon: PRAYER_ICONS.Asr,
          status: "upcoming",
        },
        {
          name: "Maghrib",
          displayName: "Maghrib",
          startTime: timings.Maghrib,
          iqamahTime: calculateIqamahTime(timings.Maghrib),
          timestamp: timeToTimestamp(timings.Maghrib),
          icon: PRAYER_ICONS.Maghrib,
          status: "upcoming",
        },
        {
          name: "Isha",
          displayName: "Isha",
          startTime: timings.Isha,
          iqamahTime: calculateIqamahTime(timings.Isha),
          timestamp: timeToTimestamp(timings.Isha),
          icon: PRAYER_ICONS.Isha,
          status: "upcoming",
        },
      ];

      // Determine current prayer status
      const now = Date.now();
      const { updatedPrayers, nextPrayer } = determinePrayerStatus(prayers, now);

      // Calculate initial countdown
      const countdown = nextPrayer
        ? formatCountdown(nextPrayer.timestamp - now)
        : "N/A";

      // Format dates
      const hijriDate = `${date.hijri.day} ${date.hijri.month.en}, ${date.hijri.year}`;
      const gregorianDate = date.readable;

      prayerData.value = {
        prayers: updatedPrayers,
        nextPrayer,
        countdown,
        hijriDate,
        gregorianDate,
        location: `${meta.timezone}`,
      };

      // Start live countdown
      startCountdown();
    } catch (err: any) {
      console.error("Prayer times fetch error:", err);
      error.value = err.message || "Failed to fetch prayer times";
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Refresh prayer times using last fetch params
   */
  const refreshPrayerTimes = async (): Promise<void> => {
    if (!lastFetchParams.value) {
      console.warn("No previous fetch params to refresh");
      return;
    }

    const { latitude, longitude, method } = lastFetchParams.value;
    await fetchPrayerTimes(latitude, longitude, method);
  };

  return {
    prayerData,
    isLoading,
    error,
    fetchPrayerTimes,
    refreshPrayerTimes,
  };
};
