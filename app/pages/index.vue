<template>
  <main>
    <HomeSliderNew />
    <HomeAbout />
    <HomeCourseArea />
    <HomeVideoArea />
    <HomeCampus />
    <HomeEvents />
    <HomeBlogAndPrayer />
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
