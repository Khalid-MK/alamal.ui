<template>
  <div class="blog-card group" :dir="direction">
    <div class="relative">
      <!-- Thumbnail with hover effect -->
      <div class="thumbnail relative overflow-hidden rounded-xl image-container">
        <NuxtLink :to="`/blog/${slug}`" class="block relative">
          <img
            :src="image"
            :alt="title"
            class="w-full h-auto rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </NuxtLink>
      </div>

      <!-- Content card (overlapping style) -->
      <div
        class="content-card relative bg-white dark:bg-dark-surface rounded-xl shadow-darker mx-7 md:mx-6 sm:mx-4 -mt-44 md:-mt-32 sm:-mt-28 p-8 md:p-6 sm:p-5 transition-all duration-300"
      >
        <!-- Read More Button (appears on hover) -->
        <div
          class="read-more-btn absolute -top-10 group-hover:-top-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
          :class="direction === 'rtl' ? 'left-8 md:left-6' : 'right-8 md:right-6'"
        >
          <NuxtLink
            :to="`/blog/${slug}`"
            class="flex items-center justify-center w-15 h-15 rounded-full bg-primary hover:bg-secondary text-white transition-all duration-300"
            :aria-label="`${$t('blog.readMore')} - ${title}`"
          >
            <IconButton variant="round" icon="icon-4" aria-label="Navigate" />
          </NuxtLink>
        </div>

        <!-- Category Badge -->
        <div class="mb-3">
          <NuxtLink
            :to="`/blogs?category=${categorySlug}`"
            class="inline-block uppercase text-sm font-medium text-body hover:text-primary transition-colors duration-300"
          >
            {{ category }}
          </NuxtLink>
        </div>

        <!-- Title -->
        <h5 class="mb-2.5">
          <NuxtLink
            :to="`/blog/${slug}`"
            class="text-xl md:text-lg font-bold text-heading hover:text-primary transition-colors duration-300 line-clamp-2"
          >
            {{ title }}
          </NuxtLink>
        </h5>

        <!-- Meta information -->
        <ul
          class="blog-meta flex items-center gap-4 md:gap-3 text-sm text-body mb-4.5 pb-4.5 border-b border-border"
        >
          <li class="flex items-center gap-1.5">
            <i class="icon-27 text-primary"></i>
            <span>{{ formattedDate }}</span>
          </li>
          <li class="flex items-center gap-1.5">
            <i class="icon-28 text-primary"></i>
            <span>{{ $t('blog.comments', { count: commentsCount }) }}</span>
          </li>
        </ul>

        <!-- Excerpt -->
        <p class="text-body text-base leading-relaxed line-clamp-3 mb-0">
          {{ excerpt }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from '~/components/common/IconButton.vue';

const { locale, t, localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  title: string
  category: string
  categorySlug: string
  excerpt: string
  image: string
  date: string
  commentsCount: number
  slug: string
}

const props = defineProps<Props>()

// Format date based on locale
const formattedDate = computed(() => {
  const dateObj = new Date(props.date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return dateObj.toLocaleDateString(locale.value, options)
})
</script>

<style scoped>
/* Shadow utilities */
.shadow-darker {
  box-shadow: var(--shadow-darker, 0 10px 40px rgba(0, 0, 0, 0.1));
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Blog meta styling */
.blog-meta li:not(:last-child)::after {
  content: '|';
  margin-left: 1rem;
  margin-right: 1rem;
  color: var(--color-border);
}

[dir='rtl'] .blog-meta li:not(:last-child)::after {
  margin-left: 1rem;
  margin-right: 1rem;
}

/* Custom spacing */
.mb-4\.5 {
  margin-bottom: 1.125rem;
}

.pb-4\.5 {
  padding-bottom: 1.125rem;
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .content-card {
    margin-top: -8rem;
  }
}

@media (max-width: 767px) {
  .content-card {
    margin-top: -7rem;
  }
}

/* Dark mode support */
.dark .content-card {
  background-color: var(--dark-color-surface, #1a1a1a);
}

.dark .shadow-darker {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Icon button sizing */
.w-15 {
  width: 3.75rem;
}

.h-15 {
  height: 3.75rem;
}


.image-container {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}


.image-container::after {
  position: absolute;
  content: '';

  top: -40%;
  left: -60%;

  width: 80%;
  height: 200%;

  background: linear-gradient(to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255) 50%,
      rgba(255, 255, 255, 0) 100%);


  transform: translateX(0) rotate(24deg);
  opacity: 0;

  pointer-events: none;
  box-shadow: 0 24px 48px -28px rgba(17, 24, 39, 0.45);
}

.blog-card:hover .image-container::after {
  animation: diagonalSweep 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 1;
}

@keyframes diagonalSweep {
  0% {
    transform: translateX(0%) rotate(24deg);
    opacity: 1;
  }

  100% {
    transform: translateX(180%) rotate(24deg);
    opacity: 0;
  }
}
</style>
