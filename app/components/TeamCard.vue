<template>
  <div class="team-card group">
    <!-- Thumbnail Wrap -->
    <div class="relative mb-6">
      <!-- Image Container -->
      <div class="relative rounded-[5px] overflow-hidden">
        <NuxtLink :to="detailsLink" class="block relative image-link"
          :aria-label="$t('teamArea.viewProfile', { name: $t(member.nameKey) })">
          <img :src="member.image" :alt="$t(member.nameKey)"
            class="w-full rounded-[5px] transition-transform duration-300 group-hover:scale-105" loading="lazy">
        </NuxtLink>
      </div>

      <!-- Social Icons -->
      <ul
        class="absolute bottom-[38px] left-0 right-0 flex justify-center gap-2.5 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
        <li v-for="(social, index) in member.socialLinks" :key="social.platform" class="social-icon"
          :style="{ transitionDelay: `${200 + index * 100}ms` }">
          <a :href="social.url" :aria-label="`${$t(member.nameKey)} on ${social.platform}`" target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white text-lg hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300">
            <i :class="social.icon"></i>
          </a>
        </li>
      </ul>
    </div>

    <!-- Content -->
    <div class="text-center">
      <h5 class="font-bold text-xl lg:text-2xl mb-1">
        <NuxtLink :to="detailsLink"
          class="text-[var(--color-heading)] hover:text-[var(--color-primary)] transition-colors duration-300">
          {{ $t(member.nameKey) }}
        </NuxtLink>
      </h5>
      <span class="inline-block text-[var(--color-body)] text-sm md:text-base">
        {{ $t(member.designationKey) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
  icon: string
}

interface TeamMember {
  id: string | number
  nameKey: string
  designationKey: string
  image: string
  socialLinks: SocialLink[]
}

interface Props {
  member: TeamMember
}

const props = defineProps<Props>()

const detailsLink = computed(() => `/team/${props.member.id}`)
</script>

<style scoped>
/* Gradient overlay using ::after pseudo-element (as per documentation) */
.image-link::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(39.07deg, rgba(26, 182, 157, 0.7) 14.65%, rgba(49, 185, 120, 0.7) 85.16%);
  border-radius: 5px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  pointer-events: none;
}

.team-card:hover .image-link::after {
  opacity: 1;
  visibility: visible;
}

.team-card .social-icon {
  transition-property: opacity, transform;
  transition-timing-function: ease-out;
  transition-duration: 300ms;
}

/* Ensure proper stacking context */
.team-card {
  position: relative;
}

/* RTL support for social icons animation */
html[dir="rtl"] .team-card .social-icon {
  transition-property: opacity, transform;
}

/* Additional hover effects for accessibility */
.team-card a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: 4px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

  .team-card *,
  .team-card *::before,
  .team-card *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
