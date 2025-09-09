<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import en from '@/constant/data(en).json'

// Types
interface Course {
    id: string
    courseImage: string
    title: string
    category: string[]
    badgeClass: string
    level: string
    beginer: string
    shortDesc: string
    courseTitle: string
    viewBtn: string
    credit: string
    clock: string
    infoList?: Array<{ infoListTitle: string }>
}

// Reactive data
const courses = ref<Course[]>([])
const selectedCategory = ref<string>('All')
const showAllCourses = ref<boolean>(false)
const expandedInfo = ref<Record<string, boolean>>({})

// Methods
const fetchCourseItems = (): void => {
    courses.value = en.courses.map((course: any) => ({
        ...course,
        id: String(course.id)
    }))
}

const setCategory = (category: string): void => {
    selectedCategory.value = category
    showAllCourses.value = false // Reset to 5 courses when switching category
}

const toggleCourses = (): void => {
    showAllCourses.value = !showAllCourses.value
}

const toggleInfo = (courseId: string): void => {
    expandedInfo.value[courseId] = !expandedInfo.value[courseId]
}

// Computed
const filteredCourses = computed((): Course[] => {
    let filtered = selectedCategory.value === 'All'
        ? courses.value
        : courses.value.filter(course => course.category.includes(selectedCategory.value))

    return showAllCourses.value ? filtered : filtered.slice(0, 5)
})

const getCategoryCount = (category: string): number => {
    if (category === 'All') return courses.value.length
    return courses.value.filter(c => c.category.includes(category)).length
}

// Lifecycle
onMounted(() => {
    fetchCourseItems()
})
</script>

<template>
    <section class="relative py-20 lg:py-28">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header Section -->
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 lg:mb-16">
                <!-- Title -->
                <div class="flex-1 mb-8 lg:mb-0">
                    <div class="mb-12">
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Important
                            <span class="down-mark-line">
                                Courses
                                <!-- <span class="absolute bottom-0 left-0 w-full h-1 bg-red-500"></span> -->
                            </span>
                            <span class="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-600">
                                Currently Available
                            </span>
                        </h2>
                    </div>
                </div>

                <!-- Category Filter Buttons -->
                <div class="flex-1 lg:mt-14">
                    <nav>
                        <div class="flex flex-wrap gap-2 sm:gap-4">
                            <button
                                class="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{
                                    'bg-blue-600 text-white hover:bg-blue-700': selectedCategory === 'All',
                                    'bg-gray-200 text-gray-700': selectedCategory !== 'All'
                                }" @click="setCategory('All')">
                                All <span class="text-red-500 font-bold">[{{ getCategoryCount('All') }}]</span>
                            </button>

                            <button
                                class="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{
                                    'bg-blue-600 text-white hover:bg-blue-700': selectedCategory === 'Quraan',
                                    'bg-gray-200 text-gray-700': selectedCategory !== 'Quraan'
                                }" @click="setCategory('Quraan')">
                                Quraan <span class="text-red-500 font-bold">[{{ getCategoryCount('Quraan') }}]</span>
                            </button>

                            <button
                                class="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{
                                    'bg-blue-600 text-white hover:bg-blue-700': selectedCategory === 'Tajweed',
                                    'bg-gray-200 text-gray-700': selectedCategory !== 'Tajweed'
                                }" @click="setCategory('Tajweed')">
                                Tajweed <span class="text-red-500 font-bold">[{{ getCategoryCount('Tajweed') }}]</span>
                            </button>

                            <button
                                class="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{
                                    'bg-blue-600 text-white hover:bg-blue-700': selectedCategory === 'Arabic',
                                    'bg-gray-200 text-gray-700': selectedCategory !== 'Arabic'
                                }" @click="setCategory('Arabic')">
                                Arabic <span class="text-red-500 font-bold">[{{ getCategoryCount('Arabic') }}]</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            <!-- Courses Grid -->
            <div class="mb-8">
                <div class="flex flex-wrap -mx-4">
                    <div v-for="item in filteredCourses" :key="item.id" class="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div
                            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <!-- Course Image -->
                            <div class="relative overflow-hidden">
                                <NuxtLink :to="`/course-details/${item.id}`">
                                    <img :src="item.courseImage" alt="course-img"
                                        class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300">
                                </NuxtLink>
                            </div>

                            <!-- Course Content -->
                            <div class="p-6">
                                <!-- Category Badge -->
                                <div class="mb-3">
                                    <span
                                        class="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                                        <NuxtLink to="/course">{{ item.category.join(", ") }}</NuxtLink>
                                    </span>
                                </div>

                                <!-- Course Title -->
                                <NuxtLink :to="`/course-details/${item.id}`">
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3 h-12 hover:text-blue-600 transition-colors duration-200">
                                        {{ item.title }}
                                    </h3>
                                </NuxtLink>

                                <!-- Course Level and Description -->
                                <div class="mb-4">
                                    <h5 class="text-sm font-medium text-gray-600 mb-2">
                                        {{ item.level }} <span class="text-green-600">{{ item.beginer }}</span>
                                    </h5>
                                    <p class="text-gray-700 text-sm leading-relaxed">{{ item.shortDesc }}</p>
                                </div>

                                <!-- Course Actions -->
                                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <NuxtLink :to="`/course-details/${item.id}`"
                                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {{ item.viewBtn }}
                                    </NuxtLink>

                                    <div class="flex items-center">
                                        <div
                                            class="p-2 text-gray-900 hover:text-blue-600 hover:bg-gray-100  transition-all duration-200">
                                            <i class="fa-solid fa-bars mr-1"></i>{{ item.credit }}
                                        </div>
                                        <div
                                            class="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                                            <i class="fa-regular fa-clock mr-1"></i> {{ item.clock }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Additional Course Info (Alternative Layout) -->
                            <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
                                <div class="flex items-center justify-between">
                                    <NuxtLink to="/course"
                                        class="text-sm font-medium text-blue-600 hover:text-blue-800">
                                        {{ item.category.join(", ") }}
                                    </NuxtLink>
                                    <span class="flex items-center text-sm text-yellow-500">
                                        <i class="fas fa-star mr-1"></i>4.9 (25)
                                    </span>
                                </div>
                                <div class="mt-2">
                                    <h3 class="text-lg font-semibold text-gray-900">
                                        <NuxtLink :to="`/course-details/${item.id}`" class="hover:text-blue-600">
                                            {{ item.courseTitle }}
                                        </NuxtLink>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- See More / Show Less Button -->
                <div class="flex justify-center mt-8">
                    <button v-if="filteredCourses.length >= 5" @click="toggleCourses"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {{ showAllCourses ? 'Show Less' : 'See More' }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped>
.down-mark-line {
    position: relative;
    z-index: 2;
    display: inline-block;
}

.down-mark-line::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    height: 100%;
    background: url(/img/icon/down-mark-line.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    animation: section-animation 3s infinite;
}

@keyframes section-animation {
    0% {
        width: 0;
    }

    15% {
        width: 100%;
    }

    85% {
        opacity: 1;
    }

    90% {
        width: 100%;
        opacity: 0;
    }

    to {
        width: 0;
        opacity: 0;
    }
}
</style>