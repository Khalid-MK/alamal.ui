<template>
    <div :dir="langDir" class="w-full">
      <header>
        <!-- Reminder bar -->
        <div
          v-if="!hideReminder"
          class="hidden md:block bg-blue-600 text-white py-2"
        >
          <div class="container mx-auto flex justify-between items-center">
            <NuxtLink class="px-4 py-1 bg-white text-blue-600 rounded-md text-sm font-medium" to="/course-details">
              {{ $t("JoinFreeTrialLessons") }}
            </NuxtLink>
            <div class="flex gap-3">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
  
        <!-- Navbar -->
        <div
          :class="['sticky top-0 bg-white shadow z-50 transition-all', isSticky ? 'py-2' : 'py-4']"
        >
          <div class="container mx-auto flex justify-between items-center px-4">
            <!-- Left (Logo + Nav) -->
            <div class="flex items-center gap-6">
              <NuxtLink to="/">
                <img src="/img/logo/colioured logo&text.svg" alt="logo" class="h-10" />
              </NuxtLink>
              <!-- Desktop Menu -->
              <div class="hidden xl:block">
                <MainNav />
              </div>
            </div>
  
            <!-- Right -->
            <div class="flex items-center gap-6">
              <!-- Language Switch -->
              <div class="relative hidden xl:block">
                <button class="flex items-center gap-1">
                  🌐
                </button>
                <ul class="absolute right-0 mt-2 w-32 bg-white shadow rounded-md">
                  <li
                    v-for="item in locales"
                    :key="item.code"
                    class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    @click="handleChangeLanguage(item)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
  
              <!-- Auth -->
              <div v-if="!authStore.user" class="hidden md:flex gap-4">
                <NuxtLink to="/signin" class="text-gray-700 hover:text-blue-600">{{ $t("SignIn") }}</NuxtLink>
                <NuxtLink to="/signup" class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  {{ $t("SignUp") }}
                </NuxtLink>
              </div>
              <div v-else>
                <NuxtLink to="/student-profile" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-8 w-8 text-gray-600" viewBox="0 0 24 24">
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                         1.79-4 4 1.79 4 4 4zm0 2c-2.67
                         0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                  <h4 class="mb-0">{{ authStore.user.firstName }}</h4>
                </NuxtLink>
              </div>
  
              <!-- Mobile Menu Toggle -->
              <button class="xl:hidden flex flex-col gap-1" @click="handleSidebar">
                <span class="w-6 h-0.5 bg-gray-800"></span>
                <span class="w-6 h-0.5 bg-gray-800"></span>
                <span class="w-6 h-0.5 bg-gray-800"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Mobile Menu -->
      <transition name="slide">
        <div v-if="showSidebar" class="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 overflow-y-auto">
            <button class="absolute top-4 right-4 text-gray-600" @click="handleSidebarClose">
              ✕
            </button>
            <MainNav /> <!-- 🔥 same nav reused -->
          </div>
        </div>
      </transition>
    </div>
  </template>
  

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Basic courses data structure
const courses = [
  {
    id: 1,
    en: "Programming",
    ar: "البرمجة",
    departments: [
      {
        id: 1,
        en: "Web Development",
        ar: "تطوير الويب",
        courses: [
          { id: 1, en: "HTML & CSS", ar: "HTML و CSS" },
          { id: 2, en: "JavaScript", ar: "جافا سكريبت" },
          { id: 3, en: "Vue.js", ar: "Vue.js" },
        ],
      },
    ],
  },
  {
    id: 2,
    en: "Design",
    ar: "التصميم",
    courses: [
      { id: 4, en: "UI/UX Design", ar: "تصميم واجهة المستخدم" },
      { id: 5, en: "Graphic Design", ar: "التصميم الجرافيكي" },
    ],
  },
];

const currentLocale = computed(() => locale.value);

const isRtl = computed(() => {
  const rtlLocales = ["ar", "he", "fa", "ur"];
  return rtlLocales.includes(locale.value);
});

const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-item-has-children {
  position: relative;
}

.sub-menu {
  position: absolute;
  top: 0;
  left: 100%;
  right: auto;
  z-index: 999;
  width: fit-content;
  max-width: 220px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: none;
  white-space: normal;
  word-break: break-word;
  padding: 0.5rem 0;
}

.sub-menu li {
  max-width: 100%;
  padding: 0 1.2rem;
}

.menu-item-has-children:hover > .sub-menu,
.menu-item-has-children:focus-within > .sub-menu {
  display: block;
}

/* RTL support */
.rtl .menu-item-has-children > .sub-menu {
  left: auto;
  right: 100%;
}

.rtl .sub-menu {
  text-align: right;
}
</style>
