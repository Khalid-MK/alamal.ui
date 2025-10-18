<script setup lang="ts">
import { ref, computed, watch } from "vue";
import en from "@/constant/data(en).json";
import ar from "@/constant/data(ar).json";
import ru from "@/constant/data(ru).json";

const { locale, localeProperties, t } = useI18n();

const direction = computed(() => localeProperties.value.dir);

interface Course {
    id: string;
    courseImage: string;
    title: string;
    category: string[];
    badgeClass?: string;
    badge?: string;
    level?: string;
    beginer?: string;
    shortDesc: string;
    courseTitle?: string;
    viewBtn: string;
    credit?: string;
    clock?: string;
    infoList?: Array<{ infoListTitle: string }>;
    duration?: string;
    instructor?: string;
    instructorImage?: string;
    price?: string;
    priceOld?: string;
    rating?: string;
    network?: string;
}

const filterCategories = [
    { key: "All", translationKey: "All" },
    { key: "Quraan", translationKey: "Quraan" },
    { key: "Tajweed", translationKey: "Tajweed" },
    { key: "Arabic", translationKey: "Arabic" },
] as const;

const courses = ref<Course[]>([]);
const selectedCategory = ref<string>("All");
const showAllCourses = ref<boolean>(false);

const fetchCourseItems = (): void => {
    const dataset = locale.value === "ar" ? ar : locale.value === "ru" ? ru : en;
    courses.value = dataset.courses.map((course: any, index: number) => ({
        ...course,
        id: String(course.id ?? index),
    }));
};

watch(
    locale,
    () => {
        fetchCourseItems();
        selectedCategory.value = "All";
        showAllCourses.value = false;
    },
    { immediate: true }
);

const filteredByCategory = computed((): Course[] => {
    if (selectedCategory.value === "All") {
        return courses.value;
    }

    return courses.value.filter((course) =>
        course.category.includes(selectedCategory.value)
    );
});

const visibleCourses = computed((): Course[] => {
    return showAllCourses.value
        ? filteredByCategory.value
        : filteredByCategory.value.slice(0, 5);
});

const hasMoreCourses = computed(() => filteredByCategory.value.length > 5);

const setCategory = (category: string): void => {
    selectedCategory.value = category;
    showAllCourses.value = false;
};

const toggleCourses = (): void => {
    showAllCourses.value = !showAllCourses.value;
};

const getCategoryCount = (category: string): number => {
    if (category === "All") return courses.value.length;
    return courses.value.filter((c) => c.category.includes(category)).length;
};

const getInstructorInitial = (name?: string): string => {
    if (!name) return "A";
    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
    return initials.slice(0, 1) || "A";
};

const getPrimaryCategory = (course: Course): string => {
    if (Array.isArray(course.category) && course.category.length > 0) {
        return course.category[0] ?? "";
    }
    return "";
};

const resolveStatusLabel = (course: Course): string => {
    if (course.price) return course.price;
    if (course.badge) return course.badge;
    if (course.network) return course.network;
    return t("Free");
};

const buildCourses = (course: Course) => {
    const highlights: Array<{ value: string; label: string }> = [];

    const duration = course.duration ?? course.clock;
    if (duration) {
        highlights.push({ value: duration, label: t("Duration") });
    }

    if (course.credit) {
        highlights.push({ value: course.credit, label: t("Lessons") });
    }

    if (course.beginer || course.level) {
        const value = course.beginer ?? course.level ?? "";
        if (value) {
            highlights.push({ value, label: t("Level") });
        }
    }

    const primaryCategory = getPrimaryCategory(course);
    if (primaryCategory) {
        highlights.push({ value: primaryCategory, label: t("Category") });
    }

    return highlights.slice(0, 4);
};
</script>

<template>
    <section :dir="direction" class="md:mx-10 lg:mx-12 lg:py-24">
        <div class="mx-4 py-16 overflow-hidden rounded-[2.5rem] bg-[#E5EAE8] px-6 sm:rounded-[3rem] sm:px-10 lg:px-16">
            <div class="mx-auto text-center">


                <span
                    class="mx-auto rounded-full w-fit bg-[#F0F0F0] px-6 py-2 text-sm font-semibold text-black flex align-middle gap-1">
                    <img src="/img/star.png" width="20px" height="20px" alt="Group 1000004170" />
                    <p>{{ $t("Courses") }}</p>
                </span>


                <h2 class="mt-7 text-3xl font-extrabold leading-tight text-[#1f2937] md:text-[2.5rem]">
                    {{ $t("ourCourses") }}
                </h2>
            </div>

            <div class="mt-10">
                <div class="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
                    <button v-for="category in filterCategories" :key="category.key"
                        class="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 transition-all duration-200"
                        :class="selectedCategory === category.key
                            ? 'bg-primary'
                            : 'bg-white'" @click="setCategory(category.key)">
                        {{ $t(category.translationKey) }}

                        <span :class="selectedCategory === category.key ? 'text-white' : 'text-secondary'">
                            [{{ getCategoryCount(category.key) }}]
                        </span>
                    </button>
                </div>
            </div>

            <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-[1600px]">
                <TransitionGroup name="fade">
                    <div v-for="item in visibleCourses" :key="item.id"
                        class="group flex h-full flex-col rounded-b-3xl overflow-hidden transition-all duration-300">

                        <div class="relative">

                            <div
                                class="image-container w-full h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden bg-[#dfe8e2]">


                                <div class="overlay"></div>


                                <img :src="item.courseImage" alt="Course Image" class="w-full h-full object-cover" />
                            </div>


                            <!-- Badge -->
                            <div
                                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <span
                                    class="inline-flex bg-primary text-gray-50 items-center justify-center rounded-full px-3 py-1 text-sm font-semibold">
                                    {{ resolveStatusLabel(item) }}
                                </span>
                                <div
                                    class="flex items-center gap-2 bg-gray-200 backdrop-blur-sm rounded-full px-3 py-2">

                                    <span
                                        class="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-green-500 to-emerald-600 text-xs font-bold text-white">
                                        {{ getInstructorInitial(item.instructor) }}
                                    </span>


                                    <span class="text-sm font-medium text-[#1f2937] truncate">
                                        {{ item.instructor?.split(" ").slice(0, 2).join(" ") ?? "Admin" }}
                                    </span>

                                </div>
                            </div>
                        </div>

                        <!-- Content Section -->
                        <div class="flex-1 p-5 pb-8 pt-0 flex flex-col bg-white">


                            <div v-if="buildCourses(item).length" class="bg-[#EEF6F4] grid grid-cols-4 text-center
         divide-x divide-[#D1D5DB] items-center">
                                <div v-for="(stat, index) in buildCourses(item)" :key="index"
                                    class="p-3 flex flex-col justify-center h-[50%]">
                                    <span class="text-sm font-semibold text-[#1f2937]">
                                        {{ stat.value }}
                                    </span>

                                    <span class="mt-1 block text-sm font-semibold text-[#1f2937]">
                                        {{ stat.label }}
                                    </span>
                                </div>


                            </div>

                            <div class="px-4 flex flex-col flex-1">
                                <!-- Title -->
                                <NuxtLink :to="`/course-details/${item.id}`"
                                    class="text-lg text-center font-bold leading-tight text-[#1f2937] transition-colors duration-200 hover:text-primary line-clamp-2 mt-6">
                                    {{ item.title }}
                                </NuxtLink>

                                <div class="mt-auto pt-4">
                                    <NuxtLink :to="`/course-details/${item.id}`"
                                        class="w-full inline-flex items-center justify-center bg-secondary px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-sm">
                                        {{ item.viewBtn || "Study Now" }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
            </div>


            <div v-if="hasMoreCourses" class="mt-12 flex justify-center">
                <button
                    class="rounded-2xl bg-secondary px-6 py-3 font-semibold text-white transition duration-200 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                    @click="toggleCourses">
                    {{ showAllCourses ? $t("ShowLess") : $t("SeeMore") }}
                </button>
            </div>
        </div>
    </section>
</template>



<style scoped>
.image-container {
    position: relative;
    isolation: isolate;
}

.image-container::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    right: 0;
    height: 171px;
    z-index: 1;
    background: url(../../../public/img/gumbad.png) no-repeat;
    background-size: cover;
    background-position: center center;
}

.image-container::after {
    position: absolute;
    content: '';

    top: -40%;
    left: -60%;

    width: 80%;
    height: 200%;

    background: linear-gradient(to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255) 50%,
            rgba(255, 255, 255, 0) 100%);


    transform: translateX(0) rotate(24deg);
    opacity: 0;

    pointer-events: none;
    box-shadow: 0 24px 48px -28px rgba(17, 24, 39, 0.45);
}

.group:hover .image-container::after {
    animation: diagonalSweep 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    opacity: 1;
}

@keyframes diagonalSweep {
    0% {
        transform: translateX(0%) rotate(24deg);
        opacity: 1;
    }

    100% {
        transform: translateX(180%) rotate(24deg);
        opacity: 0;
    }
}
</style>
