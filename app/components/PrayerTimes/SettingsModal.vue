<template>
  <transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      @click="handleBackdropClick"
    >
      <!-- Calm Backdrop -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Calm Modal -->
      <div
        class="relative w-full max-w-md calm-modal overflow-hidden"
        @click.stop
      >
        <!-- Calm Header -->
        <div class="calm-modal-header px-6 py-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-medium text-white">{{ $t("PrayerSettings") }}</h3>
            </div>
            <button
              @click="close"
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

        <!-- Content -->
        <div class="px-6 py-6 space-y-6 max-h-[60vh] overflow-y-auto calm-scrollbar">
          <!-- Location Section -->
          <div class="space-y-4">
            <label class="block text-sm font-medium calm-label">
              {{ $t("Location") }}
            </label>

            <!-- Current Location Display -->
            <div
              v-if="currentLocation"
              class="calm-location-card p-4 rounded-xl"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium calm-text">
                    {{ currentLocation.city }}
                  </p>
                  <p class="text-xs calm-text-muted mt-1">
                    {{ currentLocation.country }}
                  </p>
                </div>
                <button
                  @click="clearLocation"
                  class="text-xs calm-text-danger hover:underline transition-all"
                >
                  {{ $t("Clear") }}
                </button>
              </div>
            </div>

            <!-- Location Actions -->
            <div class="flex gap-3">
              <button
                @click="handleAutoDetect"
                :disabled="isDetecting"
                class="calm-button-primary flex-1 px-4 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-medium"
              >
                <span v-if="isDetecting" class="inline-block animate-spin">⏳</span>
                {{ isDetecting ? $t("Detecting") : $t("DetectFromIP") }}
              </button>

              <button
                @click="showManualInput = !showManualInput"
                class="calm-button-secondary px-4 py-2.5 rounded-xl transition-all duration-300 font-medium"
              >
                {{ $t("Manual") }}
              </button>
            </div>

            <!-- Manual Input -->
            <div v-if="showManualInput" class="space-y-3 animate-slideDown">
              <input
                v-model="manualCity"
                type="text"
                :placeholder="$t('EnterCityName')"
                class="calm-input w-full px-4 py-2.5 rounded-xl"
              />
              <input
                v-model.number="manualLatitude"
                type="number"
                step="0.0001"
                :placeholder="$t('Latitude')"
                class="calm-input w-full px-4 py-2.5 rounded-xl"
              />
              <input
                v-model.number="manualLongitude"
                type="number"
                step="0.0001"
                :placeholder="$t('Longitude')"
                class="calm-input w-full px-4 py-2.5 rounded-xl"
              />
              <button
                @click="handleManualSubmit"
                :disabled="!canSubmitManual"
                class="calm-button-primary w-full px-4 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {{ $t("SetLocation") }}
              </button>
            </div>

            <!-- Location Error -->
            <p v-if="locationError" class="text-sm calm-text-danger">
              {{ locationError }}
            </p>
          </div>

          <!-- Calculation Method -->
          <div class="space-y-4">
            <label class="block text-sm font-medium calm-label">
              {{ $t("CalculationMethod") }}
            </label>
            <select
              v-model="selectedMethod"
              class="calm-select w-full px-4 py-2.5 rounded-xl"
            >
              <option
                v-for="method in calculationMethods"
                :key="method.value"
                :value="method.value"
              >
                {{ method.label }}
              </option>
            </select>
          </div>

          <!-- Time Format -->
          <div class="space-y-4">
            <label class="block text-sm font-medium calm-label">
              {{ $t("TimeFormat") }}
            </label>
            <div class="flex gap-3">
              <button
                @click="selectedTimeFormat = '12h'"
                :class="[
                  'flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-300',
                  selectedTimeFormat === '12h'
                    ? 'calm-button-active'
                    : 'calm-button-inactive',
                ]"
              >
                12-{{ $t("Hour") }}
              </button>
              <button
                @click="selectedTimeFormat = '24h'"
                :class="[
                  'flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-300',
                  selectedTimeFormat === '24h'
                    ? 'calm-button-active'
                    : 'calm-button-inactive',
                ]"
              >
                24-{{ $t("Hour") }}
              </button>
            </div>
          </div>

          <!-- Notifications Toggle (Future feature) -->
          <div class="space-y-4 opacity-60">
            <label class="block text-sm font-medium calm-label">
              {{ $t("Notifications") }}
            </label>
            <div
              class="flex items-center justify-between p-4 calm-disabled-card rounded-xl"
            >
              <span class="text-sm calm-text-muted"
                >{{ $t("EnableNotifications") }} ({{ $t("ComingSoon") }})</span
              >
              <input
                type="checkbox"
                disabled
                class="w-5 h-5 rounded"
              />
            </div>
          </div>
        </div>

        <!-- Calm Footer -->
        <div class="calm-modal-footer px-6 py-5 flex gap-3">
          <button
            @click="handleSave"
            class="calm-button-primary flex-1 px-5 py-3 rounded-xl font-medium transition-all duration-300"
          >
            {{ $t("SaveSettings") }}
          </button>
          <button
            @click="close"
            class="calm-button-secondary px-5 py-3 rounded-xl transition-all duration-300 font-medium"
          >
            {{ $t("Cancel") }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface Props {
  isOpen: boolean;
  currentLocation: Location | null;
}

interface Emits {
  (e: "close"): void;
  (e: "save", settings: {
    location: Location | null;
    method: number;
    timeFormat: string;
  }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { location, isLoading: isDetecting, error, requestLocation, clearLocation: clearGeoLocation } = useGeolocation();

// Local state
const showManualInput = ref(false);
const manualCity = ref("");
const manualLatitude = ref<number | null>(null);
const manualLongitude = ref<number | null>(null);
const locationError = ref<string | null>(null);

// Settings state
const selectedMethod = ref(4); // Default: Umm Al-Qura, Makkah
const selectedTimeFormat = ref("12h");

// Calculation methods
const calculationMethods = [
  { value: 0, label: "Jafari (Shia)" },
  { value: 1, label: "University of Islamic Sciences, Karachi" },
  { value: 2, label: "Islamic Society of North America (ISNA)" },
  { value: 3, label: "Muslim World League (MWL)" },
  { value: 4, label: "Umm Al-Qura University, Makkah" },
  { value: 5, label: "Egyptian General Authority of Survey" },
  { value: 7, label: "Institute of Geophysics, University of Tehran" },
  { value: 8, label: "Gulf Region" },
  { value: 9, label: "Kuwait" },
  { value: 10, label: "Qatar" },
  { value: 11, label: "Majlis Ugama Islam Singapura, Singapore" },
  { value: 12, label: "Union Organization islamic de France" },
];

// Computed
const canSubmitManual = computed(
  () =>
    manualCity.value.trim() &&
    manualLatitude.value !== null &&
    manualLongitude.value !== null
);

// Methods
const handleAutoDetect = async () => {
  locationError.value = null;
  await requestLocation();

  if (error.value) {
    locationError.value = error.value;
  }
};

const handleManualSubmit = () => {
  if (!canSubmitManual.value) return;

  const newLocation: Location = {
    city: manualCity.value.trim(),
    country: "Manual Entry",
    latitude: manualLatitude.value!,
    longitude: manualLongitude.value!,
  };

  emit("save", {
    location: newLocation,
    method: selectedMethod.value,
    timeFormat: selectedTimeFormat.value,
  });

  // Reset manual input
  showManualInput.value = false;
  manualCity.value = "";
  manualLatitude.value = null;
  manualLongitude.value = null;
};

const clearLocation = () => {
  clearGeoLocation();
  locationError.value = null;
};

const handleSave = () => {
  // Use detected location or current location
  const finalLocation = location.value || props.currentLocation;

  emit("save", {
    location: finalLocation,
    method: selectedMethod.value,
    timeFormat: selectedTimeFormat.value,
  });
};

const close = () => {
  emit("close");
};

const handleBackdropClick = () => {
  close();
};

// Initialize with current location
watch(
  () => props.currentLocation,
  (newLocation) => {
    if (newLocation) {
      // Pre-fill values if needed
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Calm & Peaceful Modal Styles */
.calm-modal {
  background: #fdfbf7;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.calm-modal-header {
  background: linear-gradient(135deg, #5da9a6 0%, #7fb285 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.calm-modal-footer {
  background: linear-gradient(to top, rgba(93, 169, 166, 0.05) 0%, transparent 100%);
  border-top: 1px solid rgba(93, 169, 166, 0.1);
}

.calm-text {
  color: #4a5568;
}

.calm-text-muted {
  color: #9ca3af;
}

.calm-text-danger {
  color: #dc2626;
}

.calm-label {
  color: #4a5568;
}

.calm-location-card {
  background: linear-gradient(135deg, rgba(93, 169, 166, 0.06) 0%, rgba(127, 178, 133, 0.06) 100%);
  border: 1px solid rgba(93, 169, 166, 0.15);
}

.calm-disabled-card {
  background: rgba(156, 163, 175, 0.08);
  border: 1px solid rgba(156, 163, 175, 0.15);
}

.calm-button-primary {
  background: linear-gradient(135deg, #5da9a6 0%, #7fb285 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(93, 169, 166, 0.25);
}

.calm-button-primary:hover:not(:disabled) {
  box-shadow: 0 4px 16px rgba(93, 169, 166, 0.35);
  transform: translateY(-1px);
}

.calm-button-secondary {
  background: rgba(93, 169, 166, 0.08);
  color: #5da9a6;
  border: 1px solid rgba(93, 169, 166, 0.2);
}

.calm-button-secondary:hover {
  background: rgba(93, 169, 166, 0.12);
  border-color: rgba(93, 169, 166, 0.3);
}

.calm-button-active {
  background: linear-gradient(135deg, #5da9a6 0%, #7fb285 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(93, 169, 166, 0.25);
}

.calm-button-inactive {
  background: rgba(93, 169, 166, 0.08);
  color: #6b7280;
  border: 1px solid rgba(93, 169, 166, 0.15);
}

.calm-button-inactive:hover {
  background: rgba(93, 169, 166, 0.12);
}

.calm-input {
  background: white;
  border: 1px solid rgba(93, 169, 166, 0.2);
  color: #4a5568;
  transition: all 0.3s ease;
}

.calm-input:focus {
  outline: none;
  border-color: #5da9a6;
  box-shadow: 0 0 0 3px rgba(93, 169, 166, 0.1);
}

.calm-input::placeholder {
  color: #9ca3af;
}

.calm-select {
  background: white;
  border: 1px solid rgba(93, 169, 166, 0.2);
  color: #4a5568;
  transition: all 0.3s ease;
}

.calm-select:focus {
  outline: none;
  border-color: #5da9a6;
  box-shadow: 0 0 0 3px rgba(93, 169, 166, 0.1);
}

/* Calm Scrollbar */
.calm-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.calm-scrollbar::-webkit-scrollbar-track {
  background: rgba(93, 169, 166, 0.05);
  border-radius: 10px;
}

.calm-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(93, 169, 166, 0.2);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.calm-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(93, 169, 166, 0.35);
}

/* Peaceful Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .calm-modal,
.modal-fade-leave-active .calm-modal {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from .calm-modal {
  transform: scale(0.95) translateY(20px);
}

.modal-fade-leave-to .calm-modal {
  transform: scale(0.95) translateY(20px);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.4s ease-out;
}
</style>
