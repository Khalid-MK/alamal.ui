<template>
  <nav class="relative">
    <ul>
      <li class="menu-item-has-children">
        <a href="javascript:void(0)">{{ "Test Courses" }}</a>
        <ul class="sub-menu">
          <template v-for="section in courses">
            <li v-if="section.departments" class="menu-item-has-children" :key="section.id">
              <a href="javascript:void(0)">{{ section[locale] }}</a>
              <ul class="sub-menu">
                <template v-for="dept in section.departments">
                  <li v-if="dept.courses" class="menu-item-has-children" :key="dept.id">
                    <a href="javascript:void(0)">{{ dept[locale] }}</a>
                    <ul class="sub-menu">
                      <li v-for="course in dept.courses" :key="course.id">
                        <NuxtLink :to="'/shop?course=' + slugify(course[locale])">{{ course[locale] }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                </template>
              </ul>
            </li>
            <li v-if="section.courses" class="menu-item-has-children" :key="'section-courses-' + section.id">
              <a href="javascript:void(0)">{{ section[locale] }}</a>
              <ul class="sub-menu">
                <li v-for="course in section.courses" :key="course.id">
                  <NuxtLink :to="'/shop?course=' + slugify(course[locale])">{{ course[locale] }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </li>
    </ul>
    <div class="flex flex-col space-y-4 xl:flex-row xl:items-center xl:space-y-0 xl:space-x-8">
      <!-- About Link -->
      <NuxtLink to="/about"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1">
        {{ $t("About") }}
      </NuxtLink>

      <!-- Courses Dropdown -->
      <div class="relative dropdown-container">
        <button type="button"
          class="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1 focus:outline-none"
          @mouseenter="showDropdown" @mouseleave="hideDropdown" @click="toggleCoursesMenu">
          {{ $t("Courses") }}
          <svg class="w-4 h-4 ml-1 transform transition-transform duration-200" :class="{ 'rotate-180': isCoursesOpen }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Main Dropdown Menu -->
        <div class="dropdown-menu" :class="{ 'dropdown-visible': isCoursesOpen }" @mouseenter="showDropdown"
          @mouseleave="hideDropdown">
          <div class="py-3 relative max-h-96 overflow-y-auto">
            <template class="relative" v-for="section in courses" :key="section.id">
              <!-- Section Header -->
              <div class="px-6 py-2">
                <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
                  {{ section[locale] }}
                </h3>
              </div>

              <!-- Departments with Courses -->
              <div class="space-y-1" v-if="section.departments">
                <div v-for="dept in section.departments" :key="dept.id" class="absolute department-item">
                  <!-- Department Item -->
                  <div class="px-6 py-2 hover:bg-gray-50 cursor-pointer">
                    <div
                      class="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors duration-150">
                      <span class="font-medium">{{ dept[locale] }}</span>
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <!-- Department Submenu -->
                  <div class="department-submenu" v-if="dept.courses && dept.courses.length > 0">
                    <div class="py-3 max-h-80 overflow-y-auto">
                      <div class="px-4 py-2 border-b border-gray-100">
                        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {{ dept[locale] }} Courses
                        </h4>
                      </div>
                      <div class="py-1">
                        <NuxtLink v-for="course in dept.courses" :key="course.id"
                          :to="'/shop?course=' + slugify(course[locale])"
                          class="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150 border-l-4 border-transparent hover:border-blue-500">
                          <div class="flex-1">
                            <div class="font-medium">
                              {{ course[locale] }}
                            </div>
                            <div class="text-xs text-gray-500 mt-1">
                              {{ course.description || "Course details" }}
                            </div>
                          </div>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Direct Section Courses (if no departments) -->
              <div class="py-1" v-else-if="section.courses">
                <NuxtLink v-for="course in section.courses" :key="course.id"
                  :to="'/shop?course=' + slugify(course[locale])"
                  class="flex items-center px-6 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150">
                  <div class="flex-1">
                    <div class="font-medium">{{ course[locale] }}</div>
                    <div class="text-xs text-gray-500 mt-1">
                      {{ course.description || "Course details" }}
                    </div>
                  </div>
                </NuxtLink>
              </div>

              <!-- Divider between sections -->
              <div v-if="courses.indexOf(section) < courses.length - 1" class="mx-4 my-2 border-t border-gray-100">
              </div>
            </template>

            <!-- View All Courses Link -->
            <div class="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <NuxtLink to="/courses"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors duration-150">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ ("ViewAllCourses") }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQs Link -->
      <NuxtLink to="/faq-page"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1">
        {{ $t("FAQs") }}
      </NuxtLink>

      <!-- Events Link -->
      <NuxtLink to="/events"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1">
        {{ $t("Events") }}
      </NuxtLink>

      <!-- Contact Link -->
      <NuxtLink to="/contact"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1">
        {{ $t("Contact") }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import courses from "@/constant/courses.json";
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";

const { locale } = useI18n({ useScope: "global" }); // get the global locale

const isCoursesOpen = ref(false);


let hoverTimeout = null;

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function toggleCoursesMenu() {
  isCoursesOpen.value = !isCoursesOpen.value;
}

function showDropdown() {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  isCoursesOpen.value = true;
}

function hideDropdown() {
  // hoverTimeout = setTimeout(() => {
  //   isCoursesOpen.value = false;
  // }, 150);
}

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-container")) {
      isCoursesOpen.value = false;
    }
  });
});
</script>


<style scoped>
/* Dropdown Menu Styles */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  /* width: 20rem;*/
  background-color: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(0.5rem);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
}

.dropdown-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Department Submenu */
.department-submenu {
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 0.5rem;
  width: 16rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-0.5rem);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
}

.department-item:hover .department-submenu {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

/* Hover effects for dropdown container */
.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Mobile responsive */
@media (max-width: 1279px) {
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    margin-top: 0.5rem;
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }

  .department-submenu {
    position: static;
    margin-left: 1rem;
    margin-top: 0.25rem;
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}

/* Active link styling */
.router-link-active {
  color: #2563eb;
  font-weight: 600;
}

/* Focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* RTL Support */
.rtl .dropdown-menu {
  left: auto;
  right: 0;
}

.rtl .department-submenu {
  left: auto;
  right: 100%;
  margin-left: 0;
  margin-right: 0.5rem;
}

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
  /* word-break: break-word; */
  padding: 0.5rem 0;
  /* background: red; */
}

.sub-menu li {
  max-width: 100%;
  padding: 0 1.2rem;
}

.menu-item-has-children:hover>.sub-menu,
.menu-item-has-children:focus-within>.sub-menu {
  display: block;
}

/* RTL support */
.rtl .menu-item-has-children>.sub-menu {
  left: auto;
  right: 100%;
}

.rtl .sub-menu {
  text-align: right;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
