<template>
  <div class="section-title" :class="[alignmentClass, { 'mb-14': !noMargin }]" :dir="direction">
    <span v-if="preTitle" class="pre-title">{{ preTitle }}</span>
    <h2 v-if="title" class="title">{{ title }}</h2>
    <span v-if="showShapeLine" class="shape-line"><i class="icon-19"></i></span>
  </div>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  preTitle?: string
  title?: string
  alignment?: 'center' | 'left' | 'right'
  showShapeLine?: boolean
  noMargin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alignment: 'center',
  showShapeLine: true,
  noMargin: false
})

const alignmentClass = computed(() => {
  switch (props.alignment) {
    case 'left':
      return 'text-left'
    case 'right':
      return 'text-right'
    default:
      return 'text-center'
  }
})
</script>

<style scoped>
.section-title {
  margin-bottom: 3.5rem; /* 56px */
}

.mb-14 {
  margin-bottom: 3.5rem;
}

.pre-title {
  display: inline-block;
  font-size: 0.875rem; /* 14px */
  font-family: var(--font-secondary);
  font-weight: 500;
  color: var(--color-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem; /* 16px */
}

.title {
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.75rem; /* 12px */
  line-height: 1.25;
}

.shape-line {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary);
  font-size: 1.25rem; /* 20px */
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .title {
    font-size: 2rem; /* 32px */
  }
}

@media (max-width: 767px) {
  .section-title {
    margin-bottom: 2.5rem; /* 40px */
  }

  .mb-14 {
    margin-bottom: 2.5rem;
  }

  .title {
    font-size: 1.75rem; /* 28px */
  }

  .pre-title {
    font-size: 0.8125rem; /* 13px */
  }
}

@media (max-width: 575px) {
  .title {
    font-size: 1.5rem; /* 24px */
  }
}

/* RTL Support */
[dir="rtl"] .section-title.text-left {
  text-align: right;
}

[dir="rtl"] .section-title.text-right {
  text-align: left;
}
</style>
