<template>
  <!-- <LoadingSpinner :loading="authStore.loading" /> -->
   <USelect v-model="value" :items="items" />
  <NuxtLayout>
    
    <NuxtPage />

  </NuxtLayout>
</template>

<script setup>
import NuxtLayout from "@/layouts/default.vue";
const items=ref(availableThemes)
const value = ref('default')
onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "green"; // default theme
  document.documentElement.classList.add(`theme-${savedTheme}`);
});
</script>
<style lang="css"></style>