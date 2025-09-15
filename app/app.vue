<template>
  <!-- <LoadingSpinner :loading="authStore.loading" /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// import { useAuthStore } from "@/stores/authStore";
// import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import NuxtLayout from "@/layouts/default.vue";
// const authStore = useAuthStore();
// useHead({
//   link: [
//     {
//       rel: "stylesheet",
//       href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
//     },
//   ],
// });
</script>
<style lang="css">
/* html[lang="ar"] {
  direction: rtl;
  flex-direction: row-reverse;
  text-align: right;
}

html[lang="en"] {
  direction: ltr;
  text-align: left;
} */
</style>