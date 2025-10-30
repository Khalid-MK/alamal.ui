<template>
  <!-- Auto-deploy test: October 21, 2025 -->
  <div :dir="direction">
    <header class="edu-header">
      <!-- Reminder bar -->
      <div v-if="!hideReminder" class="header-top-bar hidden md:block px-5">
        <div class="max-w-7xl mx-auto flex justify-between gap-2 items-center">
          <EduButton rectangular variant="secondary" size="medium" icon="icon-4" to="/course-details">
            {{ $t("JoinFreeTrialLessons") }}
          </EduButton>
          <NewsTicker :news="headlines" />
          <div class="flex gap-3 header-social">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <!-- Sticky Placeholder (prevents layout shift) -->
      <div id="sticky-placeholder" ref="placeholderRef"></div>

      <!-- Navbar -->
      <div ref="navbarRef" class="header-mainmenu bg-white shadow p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center gap-5">
          <!-- Left (Logo + Nav) -->
          <div class="flex items-center gap-5">
            <NuxtLink to="/">
              <img src="/img/logo/logo-horizontal-colored.png" alt="Al-Amal Academy Logo" class="h-10 min-w-[120px]" />
            </NuxtLink>
            <!-- Desktop Menu -->
            <div class="min-[850px]:bg-blue-500 block-class">
              <CommonMainNav />
            </div>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-5 lg:gap-10">
            <!-- Language Switch -->
            <div class="menu-item-has-children" :class="{ open: isOpen }">
              <button @click="toggleDropdown">
                <Translation />
              </button>
              <ul class="sub-menu" v-if="isOpen">
                <li v-for="lang in locales" :key="lang.code">
                  <button class="flex hover:text-primary items-center" @click="changeLocale(lang.code)">
                    {{ lang.name }}
                  </button>
                </li>
              </ul>
            </div>

            <!-- Auth -->
            <div class="signIn-container items-center gap-2 flex-col lg:flex-row"
              :class="{ 'flex-col': locale === 'ru' }">
              <NuxtLink to="/signin" class="flex items-center justify-center text-gray-700 hover:text-primary">{{
                $t("SignIn") }}</NuxtLink>
              <EduButton variant="primary" size="small" to="/signup">
                {{ $t("SignUp") }}
              </EduButton>
            </div>

            <!-- Mobile Menu Toggle -->
            <button class="mobile-menu-toggle-class flex-col gap-1" @click="handleSidebar">
              <span class="w-6 h-0.5 bg-gray-800"></span>
              <span class="w-6 h-0.5 bg-gray-800"></span>
              <span class="w-6 h-0.5 bg-gray-800"></span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div v-if="showSidebar" class="fixed inset-0 z-[100] bg-black bg-opacity-50" @click="handleSidebarClose">
      <div class="absolute top-0 w-64 h-full bg-white shadow-lg p-6 overflow-y-auto"
        :class="direction === 'rtl' ? 'left-0' : 'right-0'" @click.stop>
        <button class="absolute top-4 text-gray-600 text-xl font-bold hover:text-gray-800"
          :class="direction === 'rtl' ? 'left-4' : 'right-4'" @click="handleSidebarClose">
          ✕
        </button>
        <div class="mt-8">
          <MobileNav :handleSidebarClose=handleSidebarClose />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
// import { useAuthStore } from "~/stores/authStore";
import MobileNav from "./MobileNav.vue";
import Translation from "~/assets/icons/Translation.vue";
import EduButton from "~/components/common/EduButton.vue";

// store - temporarily disabled
// const authStore = useAuthStore();

// reactive state
const { locale, localeProperties, locales, setLocale } = useI18n()
const isOpen = ref(false);
const hideReminder = ref(false);
const showSidebar = ref(false);
const navbarRef = ref<HTMLElement | null>(null);
const placeholderRef = ref<HTMLElement | null>(null);

const direction = computed(() => localeProperties.value.dir);
const headlines = [
  "Breaking: Ramadan starts next week 🌙",
  "New Quran Tajweed course available online 📖",
  "Special discount for Hifz classes 🕌",
  "Register now for Summer Islamic Camp ☀️",
];
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
// Edublink-style sticky header logic
const handleSticky = () => {
  if (typeof window === "undefined" || !navbarRef.value || !placeholderRef.value) return;

  const navbar = navbarRef.value;
  const placeholder = placeholderRef.value;
  const scrollY = window.scrollY;

  // Get navbar height
  const navbarHeight = navbar.offsetHeight;

  // Get top header height (reminder bar if exists)
  const topHeader = document.querySelector('.header-top-bar');
  const topHeaderHeight = topHeader ? topHeader.clientHeight : 0;

  // Calculate scroll threshold (topHeader + 200px like Edublink)
  const scrollThreshold = topHeaderHeight + 200;

  // Apply sticky behavior
  if (scrollY > scrollThreshold) {
    // Add sticky class
    navbar.classList.add('header-sticky');
    // Set placeholder height to prevent layout jump
    placeholder.style.height = `${navbarHeight}px`;
  } else {
    // Remove sticky class
    navbar.classList.remove('header-sticky');
    // Reset placeholder height
    placeholder.style.height = '0px';
  }
};

function handleSidebar() {
  showSidebar.value = true;
}

const handleSidebarClose = () => {
  showSidebar.value = false;
};

const handleReminder = () => {
  hideReminder.value = !hideReminder.value;
};

// lifecycle hooks
onMounted(async () => {
  if (typeof window !== "undefined") {
    // Add scroll listener for sticky header
    window.addEventListener("scroll", handleSticky);
    // Call once on mount in case page is already scrolled
    handleSticky();
  }
  // await getUser();
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", handleSticky);
  }
});

// Locale change watchers removed for production


function changeLocale(locale: "en" | "ar" | "ru") {
  setLocale(locale)
  isOpen.value = false
}
</script>

<style scoped lang="scss">
.block-class {
  display: block;

  @media (max-width:863px) {
    display: none;

  }

}

.signIn-container {
  display: flex;

  @media (max-width:863px) {
    display: none;

  }
}

.mobile-menu-toggle-class {
  display: none;

  @media (max-width:863px) {
    display: flex;

  }
}

/* Header Top Bar - EduBlink University Style */
.header-top-bar {
  background-color: #f7f5f2;
  padding-top: 0;
  padding-bottom: 0;
}

.header-top-bar :deep(.news-ticker) {
  color: var(--color-heading, #181818);
  font-weight: 500;
}

.header-social a {
  color: var(--color-secondary, #ee4a62);
  font-size: 14px;
  transition: color 0.3s ease;
}

.header-social a:hover {
  color: var(--color-primary, #1ab69d);
}

/* Edublink-style Sticky Header */
.header-mainmenu {
  position: relative;
  z-index: 50;
  transition: all 0.3s ease;
}

.header-mainmenu.header-sticky {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: white;
  box-shadow: 0 6px 15px 0 rgba(0, 0, 0, 0.05);
  animation: headerSlideDown 0.95s ease forwards;
}

/* Sticky placeholder to prevent layout jump */
#sticky-placeholder {
  transition: height 0.3s ease;
}

/* Slide-down animation (Edublink-style) */
@keyframes headerSlideDown {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}

/* Custom transitions for mobile menu */
.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}

/* Ensure mobile menu is properly positioned */
.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

/* Add some basic animations */
.transition-all {
  transition: all 0.3s ease;
}

/* Debug styles */
.debug-info {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 9999;
}

.menu-item-has-children {
  position: relative;
}

.menu-item-has-children.open .sub-menu {
  display: block;
}

.sub-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 10px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  min-width: 80px;
  z-index: 50;
}

/* :deep([dir="rtl"] .sub-menu) {
  left: 10px !important;
  right: auto !important;
} */

[dir="rtl"] .sub-menu {
  left: 10px !important;
  right: auto !important;
}


.sub-menu li button {
  width: 100%;
  padding: 8px 12px;
  text-align: left;
}

.sub-menu li button:hover {
  background: #f3f4f6;
}
</style>
