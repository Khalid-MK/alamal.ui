<template>
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
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
</script>

<style scoped>
main {
  min-height: calc(100vh - 200px);
}
</style>