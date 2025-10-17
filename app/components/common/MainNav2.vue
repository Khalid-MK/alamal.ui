<template>
  <nav :dir="direction">
    <!-- Link -->
    <div class="flex space-y-4 flex-row items-center md:space-y-0 md:space-x-8">
      <ul>
        <li class="menu-item-has-children">
          <button
            @mouseenter="showDropdown"
            @mouseleave="hideDropdown"
            @click="toggleCoursesMenu"
            class="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1 focus:outline-none"
          >
            {{ $t("Courses") }}
            <Arrow :is-open="isCoursesOpen" />
          </button>
          <ul class="sub-menu">
            <!-- Level 1: Main Course Categories (Quran Classes, Quran Memorization) -->
            <template
              v-if="isCoursesDataLoaded"
              v-for="mainCategory in coursesData.Courses"
              :key="mainCategory.id"
            >
              <li class="menu-item-has-children" :class="isRTL ? 'rtl' : ''">
                <button class="flex justify-between items-center text-gray-700">
                  {{ mainCategory[locale] }}
                  <Arrow />
                </button>

                <!-- Level 2: Age Groups (Adults, Sisters, Kids) -->
                <ul class="sub-menu">
                  <template
                    v-for="ageGroup in coursesData.ageGroup"
                    :key="`${mainCategory.id}-${ageGroup.id}`"
                  >
                    <li class="menu-item-has-children">
                      <button class="flex justify-between items-center">
                        {{ ageGroup[locale] }}
                        <Arrow />
                      </button>

                      <!-- Level 3: Individual Courses -->
                      <ul class="sub-menu w-full">
                        <li
                          v-if="mainCategory.courses"
                          v-for="course in mainCategory.courses"
                          :key="`${mainCategory.id}-${ageGroup.id}-${course.id}`"
                        >
                          <button
                            @click="goToCourse(course, ageGroup, mainCategory)"
                            class="text-left w-full"
                          >
                            {{ course[locale] }}
                          </button>
                        </li>
                        <li
                          class="menu-item-has-children"
                          v-if="mainCategory.departments"
                          v-for="depart in mainCategory.departments"
                        >
                          <button class="flex justify-between items-center">
                            {{ depart[locale] }}
                            <Arrow />
                          </button>
                          <!-- level 4 -->
                          <ul
                            v-if="mainCategory.departments && depart.courses"
                            class="sub-menu w-full"
                          >
                            <li
                              class="menu-item-has-children"
                              v-for="course in depart.courses"
                              :key="course.id"
                            >
                              <template
                                v-if="
                                  course?.sections &&
                                  Array.isArray(course.sections)
                                "
                              >
                                <button
                                  class="flex justify-between items-center"
                                >
                                  {{ course[locale] }}
                                  <Arrow />
                                </button>
                                <!-- level 5 -->
                                <ul class="sub-menu w-full max-1025:top-10 max-1025:left-0">
                                  <li
                                    v-for="level in course.sections"
                                    :key="level"
                                  >
                                    <button
                                      @click="
                                        goToCourse(
                                          course,
                                          depart,
                                          ageGroup,
                                          mainCategory,
                                          level
                                        )
                                      "
                                      class="text-left w-full"
                                    >
                                      {{ level }}
                                    </button>
                                  </li>
                                </ul>
                              </template>
                              <template v-else>
                                <button
                                  @click="
                                    goToCourse(
                                      course,
                                      depart,
                                      ageGroup,
                                      mainCategory
                                    )
                                  "
                                  class="text-left w-full"
                                >
                                  {{ course[locale] }}
                                </button>
                              </template>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
              </li>
            </template>
            <!-- Fallback when data is not loaded -->
            <li v-if="!isCoursesDataLoaded" class="text-gray-500 p-4">
              {{ $t("Loading courses...") }}
            </li>
          </ul>
        </li>
      </ul>

      <!-- About Link -->
      <NuxtLink
        to="/about"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1"
      >
        {{ $t("About") }}
      </NuxtLink>

      <!-- FAQs Link -->
      <NuxtLink
        to="/faq-page"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1"
      >
        {{ $t("FAQs") }}
      </NuxtLink>

      <!-- Events Link -->
      <NuxtLink
        to="/events"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1"
      >
        {{ $t("Events") }}
      </NuxtLink>

      <!-- Contact Link -->
      <NuxtLink
        to="/contact"
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1"
      >
        {{ $t("Contact") }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted } from "vue";
import Arrow from "~/assets/icons/Arrow.vue";
import coursesData from "~/constant/newCourses.json";
const { locale, localeProperties } = useI18n();
const isRTL = computed(() => locale.value === "ar");
const direction = computed(() => localeProperties.value.dir);

// Add safety check for courses data
const isCoursesDataLoaded = computed(() => {
  return (
    coursesData &&
    coursesData.Courses &&
    Array.isArray(coursesData.Courses) &&
    coursesData.ageGroup &&
    Array.isArray(coursesData.ageGroup)
  );
});

const isCoursesOpen = ref(false);
const router = useRouter();

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

const goToCourse = (course, depart, ageGroup, mainCategory, level = null) => {
  // Create a comprehensive route with all levels
  const courseSlug = slugify(course[locale.value]);
  const ageGroupSlug = slugify(ageGroup[locale.value]);
  const categorySlug = slugify(mainCategory[locale.value]);
  const departSlug = slugify(depart[locale.value]);
  const levelSlug = level ? slugify(level) : null;

  // Build query parameters
  let queryParams = `course=${courseSlug}&ageGroup=${ageGroupSlug}&category=${categorySlug}&department=${departSlug}`;
  if (levelSlug) {
    queryParams += `&level=${levelSlug}`;
  }

  // Navigate with query parameters
  router.push(`/shop?${queryParams}`);
};

function toggleCoursesMenu() {
  isCoursesOpen.value = !isCoursesOpen.value;
}

function showDropdown() {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  isCoursesOpen.value = true;
}

function hideDropdown() {
  hoverTimeout = setTimeout(() => {
    isCoursesOpen.value = false;
  }, 150);
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
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-item-has-children {
  position: relative;
}

/* Base dropdown */
.sub-menu {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 230px;
  max-width: 350px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: none;
  padding: 10px 0;
}

/* Show dropdown on hover/focus */
.menu-item-has-children:hover > .sub-menu,
.menu-item-has-children:focus-within > .sub-menu {
  display: block;
}

/* LTR default */
[dir="ltr"] .sub-menu {
  left: 100%;
  right: auto;
  text-align: left;
}

/* RTL override */
[dir="rtl"] .sub-menu {
  right: 100%;
  left: auto;
  text-align: right;
}

/* Sub-menu items */
ul li .sub-menu li {
  margin: 0;
  padding: 8px 25px;
}

/* Nested submenu (2nd level) */
ul li .sub-menu li .sub-menu {
  top: 20%;
  transition: all 0.3s ease-out;
  width: fit-content !important;
}

[dir="ltr"] ul li .sub-menu li .sub-menu {
  left: 100%;
  right: auto;
}

[dir="rtl"] ul li .sub-menu li .sub-menu {
  right: 100%;
  left: auto;
}

/* Third level submenu */
ul li .sub-menu li .sub-menu li .sub-menu {
  top: 20%;
  transition: all 0.3s ease-out;
  width: 210px !important;
}

[dir="ltr"] ul li .sub-menu li .sub-menu li .sub-menu {
  left: 100%;
  right: auto;
}

[dir="rtl"] ul li .sub-menu li .sub-menu li .sub-menu {
  right: 100%;
  left: auto;
}

/* Buttons inside dropdown */
ul li .sub-menu li button {
  padding: 0;
  width: 100%;
  font-weight: 600;
  color: #212237;
  position: relative;
  text-align: inherit;
  gap: 5px;
}

/* Hover effects */
ul li .sub-menu li button:hover,
ul li:hover button {
  color: #2467ec;
}

ul li:hover.menu-item-has-children::after {
  color: #2467ec;
}

/* Enhanced styling for three-level menu */
.sub-menu .menu-item-has-children {
  border-bottom: 1px solid #f0f0f0;
}

.sub-menu .menu-item-has-children:last-child {
  border-bottom: none;
}

/* Age group level styling */
.sub-menu .sub-menu .menu-item-has-children {
  background: #f8f9fa;
}

.sub-menu .sub-menu .menu-item-has-children:hover {
  background: #e9ecef;
}

/* Individual course styling */
.sub-menu .sub-menu .sub-menu li {
  background: #fff;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
}

.sub-menu .sub-menu .sub-menu li:hover {
  border-left-color: #2467ec;
  background: #f8f9fa;
}

/* Course name truncation for long names 
.sub-menu .sub-menu .sub-menu li button {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
}
    */
</style>
