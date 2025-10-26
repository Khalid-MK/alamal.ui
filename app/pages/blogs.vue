<template>
  <main>
    <!-- Breadcrumb -->
    <CommonPageBreadcrumb
      :title="$t('blog.pageTitle')"
      :breadcrumbItems="breadcrumbItems"
    />

    <!-- Blogs Section -->
    <section class="py-section" :dir="direction">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10">
          <BlogCard
            v-for="blog in paginatedData.blogs"
            :key="blog.id"
            :title="blog.title[locale]"
            :category="blog.category[locale]"
            :category-slug="getCategorySlug(blog.category.en)"
            :excerpt="blog.excerpt[locale]"
            :image="blog.image"
            :date="blog.date"
            :comments-count="blog.commentsCount"
            :slug="blog.slug"
          />
        </div>

        <!-- Pagination -->
        <BlogPagination
          v-if="paginatedData.totalPages > 1"
          :current-page="currentPage"
          :total-pages="paginatedData.totalPages"
          @update:current-page="handlePageChange"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getPaginatedBlogs } from '~/constant/blogs'

const { t, locale, localeProperties } = useI18n()
const route = useRoute()
const router = useRouter()
const direction = computed(() => localeProperties.value.dir)

// Set page title and meta description with i18n
usePageMeta('pageTitles.blogs', 'pageDescriptions.blogs', {
  meta: [
    {
      name: 'keywords',
      content: 'blog, Islamic education, Quran learning, Tajweed, Arabic lessons, Islamic studies, Al-Amal'
    }
  ]
})

// Breadcrumb navigation
const breadcrumbItems = computed(() => [
  { label: t('Home'), path: '/' },
  { label: t('blog.breadcrumb') }
])

// Pagination state
const currentPage = ref(1)
const blogsPerPage = 9

// Initialize current page from URL query
onMounted(() => {
  const pageQuery = route.query.page
  if (pageQuery && typeof pageQuery === 'string') {
    const page = parseInt(pageQuery, 10)
    if (!isNaN(page) && page > 0) {
      currentPage.value = page
    }
  }
})

// Get paginated blogs
const paginatedData = computed(() => {
  return getPaginatedBlogs(currentPage.value, blogsPerPage)
})

// Handle page change
const handlePageChange = (page: number) => {
  currentPage.value = page

  // Update URL query parameter
  router.push({
    path: '/blogs',
    query: { page: page > 1 ? page.toString() : undefined }
  })
}

// Helper function to convert category to slug
const getCategorySlug = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

// Watch for route changes (browser back/forward)
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage && typeof newPage === 'string') {
      const page = parseInt(newPage, 10)
      if (!isNaN(page) && page > 0) {
        currentPage.value = page
      }
    } else {
      currentPage.value = 1
    }
  }
)
</script>

<style scoped>
/* Section spacing */
.py-section {
  padding-top: 7.5rem; /* 120px */
  padding-bottom: 7.5rem;
}

@media (max-width: 991px) {
  .py-section {
    padding-top: 5rem; /* 80px */
    padding-bottom: 5rem;
  }
}

@media (max-width: 767px) {
  .py-section {
    padding-top: 3.75rem; /* 60px */
    padding-bottom: 3.75rem;
  }
}

/* Grid gap */
.gap-12 {
  gap: 3rem; /* 48px */
}

@media (max-width: 991px) {
  .gap-10 {
    gap: 2.5rem; /* 40px */
  }
}
</style>
