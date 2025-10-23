<template>
  <div class="accordion-item rounded-lg shadow-card mb-7 last:mb-0">
    <button
      :id="`accordion-button-${id}`"
      type="button"
      class="accordion-button w-full text-left font-semibold text-lg transition-all duration-300 relative"
      :class="[
        isExpanded
          ? 'bg-primary text-white rounded-t-lg px-7 py-5'
          : 'bg-transparent text-heading rounded-lg px-7 py-5 hover:bg-primary hover:text-white'
      ]"
      :aria-expanded="isExpanded"
      :aria-controls="`accordion-content-${id}`"
      @click="toggle"
    >
      <span class="pr-11 block">{{ question }}</span>

      <!-- Chevron Icon -->
      <svg
        class="absolute top-1/2 -translate-y-1/2 w-3 h-3 text-current transition-transform duration-300"
        :class="[
          isExpanded ? 'rotate-180' : 'rotate-0',
          direction === 'rtl' ? 'left-7' : 'right-7'
        ]"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Accordion Content with Smooth Transition -->
    <transition
      name="accordion"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div
        v-show="isExpanded"
        :id="`accordion-content-${id}`"
        class="accordion-content overflow-hidden"
        role="region"
        :aria-labelledby="`accordion-button-${id}`"
      >
        <div class="accordion-body px-7 pt-6 pb-7 text-body text-base leading-relaxed">
          <p>{{ answer }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Props {
  id: string | number
  question: string
  answer: string
  isExpanded: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  toggle: [id: string | number]
}>()

const toggle = () => {
  emit('toggle', props.id)
}

// Smooth height transition functions
const enter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.offsetHeight // Force reflow
  element.style.height = element.scrollHeight + 'px'
}

const afterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

const leave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.offsetHeight // Force reflow
  element.style.height = '0'
}
</script>

<style scoped>
.accordion-item {
  box-shadow: 0px 10px 50px 0px rgba(26, 46, 85, 0.1);
}

.accordion-button {
  outline: none;
}

.accordion-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Accordion transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
}

/* RTL Support */
[dir="rtl"] .accordion-button span {
  padding-right: 0;
  padding-left: 2.75rem; /* 44px */
}

/* Shadow card utility */
.shadow-card {
  box-shadow: 0px 10px 50px 0px rgba(26, 46, 85, 0.1);
}
</style>
