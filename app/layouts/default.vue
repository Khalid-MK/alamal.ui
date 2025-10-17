<template>
  <div>
    <Header />
    <main>
      <slot></slot>
    </main>
    <FooterOne />
  </div>
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
  console.log('Locale changed to:', newLocale)
  console.log('Current HTML dir:', document.documentElement.getAttribute('dir'))
  console.log('Current HTML lang:', document.documentElement.getAttribute('lang'))
  console.log('localeProperties.value.dir:', localeProperties.value.dir)
  console.log('localeProperties.value.iso:', localeProperties.value.iso)
})
</script>

<style lang="scss" scoped>
main {
  margin-top: 110px;

  @media (max-width:420px) {
     margin-top: 40px;
  }
}
</style>