<template>
  <HomeSlider />
  <HomeHowSiteWork />
  <HomeCourseList />
  <!-- <HomeFeatureSection /> -->
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
