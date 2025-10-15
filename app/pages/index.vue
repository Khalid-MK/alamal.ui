<template>
  <HomeSliderNew />
  <HomeAbout />
  <HomeCourseList />
  <HomeSubscribeSteps />
  <HomeHowSiteWork />
  <HomeTeacherSection />
  <HomeEvents />
  <HomeFeatureSection />
  <HomeAboutSection />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
