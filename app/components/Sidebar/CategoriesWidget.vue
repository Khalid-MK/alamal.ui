<template>
  <div class="px-10 py-8 sm:px-5" :dir="direction">
    <h4 class="text-xl font-semibold text-heading mb-8">{{ $t('Categories') }}</h4>
    <ul class="space-y-3.5">
      <li v-for="category in categories" :key="category.name">
        <NuxtLink
          :to="category.url"
          class="flex justify-between items-center font-secondary font-medium text-heading
                 hover:text-primary transition-colors"
        >
          <span>{{ category.name }}</span>
          <span class="text-body">({{ category.count }})</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Category {
  name: string
  count: number
  url: string
}

interface Props {
  categories?: Category[]
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [
    { name: 'Quran Studies', count: 12, url: '/courses?category=quran' },
    { name: 'Arabic Language', count: 8, url: '/courses?category=arabic' },
    { name: 'Tajweed', count: 6, url: '/courses?category=tajweed' },
    { name: 'Islamic Studies', count: 10, url: '/courses?category=islamic-studies' },
    { name: 'Hifz Program', count: 5, url: '/courses?category=hifz' },
    { name: 'Kids Courses', count: 15, url: '/courses?category=kids' }
  ]
})
</script>
