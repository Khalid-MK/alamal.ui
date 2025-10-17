<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup>
// NuxtLayout and NuxtPage are auto-imported by Nuxt
</script>
<style lang="scss">
.custom-tab .v-btn__overlay {
  display: none !important;
  opacity: 0 !important;
  background-color: transparent !important;
  border-bottom: none !important;
}
</style>