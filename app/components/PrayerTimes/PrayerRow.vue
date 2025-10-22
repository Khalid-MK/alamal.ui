<template>
  <div
    :class="[
      'prayer-row',
      'relative py-3.5 px-4 rounded-xl transition-all duration-400',
      statusClasses,
    ]"
  >
    <!-- Prayer Icon & Name -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3.5">
        <span class="text-xl prayer-icon" :class="iconClasses">{{
          prayer.icon
        }}</span>
        <div>
          <h4 class="font-medium text-base" :class="nameClasses">
            {{ $t(prayer.name) }}
          </h4>
          <p v-if="prayer.name === 'Sunrise'" class="text-[11px] calm-text-muted">
            {{ $t("NotAPrayer") }}
          </p>
        </div>
      </div>

      <!-- Times & Status -->
      <div class="flex items-center gap-4">
        <div class="text-right">
          <div class="text-sm font-medium leading-relaxed" :class="timeClasses">
            {{ formatTime(prayer.startTime) }}
          </div>
          <div
            v-if="prayer.iqamahTime && prayer.name !== 'Sunrise'"
            class="text-[11px] calm-text-muted mt-0.5"
          >
            {{ formatTime(prayer.iqamahTime) }}
          </div>
        </div>

        <!-- Peaceful Status Indicator -->
        <div class="flex items-center justify-center w-5">
          <div v-if="prayer.status === 'completed'" class="status-dot-completed"></div>
          <div v-else-if="prayer.status === 'active'" class="status-dot-active"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Prayer {
  name: string;
  displayName: string;
  startTime: string;
  iqamahTime: string;
  timestamp: number;
  icon: string;
  status: "completed" | "active" | "upcoming";
}

interface Props {
  prayer: Prayer;
}

const props = defineProps<Props>();

// Format time from 24h to 12h format
const formatTime = (time: string): string => {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Calm & Peaceful computed classes
const statusClasses = computed(() => {
  switch (props.prayer.status) {
    case "completed":
      return "opacity-55 hover:opacity-70";
    case "active":
      return "calm-active-row";
    case "upcoming":
      return "hover:bg-calm-hover";
    default:
      return "";
  }
});

const nameClasses = computed(() => {
  switch (props.prayer.status) {
    case "completed":
      return "calm-text-muted";
    case "active":
      return "calm-text-active";
    case "upcoming":
      return "calm-text";
    default:
      return "calm-text";
  }
});

const timeClasses = computed(() => {
  switch (props.prayer.status) {
    case "completed":
      return "calm-text-muted";
    case "active":
      return "calm-text-primary font-semibold";
    case "upcoming":
      return "calm-text";
    default:
      return "calm-text";
  }
});

const iconClasses = computed(() => {
  switch (props.prayer.status) {
    case "completed":
      return "opacity-45 grayscale";
    case "active":
      return "filter-none";
    case "upcoming":
      return "opacity-80";
    default:
      return "opacity-80";
  }
});
</script>

<style scoped>
/* Calm & Peaceful Prayer Row Styles */
.calm-text {
  color: #4a5568;
}

.calm-text-muted {
  color: #9ca3af;
}

.calm-text-active {
  color: #2d3748;
}

.calm-text-primary {
  color: #5da9a6;
}

.calm-active-row {
  background: linear-gradient(90deg, rgba(93, 169, 166, 0.08) 0%, rgba(127, 178, 133, 0.08) 100%);
  border-left: 3px solid #5da9a6;
  padding-left: 13px;
}

.calm-hover:hover {
  background: rgba(93, 169, 166, 0.04);
}

.hover\:bg-calm-hover:hover {
  background: rgba(93, 169, 166, 0.04);
}

.status-dot-completed {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a0aec0;
}

.status-dot-active {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5da9a6 0%, #7fb285 100%);
  box-shadow: 0 0 10px rgba(93, 169, 166, 0.4);
  animation: gentle-pulse 2.5s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.85;
  }
}

.prayer-icon {
  transition: all 0.3s ease;
}

.prayer-row {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
