<template>
  <div class="px-10 py-8 sm:px-5" :dir="direction">
    <div class="relative bg-[#f5f9fa] text-center rounded-lg px-10 pt-10 pb-24 sm:px-6 sm:pb-15 overflow-hidden">
      <!-- Background pattern -->
      <div
        class="absolute inset-0 opacity-30 bg-cover bg-center -z-10"
        style="background-image: url('/img/shape/shape-21.png')"
      ></div>

      <h4 class="text-xl font-bold text-heading mb-1">
        {{ title }} <span class="text-secondary">{{ highlight }}</span>
      </h4>
      <span class="block text-primary text-xs mb-3.5">
        <i class="icon-19"></i>
      </span>
      <p class="text-heading mb-5">{{ description }}</p>
      <NuxtLink
        :to="buttonUrl"
        class="inline-flex items-center px-8 py-3 bg-gradient-primary text-white
               font-semibold rounded-lg hover:shadow-lg transition-all gap-2"
      >
        {{ buttonText }} <i class="icon-4"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { localeProperties, t } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  title?: string
  highlight?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Start Your Islamic Learning Journey with',
  highlight: 'Al-Amal',
  description: 'Join thousands of students worldwide',
  buttonText: 'Enroll Now',
  buttonUrl: '/courses'
})
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(-90deg, #31b978 0%, #1ab69d 100%);
}
</style>
