<template>
  <div>
    <!-- Floating Button - Calm & Peaceful -->
    <transition name="button-fade">
      <button
        ref="floatingButton"
        v-if="!isExpanded"
        @click.stop="toggleWidget"
        :class="[
          'fixed z-[9998] w-14 h-14 rounded-full',
          'calm-button',
          'flex items-center justify-center',
          'hover:shadow-calm-lg active:scale-[0.97] transition-all duration-300',
          isRTL ? 'left-6 bottom-6' : 'right-6 bottom-6',
        ]"
        :aria-label="$t('OpenPrayerTimes')"
      >
        <!-- Peaceful Mosque Icon -->
        <span class="text-2xl filter drop-shadow-sm">🕌</span>

        <!-- Gentle Pulsing Indicator -->
        <div
          v-if="isNearPrayerTime"
          class="absolute top-1 right-1 w-3 h-3 calm-pulse rounded-full"
        ></div>
      </button>
    </transition>

    <!-- Expanded Widget Panel - Calm & Peaceful -->
    <transition name="panel-slide">
      <div
        v-if="isExpanded"
        :class="[
          'fixed z-[9998] w-[380px] rounded-[20px]',
          'calm-panel',
          'flex flex-col overflow-hidden',
          isRTL ? 'left-4 bottom-4' : 'right-4 bottom-4',
        ]"
        style="max-height: calc(100vh - 100px)"
      >
        <!-- Calm Header with Gradient -->
        <div class="calm-header px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-white">{{ $t("PrayerTimes") }}</h3>
              <p v-if="prayerData" class="text-sm text-white/90 mt-1">
                {{ locationDisplay }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <!-- Peaceful Settings Button -->
              <!-- <button
                @click="openSettings"
                class="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
                :aria-label="$t('Settings')"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button> -->

              <!-- Peaceful Close Button -->
              <button
                @click="toggleWidget"
                class="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
                :aria-label="$t('Close')"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="flex flex-col items-center justify-center h-full p-6"
          >
            <div class="animate-spin text-4xl mb-4">⏳</div>
            <p class="text-gray-600">{{ $t("LoadingPrayerTimes") }}...</p>
          </div>

          <!-- Error State -->
          <div
            v-else-if="error"
            class="flex flex-col items-center justify-center h-full p-6 text-center"
          >
            <span class="text-4xl mb-4">⚠️</span>
            <p class="text-red-500 mb-4">{{ error }}</p>
            <button
              @click="handleRefresh"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              🔄 {{ $t("Retry") }}
            </button>
          </div>

          <!-- Prayer Times Content - Calm & Peaceful -->
          <div v-else-if="prayerData" class="p-5">
            <!-- Next Prayer Countdown - Calm Design -->
            <div
              v-if="prayerData.nextPrayer"
              class="mb-5 p-4 calm-next-prayer rounded-2xl"
            >
              <div class="text-center">
                <p class="text-xs text-calm-primary mb-2 font-medium">{{ $t("NextPrayer") }}</p>
                <h4 class="text-xl font-semibold text-calm-text mb-2">
                  {{ $t(prayerData.nextPrayer.name) }}
                </h4>
                <div class="text-3xl font-bold calm-countdown mb-2">
                  {{ prayerData.countdown }}
                </div>
                <p class="text-sm text-calm-text/80">
                  {{ formatTime(prayerData.nextPrayer.startTime) }}
                </p>
              </div>
            </div>

            <!-- All Prayer Times - Peaceful List -->
            <div class="space-y-2">
              <PrayerTimesPrayerRow
                v-for="prayer in filteredPrayers"
                :key="prayer.name"
                :prayer="prayer"
              />
            </div>
          </div>

          <!-- No Location State -->
          <div
            v-else
            class="flex flex-col items-center justify-center h-full p-6 text-center"
          >
            <span class="text-4xl mb-4">📍</span>
            <p class="text-gray-600 mb-4">
              {{ $t("PleaseSetYourLocation") }}
            </p>
            <button
              @click="openSettings"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              ⚙️ {{ $t("OpenSettings") }}
            </button>
          </div>
        </div>

        <!-- Footer - Calm & Peaceful -->
        <div
          v-if="prayerData"
          class="calm-footer px-5 py-4"
        >
          <div class="text-center text-sm text-calm-text/70 leading-relaxed">
            <p>{{ prayerData.gregorianDate }}</p>
            <p class="mt-1">{{ prayerData.hijriDate }}</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- Settings Modal -->
    <PrayerTimesSettingsModal
      :is-open="isSettingsOpen"
      :current-location="currentLocation"
      @close="closeSettings"
      @save="handleSaveSettings"
    />
  </div>
</template>

<script setup lang="ts">
const { locale, localeProperties } = useI18n();
const { location, requestLocation, setManualLocation } = useGeolocation();
const { prayerData, isLoading, error, fetchPrayerTimes, refreshPrayerTimes } =
  usePrayerTimes();

// State
const isExpanded = ref(true);
const isSettingsOpen = ref(false);
const currentLocation = ref<any>(null);
const floatingButton = ref<HTMLButtonElement | null>(null);

// RTL support
const isRTL = computed(() => localeProperties.value.dir === "rtl");

// Format time from 24h to 12h format
const formatTime = (time: string): string => {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);

  if (hours === undefined || minutes === undefined) return "";

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Filter out Sunrise from display (it's not a prayer)
const filteredPrayers = computed(() => {
  if (!prayerData.value) return [];
  return prayerData.value.prayers;
});

// Location display
const locationDisplay = computed(() => {
  if (!currentLocation.value) return "Unknown";
  return `${currentLocation.value.city}, ${currentLocation.value.country}`;
});

// Next prayer countdown for badge
const nextPrayerCountdown = computed(() => {
  if (!prayerData.value?.countdown) return null;

  // Parse countdown to get minutes
  const match = prayerData.value.countdown.match(/(\d+)h|(\d+)m/g);
  if (!match) return null;

  let totalMinutes = 0;
  match.forEach((part) => {
    if (part.includes('h')) {
      totalMinutes += parseInt(part) * 60;
    } else if (part.includes('m')) {
      totalMinutes += parseInt(part);
    }
  });

  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }

  return null;
});

// Check if prayer time is near (within 15 minutes)
const isNearPrayerTime = computed(() => {
  if (!prayerData.value?.nextPrayer) return false;

  const now = Date.now();
  const timeUntil = prayerData.value.nextPrayer.timestamp - now;
  const minutesUntil = timeUntil / (1000 * 60);

  return minutesUntil > 0 && minutesUntil <= 15;
});

// Button pulse class
const buttonPulseClass = computed(() => {
  return isNearPrayerTime.value ? 'animate-pulse-glow' : '';
});

// Toggle widget
const toggleWidget = () => {
  console.log('Toggle widget clicked, current state:', isExpanded.value);
  isExpanded.value = !isExpanded.value;
  console.log('New state:', isExpanded.value);
};

// Open settings
const openSettings = () => {
  isSettingsOpen.value = true;
};

// Close settings
const closeSettings = () => {
  isSettingsOpen.value = false;
};

// Handle save settings
const handleSaveSettings = async (settings: any) => {
  if (settings.location) {
    currentLocation.value = settings.location;
    setManualLocation(settings.location);

    // Fetch prayer times with new location
    await fetchPrayerTimes(
      settings.location.latitude,
      settings.location.longitude,
      settings.method
    );
  }

  closeSettings();
};

// Handle refresh
const handleRefresh = async () => {
  await refreshPrayerTimes();
};

// Initialize on mount
onMounted(async () => {
  // Check for stored location
  const storedLocation = location.value;

  if (storedLocation) {
    currentLocation.value = storedLocation;
    await fetchPrayerTimes(
      storedLocation.latitude,
      storedLocation.longitude
    );
  } else {
    // Auto-detect location from IP on first load
    await requestLocation();
    if (location.value) {
      currentLocation.value = location.value;
      await fetchPrayerTimes(location.value.latitude, location.value.longitude);
    }
  }
});

// Widget stays open until explicitly closed - no click-outside behavior
// This creates a more peaceful, predictable user experience
</script>

<style scoped>
/* Calm & Peaceful Color Palette */
:deep(.text-calm-primary) {
  color: #5da9a6;
}

:deep(.text-calm-text) {
  color: #4a5568;
}

.calm-button {
  background: linear-gradient(135deg, #5da9a6 0%, #7fb285 100%);
  border: none;
  box-shadow: 0 4px 16px rgba(93, 169, 166, 0.3);
}

.calm-button:hover {
  box-shadow: 0 6px 24px rgba(93, 169, 166, 0.4);
  transform: translateY(-2px);
}

.shadow-calm-lg {
  box-shadow: 0 6px 24px rgba(93, 169, 166, 0.4);
}

.calm-panel {
  background: #fdfbf7;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.calm-header {
  background: linear-gradient(135deg, #5da9a6 0%, #7fb285 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.calm-next-prayer {
  background: linear-gradient(135deg, rgba(93, 169, 166, 0.08) 0%, rgba(127, 178, 133, 0.08) 100%);
  border: 1px solid rgba(93, 169, 166, 0.15);
}

.calm-countdown {
  background: linear-gradient(135deg, #5da9a6 0%, #7fb285 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.calm-footer {
  background: linear-gradient(to bottom, transparent 0%, rgba(93, 169, 166, 0.05) 100%);
  border-top: 1px solid rgba(93, 169, 166, 0.1);
}

.calm-pulse {
  background: linear-gradient(135deg, #7fb285 0%, #5da9a6 100%);
  animation: calm-pulse-animation 3s ease-in-out infinite;
}

@keyframes calm-pulse-animation {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

/* Peaceful Transitions */
.button-fade-enter-active,
.button-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.button-fade-enter-from,
.button-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.panel-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Calm Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(93, 169, 166, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(93, 169, 166, 0.2);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(93, 169, 166, 0.35);
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .fixed.w-\[380px\] {
    width: calc(100vw - 32px) !important;
    max-width: 380px;
  }
}
</style>
