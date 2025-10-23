<template>
  <nav :dir="direction">
    <!--  Link -->
    <div class="flex space-y-4 flex-row items-center md:space-y-0 md:space-x-8">
      <ul>
        <li class="menu-item-has-children">
          <button @mouseenter="showDropdown" @mouseleave="hideDropdown" @click="toggleCoursesMenu"
            class="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2 px-1 focus:outline-none text-sm lg:text-base">
            {{ $t("Courses") }}
            <Arrow :is-open="isCoursesOpen" />
          </button>
          <ul class="sub-menu">
            <template v-for="section in coursesArr">
              <li v-if="section.departments" :class="isRTL ? 'menu-item-has-children rtl' : 'menu-item-has-children'"
                :key="section.id">
                <button class="flex justify-between hover:text-primary items-center  text-gray-700">{{ section[locale]
                }}
                  <Arrow />
                </button>

                <ul class="sub-menu">
                  <template v-for="dept in section.departments">
                    <li v-if="dept.courses" class="menu-item-has-children" :key="dept.id">
                      <button class="flex hover:text-primary justify-between items-center">
                        {{ dept[locale] }}
                        <!-- <span class="flex-grow">{{ dept[locale] }}</span> -->
                        <Arrow />
                      </button>
                      <ul class="sub-menu w-full">
                        <li v-for="course in dept.courses" :key="course.id">
                          <button @click="goToCourse(course)" class="text-left hover:text-primary">{{ course[locale]
                            }}</button>
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
              </li>
              <li v-if="section.courses" class="menu-item-has-children" :key="'section-courses-' + section.id">
                <button class="flex justify-between items-center hover:text-primary">
                  {{ section[locale] }}
                  <Arrow />
                </button>
                <ul class="sub-menu">
                  <li v-for="course in section.courses" class="w-[200px]" :key="course.id">
                    <button @click="goToCourse(course)" class="text-left hover:text-primary">
                      {{ course[locale] }}
                    </button>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </li>
      </ul>
      <!-- About Link -->
      <NuxtLink to="/about"
        class="relative text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2 px-1 text-sm lg:text-base">
        {{ $t("About") }}
      </NuxtLink>

      <!-- FAQs Link -->
      <NuxtLink to="/faq-page"
        class="relative text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2 px-1 text-sm lg:text-base">
        {{ $t("FAQs") }}
      </NuxtLink>

      <!-- Privacy Policy Link -->
      <NuxtLink to="/privacy-policy"
        class="relative text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2 px-1 text-sm lg:text-base">
        {{ $t("PrivacyPolicy") }}
      </NuxtLink>

      <!-- Events Link -->
      <NuxtLink to="/events"
        class="relative text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2 px-1 text-sm lg:text-base">
        {{ $t("Events") }}
      </NuxtLink>

      <!-- Contact Link -->
      <NuxtLink to="/contact"
        class="relative text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2 px-1 text-sm lg:text-base">
        {{ $t("Contact") }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import coursesArr from "@/constant/courses.json";
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import Arrow from "~/assets/icons/Arrow.vue";
const { locale, localeProperties } = useI18n()  // Same global state!
const isRTL = computed(() => locale.value === 'ar')
const direction = computed(() => localeProperties.value.dir)

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

const router = useRouter() // ✅ works in Nuxt 4

const goToCourse = (course) => {
  const courseSlug = slugify(course[locale.value])
  router.push(`/shop?course=${courseSlug}`)
}
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
.menu-item-has-children:hover>.sub-menu,
.menu-item-has-children:focus-within>.sub-menu {
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
  /* color: #212237; */
  position: relative;
  text-align: inherit;
  gap: 5px
}

button {
  color: #212237;
}

ul li:hover.menu-item-has-children::after {
  color: #2467EC;
}
</style>
