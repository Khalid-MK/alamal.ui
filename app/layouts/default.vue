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
const { locale, localeProperties } = useI18n()

// Global head management
useHead({
  htmlAttrs: {
    dir: computed(() => localeProperties.value.dir),
    lang: computed(() => localeProperties.value.iso)
  }
})
</script>
