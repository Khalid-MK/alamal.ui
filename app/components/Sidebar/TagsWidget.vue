<template>
  <div class="px-10 py-8 sm:px-5" :dir="direction">
    <h4 class="text-xl font-semibold text-heading mb-8">{{ $t('Tags') }}</h4>
    <div class="flex flex-wrap gap-2.5">
      <NuxtLink
        v-for="tag in tags"
        :key="tag"
        :to="`/search?tag=${encodeURIComponent(tag)}`"
        class="relative px-3.5 h-10 leading-10 border border-border rounded-md
               font-secondary font-medium text-sm transition-all duration-300
               hover:text-white hover:border-transparent z-10
               before:absolute before:inset-0 before:bg-gradient-primary before:rounded-md
               before:opacity-0 before:transition-opacity before:duration-300 before:-z-10
               hover:before:opacity-100"
      >
        {{ tag }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  tags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  tags: () => ['Quran', 'Tajweed', 'Arabic', 'Hifz', 'Islamic Studies']
})
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(-90deg, #31b978 0%, #1ab69d 100%);
}
</style>
