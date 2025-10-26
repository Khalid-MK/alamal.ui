<template>
  <ul
    v-if="totalPages > 1"
    class="edu-pagination flex items-center justify-center flex-wrap gap-2 pt-17.5 md:pt-12.5"
    :dir="direction"
  >
    <!-- Previous Button -->
    <li>
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :aria-label="$t('pagination.previous')"
        class="pagination-btn"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        <i class="icon-west"></i>
      </button>
    </li>

    <!-- First Page -->
    <li v-if="showFirstPage">
      <button
        @click="goToPage(1)"
        :class="{ active: currentPage === 1 }"
        class="pagination-btn"
      >
        1
      </button>
    </li>

    <!-- Left Ellipsis -->
    <li v-if="showLeftEllipsis" class="pagination-ellipsis">
      <span>...</span>
    </li>

    <!-- Page Numbers -->
    <li v-for="page in visiblePages" :key="page">
      <button
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
        class="pagination-btn"
      >
        {{ page }}
      </button>
    </li>

    <!-- Right Ellipsis -->
    <li v-if="showRightEllipsis" class="pagination-ellipsis">
      <span>...</span>
    </li>

    <!-- Last Page -->
    <li v-if="showLastPage">
      <button
        @click="goToPage(totalPages)"
        :class="{ active: currentPage === totalPages }"
        class="pagination-btn"
      >
        {{ totalPages }}
      </button>
    </li>

    <!-- Next Button -->
    <li>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :aria-label="$t('pagination.next')"
        class="pagination-btn"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      >
        <i class="icon-east"></i>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5
})

interface Emits {
  (e: 'update:currentPage', page: number): void
}

const emit = defineEmits<Emits>()

// Calculate visible pages
const visiblePages = computed(() => {
  const pages: number[] = []
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(2, props.currentPage - half)
  let end = Math.min(props.totalPages - 1, props.currentPage + half)

  // Adjust if we're near the start or end
  if (props.currentPage <= half + 1) {
    end = Math.min(props.totalPages - 1, props.maxVisiblePages)
  }
  if (props.currentPage >= props.totalPages - half) {
    start = Math.max(2, props.totalPages - props.maxVisiblePages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const showFirstPage = computed(() => {
  return props.totalPages > 1
})

const showLastPage = computed(() => {
  return props.totalPages > 1
})

const showLeftEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

const showRightEllipsis = computed(() => {
  return (
    visiblePages.value.length > 0 &&
    visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
  )
})

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return
  }
  emit('update:currentPage', page)

  // Scroll to top smoothly
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.edu-pagination {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: var(--color-heading);
  font-size: 18px;
  font-weight: 600;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition, 0.3s);
  z-index: 1;
}

.pagination-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--gradient-primary, linear-gradient(90deg, #ee0979 0%, #ff6a00 100%));
  opacity: 0;
  transition: opacity var(--transition, 0.3s);
  z-index: -1;
}

.pagination-btn:hover::before,
.pagination-btn.active::before {
  opacity: 1;
}

.pagination-btn:hover,
.pagination-btn.active {
  color: var(--color-white);
}

.pagination-btn:disabled {
  cursor: not-allowed;
}

.pagination-btn:disabled:hover::before {
  opacity: 0;
}

.pagination-btn:disabled:hover {
  color: var(--color-heading);
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: var(--color-heading);
  font-size: 18px;
  font-weight: 700;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .pagination-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .pagination-ellipsis {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

/* Custom spacing */
.pt-17\.5 {
  padding-top: 4.375rem; /* 70px */
}

.pt-12\.5 {
  padding-top: 3.125rem; /* 50px */
}

/* Dark mode support */
.dark .pagination-btn {
  color: var(--dark-color-heading, #fff);
}

.dark .pagination-ellipsis {
  color: var(--dark-color-heading, #fff);
}
</style>
