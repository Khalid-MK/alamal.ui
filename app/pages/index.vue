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
    <HomeTestimonials />
    <!-- <HomeEvents /> -->
    <!-- <HomeBlogAndPrayer /> -->
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

// Set page title and meta description
usePageMeta('pageTitles.home', 'pageDescriptions.home')

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
