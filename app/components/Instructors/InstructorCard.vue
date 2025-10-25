<template>
  <div class="instructor-card group relative px-7.5 pb-9 z-10" :dir="direction">
    <!-- White Card Background (::after pseudo-element replacement) -->
    <div class="absolute bottom-0 left-0 right-0 h-3/4 bg-white rounded-lg shadow-card -z-10"></div>

    <div class="relative">
      <!-- Thumbnail Wrapper -->
      <div class="relative mb-6">
        <!-- Image -->
        <div class="mb-6 image-container">
          <NuxtLink :to="profileUrl || '#'" class="block relative rounded-lg overflow-hidden">
            <img :src="image" :alt="name" class="w-full rounded-lg transition-transform duration-300" />

            <!-- Hover Overlay -->
            <div
              class="absolute inset-0 bg-primary-light rounded-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Content Section -->
      <div class="text-center">
        <h5 class="mb-1">
          <NuxtLink :to="profileUrl || '#'"
            class="text-h5 font-semibold text-heading hover:text-primary transition-colors">
            {{ name }}
          </NuxtLink>
        </h5>
        <span class="inline-block mb-4 text-body font-secondary">
          {{ designation }}
        </span>
        <p class="text-body text-base leading-relaxed mb-0">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Social {
  platform: string
  url: string
  icon: string
}

interface Props {
  image: string
  name: string
  designation: string
  description: string
  profileUrl?: string
  socials: Social[]
}

defineProps<Props>()
</script>

<style scoped>
/* Custom spacing */
.px-7\.5 {
  padding-left: 1.875rem;
  /* 30px */
  padding-right: 1.875rem;
}

.pb-9 {
  padding-bottom: 2.25rem;
  /* 36px */
}

/* Heading size */
.text-h5 {
  font-size: 1.125rem;
  /* 18px */
}

/* Primary light background */
/* .bg-primary-light {
  background-color: rgba(26, 182, 157, 0.6);
} */

/* Custom shadow for card */
.shadow-card {
  box-shadow: 0px 10px 50px 0px rgba(26, 46, 85, 0.1);
}

/* Height percentage for card background */
.h-3\/4 {
  height: 75%;
}

/* Line height */
.leading-relaxed {
  line-height: 1.73;
}

.instructor-card {
  flex: 1;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .instructor-card {
    padding-left: 1.25rem;
    /* 20px */
    padding-right: 1.25rem;
    padding-bottom: 1.875rem;
    /* 30px */
  }

  .text-h5 {
    font-size: 1rem;
    /* 16px */
  }
}

/* RTL Support */
[dir="rtl"] .instructor-card {
  direction: rtl;
}


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

.instructor-card:hover .image-container::after {
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


.social-link {
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: scale(1.1);
}
</style>
