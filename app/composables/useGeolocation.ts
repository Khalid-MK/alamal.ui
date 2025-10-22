/**
 * Composable for handling geolocation and location preferences
 * Supports IP-based geolocation, manual location input, and localStorage persistence
 */

interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface GeolocationState {
  location: Ref<Location | null>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
}

export const useGeolocation = (): GeolocationState & {
  requestLocation: () => Promise<void>;
  setManualLocation: (location: Location) => void;
  clearLocation: () => void;
  getStoredLocation: () => Location | null;
} => {
  const location = useState<Location | null>("userLocation", () => null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const STORAGE_KEY = "prayer_times_location";

  /**
   * Get location from localStorage
   */
  const getStoredLocation = (): Location | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse stored location:", e);
    }
    return null;
  };

  /**
   * Save location to localStorage
   */
  const saveLocation = (loc: Location) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
    } catch (e) {
      console.error("Failed to save location:", e);
    }
  };

  /**
   * Get city name from coordinates using reverse geocoding
   */
  const getCityFromCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<{ city: string; country: string }> => {
    try {
      // Using Nominatim OpenStreetMap API for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
      );

      if (!response.ok) {
        throw new Error("Geocoding failed");
      }

      const data = await response.json();
      const address = data.address || {};

      const city =
        address.city ||
        address.town ||
        address.village ||
        address.state ||
        "Unknown City";
      const country = address.country || "Unknown Country";

      return { city, country };
    } catch (e) {
      console.error("Geocoding error:", e);
      return { city: "Unknown City", country: "Unknown Country" };
    }
  };

  /**
   * Request IP-based geolocation (no browser permission needed)
   */
  const requestLocation = async (): Promise<void> => {
    if (typeof window === "undefined") {
      error.value = "Geolocation is not available on the server";
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // Using ipapi.co for IP-based geolocation (free, no API key needed)
      // Free tier: 1,000 requests/day
      const response = await fetch("https://ipapi.co/json/");

      if (!response.ok) {
        throw new Error("Failed to detect location from IP");
      }

      const data = await response.json();

      // Check if we got valid data
      if (!data.city || !data.latitude || !data.longitude) {
        throw new Error("Invalid location data received");
      }

      const newLocation: Location = {
        city: data.city,
        country: data.country_name || data.country || "Unknown Country",
        latitude: data.latitude,
        longitude: data.longitude,
      };

      location.value = newLocation;
      saveLocation(newLocation);
    } catch (err: any) {
      error.value = "Failed to detect location from IP. Please try manually entering your city.";
      console.error("IP Geolocation error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Manually set location (when user selects from dropdown or search)
   */
  const setManualLocation = (loc: Location): void => {
    location.value = loc;
    saveLocation(loc);
    error.value = null;
  };

  /**
   * Clear stored location
   */
  const clearLocation = (): void => {
    location.value = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Load stored location on initialization
  onMounted(() => {
    const stored = getStoredLocation();
    if (stored) {
      location.value = stored;
    }
  });

  return {
    location,
    isLoading,
    error,
    requestLocation,
    setManualLocation,
    clearLocation,
    getStoredLocation,
  };
};
