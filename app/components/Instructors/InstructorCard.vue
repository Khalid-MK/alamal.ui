<template>
  <div class="instructor-card group relative px-7.5 pb-9 z-10" :dir="direction">
    <!-- White Card Background (::after pseudo-element replacement) -->
    <div class="absolute bottom-0 left-0 right-0 h-3/4 bg-white rounded-lg shadow-card -z-10"></div>

    <div class="relative">
      <!-- Thumbnail Wrapper -->
      <div class="relative mb-6">
        <!-- Image -->
        <div class="mb-6">
          <NuxtLink :to="profileUrl || '#'" class="block relative rounded-lg overflow-hidden">
            <img
              :src="image"
              :alt="name"
              class="w-full rounded-lg transition-transform duration-300"
            />

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-primary-light rounded-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible"></div>
          </NuxtLink>
        </div>

        <!-- Social Share Icons -->
        <ul class="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center flex justify-center gap-2.5">
          <li
            v-for="(social, index) in socials"
            :key="social.platform"
            class="translate-x-2.5 opacity-0 invisible transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible"
            :style="{ transitionDelay: `${(index + 2) * 100}ms` }"
          >
            <a
              :href="social.url"
              :aria-label="`${social.platform} profile`"
              class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white text-lg transition-all duration-300 hover:bg-white hover:text-primary"
            >
              <i :class="social.icon"></i>
            </a>
          </li>
        </ul>
      </div>

      <!-- Content Section -->
      <div class="text-center">
        <h5 class="mb-1">
          <NuxtLink
            :to="profileUrl || '#'"
            class="text-h5 font-semibold text-heading hover:text-primary transition-colors"
          >
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
  padding-left: 1.875rem; /* 30px */
  padding-right: 1.875rem;
}

.pb-9 {
  padding-bottom: 2.25rem; /* 36px */
}

/* Heading size */
.text-h5 {
  font-size: 1.125rem; /* 18px */
}

/* Primary light background */
.bg-primary-light {
  background-color: rgba(26, 182, 157, 0.6);
}

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

/* Responsive adjustments */
@media (max-width: 767px) {
  .instructor-card {
    padding-left: 1.25rem; /* 20px */
    padding-right: 1.25rem;
    padding-bottom: 1.875rem; /* 30px */
  }

  .text-h5 {
    font-size: 1rem; /* 16px */
  }
}

/* RTL Support */
[dir="rtl"] .instructor-card {
  direction: rtl;
}
</style>
