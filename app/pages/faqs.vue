<template>
  <main>
    <!-- Breadcrumb -->
    <CommonPageBreadcrumb
      :title="$t('faq.pageTitle')"
      :breadcrumbItems="breadcrumbItems"
    />

    <!-- FAQ Section -->
    <section class="faq-section py-section overflow-hidden" :dir="direction">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left Sidebar - Tab Navigation -->
          <div class="lg:col-span-4">
            <FAQTabNavigation
              :tabs="faqTabs"
              :active-tab="activeTab"
              @update:active-tab="handleTabChange"
            />
          </div>

          <!-- Right Content - FAQ Accordions -->
          <div class="faq-page-tab-content lg:col-span-8">
            <div class="faq-content relative">
              <!-- Tab Panels -->
              <div
                v-for="tab in faqTabs"
                :key="tab.id"
                :id="`panel-${tab.id}`"
                role="tabpanel"
                :aria-labelledby="`tab-${tab.id}`"
                :hidden="activeTab !== tab.id"
              >
                <transition-group name="fade" tag="div">
                  <FAQAccordionItem
                    v-for="(faq, index) in getFaqsByCategory(tab.id)"
                    :key="`${tab.id}-${index}`"
                    :id="`${tab.id}-${index}`"
                    :question="$t(faq.question)"
                    :answer="$t(faq.answer)"
                    :is-expanded="expandedItem === `${tab.id}-${index}`"
                    @toggle="handleAccordionToggle"
                  />
                </transition-group>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { t, localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

// SEO Meta Tags
useHead({
  title: 'Frequently Asked Questions - Al-Amal Islamic Education',
  meta: [
    {
      name: 'description',
      content: 'Find answers to common questions about Al-Amal Islamic Education Platform, Quran courses, Arabic learning, Tajweed, enrollment, and more.'
    },
    {
      name: 'keywords',
      content: 'FAQ, Quran courses, Arabic learning, Tajweed, Islamic education, online learning, Al-Amal'
    }
  ]
})

// Breadcrumb navigation
const breadcrumbItems = computed(() => [
  { label: t('Home'), path: '/' },
  { label: t('faq.pageTitle') }
])

// Tab configuration
const faqTabs = [
  { id: 'general', label: 'faq.tabs.general' },
  { id: 'courses', label: 'faq.tabs.courses' },
  { id: 'enrollment', label: 'faq.tabs.enrollment' },
  { id: 'support', label: 'faq.tabs.support' },
  { id: 'payment', label: 'faq.tabs.payment' },
  { id: 'terms', label: 'faq.tabs.terms' }
]

// Active tab state
const activeTab = ref('general')
const expandedItem = ref<string | null>('general-0') // First item expanded by default

// FAQ data structure by category
const faqData = {
  general: [
    { question: 'faq.general.q1', answer: 'faq.general.a1' },
    { question: 'faq.general.q2', answer: 'faq.general.a2' },
    { question: 'faq.general.q3', answer: 'faq.general.a3' },
    { question: 'faq.general.q4', answer: 'faq.general.a4' },
    { question: 'faq.general.q5', answer: 'faq.general.a5' },
    { question: 'faq.general.q6', answer: 'faq.general.a6' },
    { question: 'faq.general.q7', answer: 'faq.general.a7' }
  ],
  courses: [
    { question: 'faq.courses.q1', answer: 'faq.courses.a1' },
    { question: 'faq.courses.q2', answer: 'faq.courses.a2' },
    { question: 'faq.courses.q3', answer: 'faq.courses.a3' },
    { question: 'faq.courses.q4', answer: 'faq.courses.a4' },
    { question: 'faq.courses.q5', answer: 'faq.courses.a5' },
    { question: 'faq.courses.q6', answer: 'faq.courses.a6' }
  ],
  enrollment: [
    { question: 'faq.enrollment.q1', answer: 'faq.enrollment.a1' },
    { question: 'faq.enrollment.q2', answer: 'faq.enrollment.a2' },
    { question: 'faq.enrollment.q3', answer: 'faq.enrollment.a3' },
    { question: 'faq.enrollment.q4', answer: 'faq.enrollment.a4' },
    { question: 'faq.enrollment.q5', answer: 'faq.enrollment.a5' }
  ],
  support: [
    { question: 'faq.support.q1', answer: 'faq.support.a1' },
    { question: 'faq.support.q2', answer: 'faq.support.a2' },
    { question: 'faq.support.q3', answer: 'faq.support.a3' },
    { question: 'faq.support.q4', answer: 'faq.support.a4' },
    { question: 'faq.support.q5', answer: 'faq.support.a5' }
  ],
  payment: [
    { question: 'faq.payment.q1', answer: 'faq.payment.a1' },
    { question: 'faq.payment.q2', answer: 'faq.payment.a2' },
    { question: 'faq.payment.q3', answer: 'faq.payment.a3' },
    { question: 'faq.payment.q4', answer: 'faq.payment.a4' }
  ],
  terms: [
    { question: 'faq.terms.q1', answer: 'faq.terms.a1' },
    { question: 'faq.terms.q2', answer: 'faq.terms.a2' },
    { question: 'faq.terms.q3', answer: 'faq.terms.a3' },
    { question: 'faq.terms.q4', answer: 'faq.terms.a4' }
  ]
}

// Get FAQs by category
const getFaqsByCategory = (categoryId: string) => {
  return faqData[categoryId as keyof typeof faqData] || []
}

// Handle tab change
const handleTabChange = (tabId: string) => {
  activeTab.value = tabId
  // Expand first item of new tab
  expandedItem.value = `${tabId}-0`
}

// Handle accordion toggle
const handleAccordionToggle = (itemId: string | number) => {
  // If clicking the same item, collapse it
  if (expandedItem.value === itemId) {
    expandedItem.value = null
  } else {
    // Otherwise, expand the clicked item (and collapse others)
    expandedItem.value = itemId as string
  }
}
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

/* FAQ content container */
.faq-content {
  min-height: 400px;
}

/* Fade transition for tab panels */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Margin bottom for accordion items */
.mb-7 {
  margin-bottom: 1.875rem; /* 30px */
}

/* Grid gap */
.gap-8 {
  gap: 2rem; /* 32px */
}

/* .faq-content:after {
  content: url(/img/shape/map-shape-1.png);
  position: absolute;
  bottom: -90px;
  right: 70px;
  z-index: -1;
} */
</style>
