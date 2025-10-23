<template>
  <main>
    <!-- Breadcrumb -->
    <CommonPageBreadcrumb
      :title="$t('instructorsPage.pageTitle')"
      :breadcrumbItems="breadcrumbItems"
    />

    <!-- Instructors Section -->
    <section class="py-section" :dir="direction">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Section Title -->
        <CommonSectionTitle
          :preTitle="$t('instructorsPage.sectionPreTitle')"
          :title="$t('instructorsPage.sectionTitle')"
          alignment="center"
          :showShapeLine="true"
        />

        <!-- Instructor Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <InstructorsInstructorCard
            v-for="instructor in instructors"
            :key="instructor.id"
            :image="instructor.image"
            :name="instructor.name[locale]"
            :designation="instructor.designation[locale]"
            :description="instructor.description[locale]"
            :profileUrl="instructor.profileUrl"
            :socials="instructor.socials"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { instructors } from '~/constant/instructors'

const { t, locale, localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

// SEO Meta Tags
useHead({
  title: 'Our Expert Instructors - Al-Amal Islamic Education',
  meta: [
    {
      name: 'description',
      content: 'Meet our qualified instructors at Al-Amal Islamic Education Platform. Expert teachers in Quran, Arabic, Tajweed, and Islamic Studies.'
    },
    {
      name: 'keywords',
      content: 'instructors, teachers, Quran teachers, Arabic teachers, Tajweed experts, Islamic education, Al-Amal'
    }
  ]
})

// Breadcrumb navigation
const breadcrumbItems = computed(() => [
  { label: t('Home'), path: '/' },
  { label: t('instructorsPage.breadcrumb') }
])
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

@media (max-width: 767px) {
  .gap-12 {
    gap: 2.5rem; /* 40px */
  }
}
</style>
