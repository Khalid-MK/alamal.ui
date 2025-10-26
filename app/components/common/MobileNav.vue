<template>
  <nav class="mobile-nav">
    <!-- Mobile Nav Logo -->
    <div class="mobile-nav-logo mb-6 pb-4 border-b border-gray-200">
      <NuxtLink to="/" class="flex justify-center">
        <img src="/img/logo/logo-primary.png" alt="Al-Amal Academy Logo" class="h-16" />
      </NuxtLink>
    </div>

    <ul class="space-y-2">
      <!-- Home Link -->
      <!-- <li>
                <NuxtLink to="/"
                    class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
                    {{ $t("Home") }}
                </NuxtLink>
            </li> -->

      <!-- Courses Section -->
      <li class="course-section">
        <button @click="toggleCoursesMenu"
          class="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
          {{ $t("Courses") }}
          <Arrow :is-open="isCoursesOpen" />
        </button>

        <div v-show="isCoursesOpen" class="course-submenu bg-gray-50">
          <template v-for="section in courses" :key="section.id">
            <!-- Sections with departments -->
            <div v-if="section.departments" class="section-item">
              <button @click="toggleSection(section.id)"
                class="flex justify-between items-center w-full text-gray-600 py-2 px-6 hover:bg-gray-100">
                {{ section[locale] }}
                <Arrow :is-open="openSections.includes(section.id)" />
              </button>

              <div v-show="openSections.includes(section.id)" class="department-submenu bg-gray-100">
                <template v-for="dept in section.departments" :key="dept.id">
                  <div v-if="dept.courses" class="dept-item">
                    <button @click="toggleDepartment(dept.id)"
                      class="flex justify-between items-center w-full text-gray-600 py-2 px-8 hover:bg-gray-200">
                      {{ dept[locale] }}
                      <Arrow :is-open="openDepartments.includes(dept.id)" />
                    </button>

                    <div v-show="openDepartments.includes(dept.id)" class="courses-list bg-white">
                      <button v-for="course in dept.courses" :key="course.id" @click="goToCourse(course)"
                        class="block w-full text-left text-gray-700 py-2 px-10 hover:bg-blue-50 hover:text-blue-600">
                        {{ course[locale] }}
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Sections with direct courses -->
            <div v-if="section.courses" class="section-item">
              <button @click="toggleSection(section.id)"
                class="flex justify-between items-center w-full text-gray-600 py-2 px-6 hover:bg-gray-100">
                {{ section[locale] }}
                <Arrow :is-open="openSections.includes(section.id)" />
              </button>

              <div v-show="openSections.includes(section.id)" class="courses-list bg-white">
                <button v-for="course in section.courses" :key="course.id" @click="goToCourse(course)"
                  class="block w-full text-left text-gray-700 py-2 px-8 hover:bg-blue-50 hover:text-blue-600">
                  {{ course[locale] }}
                </button>
              </div>
            </div>
          </template>
        </div>
      </li>

      <!-- Other Navigation Links -->

      <li>
        <NuxtLink to="/about"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
          {{ $t("About") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/instructors"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
          {{ $t("Instructors") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/faqs"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
          {{ $t("FAQs") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/privacy-policy"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
          {{ $t("PrivacyPolicy") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/blogs"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
          {{ $t("Blogs") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/events"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100">
          {{ $t("Events") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/contact" class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4">
          {{ $t("Contact") }}
        </NuxtLink>
      </li>
      <li>
        <!-- Auth -->
        <div class="flex gap-4" :class="{ 'flex-col': locale === 'ru' }">
          <NuxtLink to="/signin" class="text-gray-700 hover:text-blue-600">{{ $t("SignIn") }}</NuxtLink>
          <NuxtLink to="/signup" class="bg-primary text-white px-3 py-1 rounded-md hover:bg-blue-700">
            {{ $t("SignUp") }}
          </NuxtLink>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import courses from "@/constant/courses.json";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import Arrow from "~/assets/icons/Arrow.vue";

const { locale } = useI18n({ useScope: "global" });

const isCoursesOpen = ref(false);
const openSections = ref([]);
const openDepartments = ref([]);

const router = useRouter();

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

const goToCourse = (course) => {
  router.push(`/shop?course=${slugify(course[locale.value])}`);
}

function toggleCoursesMenu() {
  isCoursesOpen.value = !isCoursesOpen.value;
  if (!isCoursesOpen.value) {
    openSections.value = [];
    openDepartments.value = [];
  }
}

function toggleSection(sectionId) {
  const index = openSections.value.indexOf(sectionId);
  if (index > -1) {
    openSections.value.splice(index, 1);
    // Close all departments in this section
    openDepartments.value = [];
  } else {
    openSections.value = [sectionId]; // Only one section open at a time
    openDepartments.value = [];
  }
}

function toggleDepartment(deptId) {
  const index = openDepartments.value.indexOf(deptId);
  if (index > -1) {
    openDepartments.value.splice(index, 1);
  } else {
    openDepartments.value = [deptId]; // Only one department open at a time
  }
}
</script>

<style scoped>
.mobile-nav {
  width: 100%;
}

.course-submenu,
.department-submenu,
.courses-list {
  transition: all 0.3s ease;
}

.router-link-active {
  color: #2563eb !important;
  background-color: #eff6ff;
  border-left: 3px solid #2563eb;
}

/* Smooth accordion animation */
.section-item,
.dept-item {
  overflow: hidden;
}

/* Arrow rotation for visual feedback */
.arrow-rotate {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>