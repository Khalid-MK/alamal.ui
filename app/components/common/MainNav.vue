<template>
  <nav class="relative">
     <!--  Link -->
    <div class="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-8">
      <ul>
        <li class="menu-item-has-children">
          <button @mouseenter="showDropdown" @mouseleave="hideDropdown" @click="toggleCoursesMenu"
            class="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1 focus:outline-none">
            {{ $t("Courses") }}
            <Arrow :is-open="isCoursesOpen" />
          </button>
          <ul class="sub-menu">
            <template v-for="section in courses">
              <li v-if="section.departments" class="menu-item-has-children" :key="section.id">
                <button class="flex justify-between items-center  text-gray-700">{{ section[locale] }}
                  <Arrow />
                </button>
  
                <ul class="sub-menu">
                  <template v-for="dept in section.departments">
                    <li v-if="dept.courses" class="menu-item-has-children" :key="dept.id">
                      <button class="flex justify-between items-center">
                        <!-- {{ dept[locale] }} -->
                        <span class="flex-grow text-left">{{ dept[locale] }}</span>
                        <Arrow />
                      </button>
                      <ul class="sub-menu w-full">
                        <li v-for="course in dept.courses" :key="course.id">
                          <button @click="goToCourse" class="text-left">{{ course[locale] }}</button>
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
              </li>
              <li v-if="section.courses" class="menu-item-has-children" :key="'section-courses-' + section.id">
                <button class="flex justify-between items-center">
                  {{ section[locale] }}
                  <Arrow />
                </button>
                <ul class="sub-menu">
                  <li v-for="course in section.courses" class="w-[200px]" :key="course.id">
                    <button @click="goToCourse" class="text-left">
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
        class="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1">
        {{ $t("About") }}
      </NuxtLink>

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
import Arrow from "~/assets/icons/Arrow.vue";

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

const router = useRouter() // ✅ works in Nuxt 4

const goToCourse = () => {
  router.push(`/shop?course=${slugify(props.course[props.locale])}`)
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
/* Mobile responsive */
@media (max-width: 767px) {
  /* .menu-item-has-children {
    position: static;
    opacity: 1;
    display: block;
    transform: none;
    margin-top: 0.5rem;
    box-shadow: none;
    border: 1px solid #e5e7eb;
  } */

  .sub-menu {
    position: static !important;
    display: block !important;
    margin-left: 0;
    margin-top: 0.5rem;
    box-shadow: none;
    background: transparent;
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

/* first level */
.sub-menu {
  position: absolute;
  top: 0;
  left: 100%;
  right: auto;
  z-index: 999;
  width: 230px;
  max-width: 350px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: none;

  padding: 10px 0;

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

ul li .sub-menu li {
  margin: 0px;
  padding: 8px 25px 8px 25px;
}

/* second level */
ul li .sub-menu li .sub-menu {
  left: 100%;
  top: 20%;
  transition: all 0.3s ease-out 0s;
  width: fit-content !important;
}

/* ul li ul li ul li{
  width: 190px;
} */
/* thrid level */
ul li .sub-menu li .sub-menu li .sub-menu {
  left: 100%;
  top: 20%;
  transition: all 0.3s ease-out 0s;
  width: 210px !important;
}

/* ssssssssssssssssssssssssss */
ul li .sub-menu li button {
  padding: 0px;
  width: 100%;
  color: #212237;
  position: relative;
}

ul li .sub-menu li button:hover {
  color: #2467EC;
}

ul li .sub-menu li button:before {
  width: 100%;
  left: 0;
  right: auto;
}

ul li:hover button {
  color: #2467EC;
}

ul li:hover.menu-item-has-children::after {
  color: #2467EC;
}
</style>
