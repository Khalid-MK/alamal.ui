<template>
  <main>
    <Header />
    <slot></slot>
    <FooterOne />
    <!-- Floating Prayer Times Widget -->
    <PrayerTimesFloatingWidget />
  </main>
</template>

<script setup>
import Header from "~/components/common/Header.vue";
import FooterOne from "~/components/common/FooterOne.vue";
const { locale: currentLocale, localeProperties } = useI18n()

// Global head management 
useHead({
  htmlAttrs: {
    dir: computed(() => localeProperties.value.dir),
    lang: computed(() => localeProperties.value.iso)
  }
})


watch(currentLocale, (newLocale) => {
  // Locale change handling - debug logs removed for production
})
</script>

<style lang="scss" scoped>
main {
}
</style>