<template>
  <main>
    <!-- Breadcrumb -->
    <CommonPageBreadcrumb
      :title="$t('event.pageTitle')"
      :breadcrumbItems="breadcrumbItems"
    />

    <!-- Events Section -->
    <section class="py-section" :dir="direction">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Events Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10">
          <EventCard
            v-for="event in paginatedData.events"
            :key="event.id"
            :title="event.title[locale]"
            :category="event.category[locale]"
            :category-slug="getCategorySlug(event.category.en)"
            :excerpt="event.excerpt[locale]"
            :image="event.image"
            :date="event.date"
            :time="event.time[locale]"
            :location="event.location[locale]"
            :registration-status="event.registrationStatus"
            :price="event.price"
            :badge="event.badge"
            :slug="event.slug"
          />
        </div>

        <!-- Pagination -->
        <CommonPagination
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
import { getPaginatedEvents } from '~/constant/events'

const { t, locale, localeProperties } = useI18n()
const route = useRoute()
const router = useRouter()
const direction = computed(() => localeProperties.value.dir)

// Set page title and meta description with i18n
usePageMeta('pageTitles.events', 'pageDescriptions.events', {
  meta: [
    {
      name: 'keywords',
      content: 'Islamic events, Quran workshops, Arabic classes, Islamic seminars, Tajweed webinars, Al-Amal Academy events'
    }
  ]
})

// Breadcrumb navigation
const breadcrumbItems = computed(() => [
  { label: t('Home'), path: '/' },
  { label: t('event.breadcrumb') }
])

// Pagination state
const currentPage = ref(1)
const eventsPerPage = 9

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

// Get paginated events
const paginatedData = computed(() => {
  return getPaginatedEvents(currentPage.value, eventsPerPage)
})

// Handle page change
const handlePageChange = (page: number) => {
  currentPage.value = page

  // Update URL query parameter
  router.push({
    path: '/events',
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
