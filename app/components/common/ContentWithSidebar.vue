<template>
  <section class="py-30 lg:py-25 sm:py-20" :dir="direction">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Main Content -->
        <div :class="mainColClass">
          <div :class="mainContentClass">
            <slot name="content"></slot>
          </div>
        </div>

        <!-- Sidebar -->
        <div :class="sidebarColClass">
          <div class="bg-white shadow-sm rounded-md py-8 lg:mt-0 sm:mt-15">
            <slot name="sidebar"></slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  mainColumnSpan?: number
  sidebarColumnSpan?: number
  mainContentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  mainColumnSpan: 8,
  sidebarColumnSpan: 4,
  mainContentClass: 'pr-12 lg:pr-0'
})

// Computed classes for Tailwind JIT compatibility
const mainColClass = computed(() => {
  switch (props.mainColumnSpan) {
    case 6: return 'lg:col-span-6'
    case 7: return 'lg:col-span-7'
    case 9: return 'lg:col-span-9'
    case 10: return 'lg:col-span-10'
    case 12: return 'lg:col-span-12'
    default: return 'lg:col-span-8'
  }
})

const sidebarColClass = computed(() => {
  switch (props.sidebarColumnSpan) {
    case 2: return 'lg:col-span-2'
    case 3: return 'lg:col-span-3'
    case 5: return 'lg:col-span-5'
    case 6: return 'lg:col-span-6'
    default: return 'lg:col-span-4'
  }
})
</script>

<style scoped>
/* Custom spacing utilities */
.py-30 {
  padding-top: 7.5rem; /* 120px */
  padding-bottom: 7.5rem;
}

.py-25 {
  padding-top: 6.25rem; /* 100px */
  padding-bottom: 6.25rem;
}

.py-20 {
  padding-top: 5rem; /* 80px */
  padding-bottom: 5rem;
}

.mt-15 {
  margin-top: 3.75rem; /* 60px */
}

.pr-12 {
  padding-right: 3rem; /* 48px */
}

/* Responsive utilities */
@media (max-width: 1024px) {
  .lg\:py-25 {
    padding-top: 6.25rem;
    padding-bottom: 6.25rem;
  }

  .lg\:pr-0 {
    padding-right: 0;
  }

  .lg\:mt-0 {
    margin-top: 0;
  }
}

@media (max-width: 640px) {
  .sm\:py-20 {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .sm\:mt-15 {
    margin-top: 3.75rem;
  }
}
</style>
