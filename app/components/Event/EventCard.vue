<template>
  <div class="event-card group" :dir="direction">
    <div class="relative">
      <!-- Thumbnail with hover effect -->
      <div class="thumbnail relative overflow-hidden rounded-xl image-container">
        <NuxtLink :to="`/event/${slug}`" class="block relative">
          <!-- Badge (Hot/New) - Top Left -->
          <div
            v-if="badge"
            class="absolute z-10 badge"
            :class="[
              badgeClasses,
              direction === 'rtl' ? 'right-4 top-4' : 'left-4 top-4'
            ]"
          >
            {{ $t(`event.badge.${badge}`) }}
          </div>

          <img
            :src="image"
            :alt="title"
            class="event-image w-full h-auto rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </NuxtLink>
      </div>

      <!-- Content card (overlapping style) -->
      <div
        class="content-card relative bg-white dark:bg-dark-surface rounded-xl shadow-darker mx-7 md:mx-6 sm:mx-4 -mt-44 md:-mt-32 sm:-mt-28 p-8 md:p-6 sm:p-5 transition-all duration-300"
      >
        <!-- Read More Button (appears on hover) -->
        <div
          class="read-more-btn absolute -top-10 group-hover:-top-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
          :class="direction === 'rtl' ? 'left-8 md:left-6' : 'right-8 md:right-6'"
        >
          <NuxtLink
            :to="`/event/${slug}`"
            class="flex items-center justify-center w-15 h-15 rounded-full bg-primary hover:bg-secondary text-white transition-all duration-300"
            :aria-label="`${$t('event.viewDetails')} - ${title}`"
          >
            <IconButton variant="round" icon="icon-4" aria-label="Navigate" />
          </NuxtLink>
        </div>

        <!-- Title -->
        <h5 class="mb-3">
          <NuxtLink
            :to="`/event/${slug}`"
            class="text-xl md:text-lg font-bold text-heading hover:text-primary transition-colors duration-300 line-clamp-2"
          >
            {{ title }}
          </NuxtLink>
        </h5>

        <!-- Chips Rows -->
        <div class="chips-rows mb-4">
          <!-- First Row: Category and Price -->
          <div class="flex justify-between items-center gap-2 mb-2">
            <!-- Category Chip (outlined) -->
            <CommonChip
              variant="outlined"
              color="primary"
              size="small"
            >
              {{ category }}
            </CommonChip>

            <!-- Price Chip (filled) -->
            <CommonChip
              variant="filled"
              :color="price === 0 ? 'green' : 'blue'"
              size="small"
            >
              {{ price === 0 ? $t('event.free') : `$${price}` }}
            </CommonChip>
          </div>

          <!-- Second Row: Registration Status -->
          <div>
            <CommonChip
              variant="filled"
              :color="statusColor"
              size="small"
            >
              {{ $t(`event.status.${registrationStatus}`) }}
            </CommonChip>
          </div>
        </div>

        <!-- Date & Time Meta -->
        <ul
          class="event-meta flex flex-col gap-2 text-sm text-body mb-4.5 pb-4.5 border-b border-border"
        >
          <li class="flex items-center gap-1.5">
            <i class="icon-27 text-primary"></i>
            <span>{{ formattedDate }}</span>
          </li>
          <li class="flex items-center gap-1.5">
            <i class="icon-33 text-primary"></i>
            <span>{{ time }}</span>
          </li>
        </ul>

        <!-- Excerpt -->
        <p class="text-body text-base leading-relaxed line-clamp-3 mb-0">
          {{ excerpt }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from '~/components/common/IconButton.vue';

const { locale, t, localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  title: string
  category: string
  categorySlug: string
  excerpt: string
  image: string
  date: string
  time: string
  location: string
  registrationStatus: 'open' | 'closed' | 'full' | 'soon'
  price: number
  badge?: 'hot' | 'new'
  slug: string
}

const props = defineProps<Props>()

// Format date based on locale
const formattedDate = computed(() => {
  const dateObj = new Date(props.date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return dateObj.toLocaleDateString(locale.value, options)
})

// Badge styling based on type
const badgeClasses = computed(() => {
  if (props.badge === 'hot') {
    return 'bg-gradient-to-r from-red-500 to-orange-500'
  } else if (props.badge === 'new') {
    return 'bg-gradient-to-r from-blue-500 to-cyan-500'
  }
  return ''
})

// Status chip color based on registration status
const statusColor = computed(() => {
  switch (props.registrationStatus) {
    case 'open':
      return 'green'
    case 'closed':
      return 'red'
    case 'full':
      return 'orange'
    case 'soon':
      return 'blue'
    default:
      return 'gray'
  }
})
</script>

<style scoped>
/* Shadow utilities */
.shadow-darker {
  box-shadow: var(--shadow-darker, 0 10px 40px rgba(0, 0, 0, 0.1));
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Badge styling (Hot/New promotional badges) */
.badge {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.75px;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

/* Enhanced Hot badge gradient and glow */
.bg-gradient-to-r.from-red-500.to-orange-500 {
  background: linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fb923c 100%);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4), 0 2px 8px rgba(249, 115, 22, 0.3);
}

.bg-gradient-to-r.from-red-500.to-orange-500:hover {
  box-shadow: 0 6px 24px rgba(239, 68, 68, 0.6), 0 4px 12px rgba(249, 115, 22, 0.5);
  transform: translateY(-2px) scale(1.05);
}

/* Enhanced New badge gradient and glow */
.bg-gradient-to-r.from-blue-500.to-cyan-500 {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #22d3ee 100%);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(6, 182, 212, 0.3);
}

.bg-gradient-to-r.from-blue-500.to-cyan-500:hover {
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.6), 0 4px 12px rgba(6, 182, 212, 0.5);
  transform: translateY(-2px) scale(1.05);
}

/* Chips rows container */
.chips-rows {
  min-height: 56px;
}

/* Event meta styling */
.event-meta li {
  display: flex;
  align-items: center;
}

/* Custom spacing */
.mb-4\.5 {
  margin-bottom: 1.125rem;
}

.pb-4\.5 {
  padding-bottom: 1.125rem;
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .content-card {
    margin-top: -8rem;
  }
}

@media (max-width: 767px) {
  .content-card {
    margin-top: -7rem;
  }
}

/* Dark mode support */
.dark .content-card {
  background-color: var(--dark-color-surface, #1a1a1a);
}

.dark .shadow-darker {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Icon button sizing */
.w-15 {
  width: 3.75rem;
}

.h-15 {
  height: 3.75rem;
}

/* Unified event image sizing */
.event-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  aspect-ratio: 16 / 10;
}

@media (max-width: 991px) {
  .event-image {
    height: 280px;
  }
}

@media (max-width: 767px) {
  .event-image {
    height: 240px;
  }
}

/* Image container with diagonal sweep animation */
.image-container {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.image-container::after {
  position: absolute;
  content: '';
  top: -40%;
  left: -60%;
  width: 80%;
  height: 200%;
  background: linear-gradient(to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255) 50%,
      rgba(255, 255, 255, 0) 100%);
  transform: translateX(0) rotate(24deg);
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 24px 48px -28px rgba(17, 24, 39, 0.45);
}

.event-card:hover .image-container::after {
  animation: diagonalSweep 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 1;
}

@keyframes diagonalSweep {
  0% {
    transform: translateX(0%) rotate(24deg);
    opacity: 1;
  }

  100% {
    transform: translateX(180%) rotate(24deg);
    opacity: 0;
  }
}
</style>
