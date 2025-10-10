<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup>
import NuxtLayout from "@/layouts/default.vue";

</script>
<style lang="scss">
.custom-tab .v-btn__overlay {
  display: none !important;
  opacity: 0 !important;
  background-color: transparent !important;
  border-bottom: none !important;
}
</style>