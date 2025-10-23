<template>
  <div class="faq-tab-navigation" :class="{ 'text-center': isMobile }" :dir="direction">
    <h3 class="text-2xl lg:text-3xl font-bold text-heading mb-3.5">
      {{ $t('faq.categoryTitle') }}
    </h3>
    <p class="text-body text-base mb-6">
      {{ $t('faq.categoryDescription') }}
    </p>

    <ul class="flex flex-col gap-4.5" role="tablist">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        role="presentation"
      >
        <button
          :id="`tab-${tab.id}`"
          type="button"
          role="tab"
          class="tab-button relative py-1.5 font-secondary font-semibold text-base transition-all duration-300 text-left w-full"
          :class="[
            activeTab === tab.id
              ? 'text-primary'
              : 'text-heading hover:text-primary'
          ]"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`panel-${tab.id}`"
          :tabindex="activeTab === tab.id ? 0 : -1"
          @click="selectTab(tab.id)"
          @keydown.right="selectNextTab"
          @keydown.left="selectPreviousTab"
          @keydown.down="selectNextTab"
          @keydown.up="selectPreviousTab"
        >
          <!-- Checkmark Icon - Only show when active -->
          <transition name="checkmark">
            <i
              v-if="activeTab === tab.id"
              class="checkmark-icon absolute top-0.5 text-primary text-xl font-normal"
              :class="direction === 'rtl' ? 'right-0' : 'left-0'"
              aria-hidden="true"
            >✓</i>
          </transition>

          <span
            class="tab-label block transition-all duration-300"
            :class="activeTab === tab.id ? (direction === 'rtl' ? 'pr-7.5' : 'pl-7.5') : ''"
          >
            {{ $t(tab.label) }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { t, localeProperties } = useI18n()
const direction = computed(() => localeProperties.value.dir)

interface Tab {
  id: string
  label: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:activeTab': [tabId: string]
}>()

const isMobile = ref(false)

const selectTab = (tabId: string) => {
  emit('update:activeTab', tabId)
}

const selectNextTab = (event: KeyboardEvent) => {
  event.preventDefault()
  const currentIndex = props.tabs.findIndex(tab => tab.id === props.activeTab)
  const nextIndex = (currentIndex + 1) % props.tabs.length
  selectTab(props.tabs[nextIndex].id)
}

const selectPreviousTab = (event: KeyboardEvent) => {
  event.preventDefault()
  const currentIndex = props.tabs.findIndex(tab => tab.id === props.activeTab)
  const previousIndex = currentIndex === 0 ? props.tabs.length - 1 : currentIndex - 1
  selectTab(props.tabs[previousIndex].id)
}

// Detect mobile view
const checkMobile = () => {
  isMobile.value = window.innerWidth < 992
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.faq-tab-navigation {
  padding-right: 1.875rem; /* 30px */
}

@media (max-width: 991px) {
  .faq-tab-navigation {
    padding-right: 0;
    margin-bottom: 2.5rem; /* 40px */
  }
}

.tab-button {
  padding-left: 0;
  padding-right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.tab-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: 4px;
}

/* Checkmark animation */
.checkmark-enter-active {
  transition: all 0.3s ease;
}

.checkmark-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.checkmark-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* RTL checkmark animation */
[dir="rtl"] .checkmark-enter-from {
  transform: translateX(20px);
}

/* Gap utility for spacing */
.gap-4\.5 {
  gap: 1.125rem; /* 18px */
}

/* Padding utilities */
.pl-7\.5 {
  padding-left: 1.875rem; /* 30px */
}

.pr-7\.5 {
  padding-right: 1.875rem; /* 30px */
}

/* RTL Support */
[dir="rtl"] .faq-tab-navigation {
  padding-right: 0;
  padding-left: 1.875rem;
}

[dir="rtl"] .tab-button {
  text-align: right;
}

@media (max-width: 991px) {
  [dir="rtl"] .faq-tab-navigation {
    padding-left: 0;
  }
}
</style>
