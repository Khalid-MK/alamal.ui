<template>
  <main>
    <HomeSliderNew />
    <HomeAbout />
    <HomeCourseArea />
    <HomeVideoArea />
    <HomeFeaturesArea />
    <HomeCampus />
    <!-- <HomeCourseList /> -->
    <!-- <HomeHowSiteWork /> -->
    <!-- <HomeTeacherSection /> -->
    <!-- <HomeEvents /> -->
    <!-- <HomeBlogAndPrayer /> -->
    <!-- <HomeZoomSection/> -->
    <HomeTeamArea />
    <HomeUniversityCTA />
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
