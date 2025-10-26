<template>
  <span
    :class="chipClasses"
    class="chip inline-flex items-center gap-1.5 transition-all duration-200"
  >
    <i v-if="icon" :class="icon" class="chip-icon"></i>
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'filled' | 'outlined'
  color?: 'green' | 'blue' | 'red' | 'orange' | 'primary' | 'gray'
  size?: 'small' | 'medium'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'primary',
  size: 'small'
})

const chipClasses = computed(() => {
  const classes = [
    `chip-${props.variant}`,
    `chip-${props.color}`,
    `chip-${props.size}`
  ]
  return classes.join(' ')
})
</script>

<style scoped>
/* Base chip styles */
.chip {
  border-radius: 9999px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  white-space: nowrap;
  user-select: none;
  transition: all 0.2s ease-in-out;
}

/* Size variants */
.chip-small {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  line-height: 1;
}

.chip-medium {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25;
}

/* Icon sizing */
.chip-small .chip-icon {
  font-size: 0.75rem;
}

.chip-medium .chip-icon {
  font-size: 0.875rem;
}

/* Filled variant */
.chip-filled {
  color: white;
  border: none;
}

.chip-filled.chip-green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.chip-filled.chip-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.chip-filled.chip-red {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.chip-filled.chip-orange {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.chip-filled.chip-primary {
  background: linear-gradient(135deg, var(--color-primary, #2467ec) 0%, var(--color-secondary, #1e56d9) 100%);
}

.chip-filled.chip-gray {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
}

/* Filled chip hover effect */
.chip-filled:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Outlined variant */
.chip-outlined {
  background: transparent;
  border: 1.5px solid currentColor;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.chip-outlined.chip-green {
  color: #10b981;
}

.chip-outlined.chip-blue {
  color: #3b82f6;
}

.chip-outlined.chip-red {
  color: #ef4444;
}

.chip-outlined.chip-orange {
  color: #f59e0b;
}

.chip-outlined.chip-primary {
  color: var(--color-primary, #2467ec);
}

.chip-outlined.chip-gray {
  color: #6b7280;
}

/* Dark mode support */
.dark .chip-outlined.chip-primary {
  color: var(--dark-color-primary, #3b82f6);
}

.dark .chip-outlined.chip-gray {
  color: #9ca3af;
}

.dark .chip-outlined:hover {
  opacity: 0.9;
}

/* RTL support - icons */
[dir="rtl"] .chip {
  flex-direction: row-reverse;
}
</style>
