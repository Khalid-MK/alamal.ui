<template>
  <nav class="mobile-nav">
    <ul class="space-y-2">
      <li class="course-section">
        <button
          @click="toggleCoursesMenu"
          class="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100"
        >
          {{ $t("Courses") }}
          <Arrow :is-open="isCoursesOpen" />
        </button>

        <div v-show="isCoursesOpen" class="course-submenu bg-gray-50">
          <!-- Level 1: Main Course Categories -->
          <template
            v-for="courseCategory in coursesData.Courses"
            :key="courseCategory.id"
          >
            <div class="category-item">
              <button
                @click="toggleCategory(courseCategory.id)"
                class="flex justify-between items-center w-full text-gray-600 py-2 px-6 hover:bg-gray-100"
              >
                {{ courseCategory[locale] }}
                <Arrow :is-open="openCategories.includes(courseCategory.id)" />
              </button>

              <!-- Level 2: Age Groups (Static for all categories) -->
              <div
                v-show="openCategories.includes(courseCategory.id)"
                class="age-group-submenu bg-gray-100"
              >
                <template
                  v-for="ageGroup in coursesData.ageGroup"
                  :key="ageGroup.id"
                >
                  <div class="age-group-item">
                    <button
                      @click="toggleAgeGroup(courseCategory.id, ageGroup.id)"
                      class="flex justify-between items-center w-full text-gray-600 py-2 px-8 hover:bg-gray-200"
                    >
                      {{ ageGroup[locale] }}
                      <Arrow
                        :is-open="
                          isAgeGroupOpen(courseCategory.id, ageGroup.id)
                        "
                      />
                    </button>

                    <!-- Level 3: Departments or Direct Courses -->
                    <div
                      v-show="isAgeGroupOpen(courseCategory.id, ageGroup.id)"
                      class="content-submenu bg-white"
                    >
                      <!-- If category has departments -->
                      <template v-if="courseCategory.departments">
                        <div
                          v-for="dept in courseCategory.departments"
                          :key="dept.id"
                          class="dept-item"
                        >
                          <button
                            @click="
                              toggleDepartment(
                                courseCategory.id,
                                ageGroup.id,
                                dept.id
                              )
                            "
                            class="flex justify-between items-center w-full text-gray-600 py-2 px-10 hover:bg-gray-100"
                          >
                            {{ dept[locale] }}
                            <Arrow
                              :is-open="
                                isDepartmentOpen(
                                  courseCategory.id,
                                  ageGroup.id,
                                  dept.id
                                )
                              "
                            />
                          </button>

                          <div
                            v-show="
                              isDepartmentOpen(
                                courseCategory.id,
                                ageGroup.id,
                                dept.id
                              )
                            "
                            class="courses-list bg-gray-50"
                          >
                            <button
                              v-for="course in dept.courses"
                              :key="course.id"
                              @click="goToCourse(course, ageGroup)"
                              class="block w-full text-left text-gray-700 py-2 px-12 hover:bg-blue-50 hover:text-blue-600"
                            >
                              {{ course[locale] }}
                            </button>
                          </div>
                        </div>
                      </template>

                      <!-- If category has direct courses -->
                      <template v-if="courseCategory.courses">
                        <div class="courses-list">
                          <button
                            v-for="course in courseCategory.courses"
                            :key="course.id"
                            @click="goToCourse(course, ageGroup)"
                            class="block w-full text-left text-gray-700 py-2 px-10 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {{ course[locale] }}
                          </button>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </li>

      <!-- Other Navigation Links -->
      <li>
        <NuxtLink
          to="/about"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100"
        >
          {{ $t("About") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          to="/faq-page"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100"
        >
          {{ $t("FAQs") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          to="/events"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4 border-b border-gray-100"
        >
          {{ $t("Events") }}
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          to="/contact"
          class="block text-gray-700 hover:text-blue-600 font-medium py-3 px-4"
        >
          {{ $t("Contact") }}
        </NuxtLink>
      </li>

      <li>
        <!-- Auth -->
        <div class="flex gap-4" :class="{ 'flex-col': locale === 'ru' }">
          <NuxtLink to="/signin" class="text-gray-700 hover:text-blue-600">{{
            $t("SignIn")
          }}</NuxtLink>
          <NuxtLink
            to="/signup"
            class="bg-primary text-white px-3 py-1 rounded-md hover:bg-blue-700"
          >
            {{ $t("SignUp") }}
          </NuxtLink>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import coursesData from "@/constant/newCourses.json";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import Arrow from "~/assets/icons/Arrow.vue";

const { locale } = useI18n({ useScope: "global" });

const isCoursesOpen = ref(false);
const openCategories = ref([]);
const openAgeGroups = ref([]);
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

const goToCourse = (course, ageGroup) => {
  const courseSlug = slugify(course[locale.value]);
  const ageGroupSlug = slugify(ageGroup[locale.value]);
  // Note: sections array is just metadata within the course object, not a navigation level
  router.push(`/shop?course=${courseSlug}&ageGroup=${ageGroupSlug}`);
};

function toggleCoursesMenu() {
  isCoursesOpen.value = !isCoursesOpen.value;
  if (!isCoursesOpen.value) {
    openCategories.value = [];
    openAgeGroups.value = [];
    openDepartments.value = [];
  }
}

function toggleCategory(categoryId) {
  const index = openCategories.value.indexOf(categoryId);
  if (index > -1) {
    openCategories.value.splice(index, 1);
    openAgeGroups.value = openAgeGroups.value.filter(
      (item) => !item.startsWith(`${categoryId}-`)
    );
    openDepartments.value = openDepartments.value.filter(
      (item) => !item.startsWith(`${categoryId}-`)
    );
  } else {
    openCategories.value.push(categoryId);
  }
}

function toggleAgeGroup(categoryId, ageGroupId) {
  const key = `${categoryId}-${ageGroupId}`;
  const index = openAgeGroups.value.indexOf(key);
  if (index > -1) {
    openAgeGroups.value.splice(index, 1);
    openDepartments.value = openDepartments.value.filter(
      (item) => !item.startsWith(key)
    );
  } else {
    openAgeGroups.value.push(key);
  }
}

function isAgeGroupOpen(categoryId, ageGroupId) {
  return openAgeGroups.value.includes(`${categoryId}-${ageGroupId}`);
}

function toggleDepartment(categoryId, ageGroupId, deptId) {
  const key = `${categoryId}-${ageGroupId}-${deptId}`;
  const index = openDepartments.value.indexOf(key);
  if (index > -1) {
    openDepartments.value.splice(index, 1);
  } else {
    openDepartments.value.push(key);
  }
}

function isDepartmentOpen(categoryId, ageGroupId, deptId) {
  return openDepartments.value.includes(
    `${categoryId}-${ageGroupId}-${deptId}`
  );
}
</script>

<style scoped>
.mobile-nav {
  width: 100%;
}

.course-submenu,
.age-group-submenu,
.content-submenu,
.courses-list {
  transition: all 0.3s ease;
}

.router-link-active {
  color: #2563eb !important;
  background-color: #eff6ff;
  border-left: 3px solid #2563eb;
}

.category-item,
.age-group-item,
.dept-item {
  overflow: hidden;
}

.arrow-rotate {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>
