<template>
  <div dir="ltr">
    <Header />
    <main>
      <slot></slot>
    </main>
    <FooterOne />
  </div>
</template>

<script setup>
// Using script setup syntax
import Header from "~/components/common/Header.vue";
import FooterOne from "~/components/common/FooterOne.vue";
const { locale } = useI18n()

// Global head management - affects entire app
useHead({
  htmlAttrs: {
    dir: computed(() => locale.value === 'ar' ? 'rtl' : 'ltr'),
    lang: locale
  }
})

</script>
