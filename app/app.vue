<template>
  <v-app>
    <PageLoader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup>
// NuxtLayout and NuxtPage are auto-imported by Nuxt
import PageLoader from '~/components/common/PageLoader.vue'
</script>
<style lang="scss">
.custom-tab .v-btn__overlay {
  display: none !important;
  opacity: 0 !important;
  background-color: transparent !important;
  border-bottom: none !important;
}
// SCSS Mixin for customizable spin duration and optional reverse
@mixin spin-animation($duration: 1s, $reverse: false) {
  @if $reverse {
    animation: spin $duration linear infinite reverse;
  } @else {
    animation: spin $duration linear infinite;
  }
}

// Dynamic spin class (e.g. spin-8, spin-8-reverse) using SCSS loop
@for $i from 1 through 10 {
  .spin-#{$i} {
    @include spin-animation(#{$i}s, false);
  }
  .spin-#{$i}-reverse {
    @include spin-animation(#{$i}s, true);
  }
}

// Usage: just add class="spin-1", "spin-5", "spin-8", etc. (up to spin-10)


@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}
</style>