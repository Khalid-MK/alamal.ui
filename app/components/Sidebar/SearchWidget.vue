<template>
  <div class="px-10 py-8 sm:px-5" :dir="direction">
    <h4 class="text-xl font-semibold text-heading mb-8">{{ $t('Search') }}</h4>
    <form class="relative" @submit.prevent="handleSearch">
      <button
        type="submit"
        class="absolute top-1/2 -translate-y-1/2 text-placeholder text-lg"
        :class="direction === 'rtl' ? 'right-7' : 'left-7'"
      >
        <i class="icon-2"></i>
      </button>
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('Search')"
        class="w-full h-12 border border-border rounded text-base
               focus:outline-none focus:border-primary transition-colors"
        :class="direction === 'rtl' ? 'pr-14 pl-5' : 'pl-14 pr-5'"
      >
    </form>
  </div>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search functionality
    console.log('Searching for:', searchQuery.value)
  }
}
</script>
