<template>
  <main>
    <HomeSliderNew />
    <HomeAbout />
    <HomeCourseArea />
    <HomeVideoArea />
    <HomeCampus />
    <HomeUniversityCTA />
    <HomeCourseList />
    <HomeHowSiteWork />
    <HomeTeacherSection />
    <HomeEvents />
    <HomeBlogAndPrayer />
    <HomeZoomSection/>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
