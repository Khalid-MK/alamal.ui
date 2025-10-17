<template>
  <HomeSliderNew />
  <HomeAbout />
  <HomeCourseList />
  <HomeSubscribeSteps />
  <HomeHowSiteWork />
  <HomeTeacherSection />
  <HomeEvents />
  <HomeBlogAndPrayer />
  <HomeZoomSection />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
