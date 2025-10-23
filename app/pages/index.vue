<template>
  <main>
    <HomeSliderNew />
    <HomeAbout />
    <HomeCourseArea />
    <HomeVideoArea />
    <HomeFeaturesArea />
    <HomeCampus />
    <!-- <HomeZoomSection/> -->
    <HomeTeamArea />
    <HomeEvents />
    <HomeBlogAndPrayer />
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
