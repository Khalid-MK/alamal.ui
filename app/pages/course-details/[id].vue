<template>
    <div class="course-details-page" :dir="direction">
        <section class="bg-slate-50 border-b border-slate-200">
            <div class="max-w-6xl mx-auto px-4 py-10 md:py-14">
                <nav class="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <NuxtLink to="/" class="transition hover:text-primary">
                        {{ $t("Home") }}
                    </NuxtLink>
                    <span class="text-slate-400">/</span>
                    <NuxtLink to="/courses" class="transition hover:text-primary">
                        {{ $t("Courses") }}
                    </NuxtLink>
                    <span class="text-slate-400">/</span>
                    <span class="text-slate-700 font-semibold">{{ course?.title }}</span>
                </nav>

                <div class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div class="max-w-3xl space-y-4">
                        <h1 class="text-3xl font-bold text-slate-900 md:text-4xl">
                            {{ course?.title }}
                        </h1>
                        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <div v-if="course?.instructor" class="flex items-center gap-2">
                                <i class="fa-regular fa-circle-user text-primary"></i>
                                <span>
                                    <span class="text-slate-500">{{ $t("Instructor") }}:</span>
                                    {{ course.instructor }}
                                </span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-regular fa-language text-primary"></i>
                                <span>
                                    <span class="text-slate-500">{{ $t("Language") }}:</span>
                                    {{ displayLanguage }}
                                </span>
                            </div>
                            <div v-if="course?.productRating?.length" class="flex items-center gap-1 text-yellow-500">
                                <i v-for="(icon, index) in course.productRating" :key="`${icon}-${index}`"
                                    :class="icon"></i>
                                <span class="ml-2 text-slate-600">({{ ratingCount }})</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <img v-if="course?.courseImage" :src="course.courseImage" :alt="course.title"
                        class="h-64 w-full object-cover sm:h-80 lg:h-[420px]" />
                    <div v-else class="flex h-64 w-full items-center justify-center bg-slate-100 sm:h-80 lg:h-[420px]">
                        <span class="text-slate-400">{{ $t("CourseDetails") }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-12 md:py-16">
            <div class="max-w-6xl mx-auto px-4">
                <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
                    <div>
                        <div class="flex flex-wrap gap-3 border-b border-slate-200">
                            <button v-for="tab in tabItems" :key="tab.key" type="button"
                                class="rounded-t-md px-4 py-2 text-sm font-medium transition" :class="activeTab === tab.key
                                        ? 'bg-white text-primary shadow-sm border border-slate-200 border-b-white'
                                        : 'text-slate-500 hover:text-primary'
                                    " @click="activeTab = tab.key">
                                {{ $t(tab.labelKey) }}
                            </button>
                        </div>

                        <div class="space-y-10 pt-8">
                            <div v-if="activeTab === 'overview'" class="space-y-8">
                                <section class="space-y-4">
                                    <h2 class="text-2xl font-semibold text-slate-900">
                                        {{ $t("CourseDescription") }}
                                    </h2>
                                    <p v-if="course?.description" class="leading-relaxed text-slate-600">
                                        {{ course.description }}
                                    </p>
                                    <p v-else class="leading-relaxed text-slate-500">
                                        {{ $t("NotAvailable") }}
                                    </p>
                                </section>

                                <section v-if="course?.infoList?.length" class="space-y-4">
                                    <h3 class="text-2xl font-semibold text-slate-900">
                                        {{ $t("WhatYouWillLearn") }}
                                    </h3>
                                    <ul class="space-y-3">
                                        <li v-for="(item, index) in course.infoList" :key="index"
                                            class="flex items-start gap-3 text-slate-600">
                                            <i class="fa-solid fa-check mt-1 text-emerald-500"></i>
                                            <span>{{ item.infoListTitle }}</span>
                                        </li>
                                    </ul>
                                </section>

                                <section v-if="course?.requirements" class="space-y-4">
                                    <h3 class="text-2xl font-semibold text-slate-900">
                                        {{ $t("Requirements") }}
                                    </h3>
                                    <p class="leading-relaxed text-slate-600">
                                        {{ course.requirements }}
                                    </p>
                                </section>
                            </div>

                            <div v-else-if="activeTab === 'curriculum'" class="space-y-6">
                                <div v-for="(section, index) in course?.curriculums" :key="`${section.title}-${index}`"
                                    class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div class="flex items-start justify-between gap-4">
                                        <h3 class="text-lg font-semibold text-slate-900">
                                            {{ section.title }}
                                        </h3>
                                        <span class="text-sm text-slate-500">
                                            {{ section.lessons?.length ?? 0 }} {{ $t("Lessons") }}
                                        </span>
                                    </div>
                                    <ul class="mt-3 space-y-2 text-slate-600">
                                        <li v-for="(lesson, lessonIndex) in section.lessons"
                                            :key="`${lessonIndex}-${lesson}`" class="flex gap-3">
                                            <span class="font-semibold text-primary">{{ lessonIndex + 1 }}.</span>
                                            <span>{{ lesson }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <p v-if="!course?.curriculums?.length" class="text-slate-500">
                                    {{ $t("NotAvailable") }}
                                </p>
                            </div>

                            <div v-else-if="activeTab === 'instructor'" class="space-y-6">
                                <div class="flex flex-col items-start gap-6 sm:flex-row">
                                    <img v-if="course?.instructorImage" :src="course.instructorImage"
                                        :alt="course.instructor"
                                        class="h-32 w-32 rounded-2xl border border-slate-200 object-cover" />
                                    <div class="space-y-3">
                                        <h3 class="text-2xl font-semibold text-slate-900">
                                            {{ course?.instructor || $t("NotAvailable") }}
                                        </h3>
                                        <p class="leading-relaxed text-slate-600">
                                            {{ course?.instructorBio || defaultInstructorBio }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div v-else-if="activeTab === 'reviews'" class="space-y-4">
                                <p class="leading-relaxed text-slate-600">
                                    {{ $t("ReviewsPlaceholder") }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <aside class="lg:sticky lg:top-24">
                        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div class="relative flex aspect-video items-center justify-center bg-slate-100">
                                <button type="button"
                                    class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white">
                                    <i class="fa-solid fa-play text-xl"></i>
                                </button>
                            </div>

                            <div class="space-y-6 p-6">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-slate-500">{{ $t("Price") }}</span>
                                    <span class="text-2xl font-bold text-primary">{{ course?.price || '—' }}</span>
                                </div>

                                <div>
                                    <h3 class="text-lg font-semibold text-slate-900">
                                        {{ $t("CourseIncludes") }}
                                    </h3>
                                    <ul class="mt-4 space-y-3">
                                        <li v-for="fact in courseFacts" :key="fact.key"
                                            class="flex items-center justify-between text-sm text-slate-600">
                                            <span class="font-medium text-slate-500">{{ fact.label }}</span>
                                            <span class="text-slate-900">{{ fact.value }}</span>
                                        </li>
                                    </ul>
                                </div>

                                <NuxtLink to="/auth/sign-up"
                                    class="block rounded-lg bg-primary px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-primary-hover">
                                    {{ $t("StartNow") }}
                                </NuxtLink>
                            </div>

                            <div class="border-t border-slate-200 px-6 py-4">
                                <span class="text-sm font-semibold text-slate-900">{{ $t("ShareOn") }}</span>
                                <div class="mt-3 flex items-center gap-3">
                                    <a v-for="item in shareLinks" :key="item.icon" :href="item.href" target="_blank"
                                        rel="noopener"
                                        class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-primary hover:text-white">
                                        <i :class="item.icon"></i>
                                        <span class="sr-only">{{ item.label }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { createError } from "h3";
import enData from "@/constant/data(en).json";
import arData from "@/constant/data(ar).json";
import ruData from "@/constant/data(ru).json";

type Course = Record<string, any>;

const datasets: Record<string, { courses: Course[] }> = {
    en: enData,
    ar: arData,
    ru: ruData,
};

const route = useRoute();
const { locale, localeProperties, t } = useI18n();
const requestUrl = useRequestURL();

const direction = computed(() => localeProperties.value?.dir ?? "ltr");
const courseId = computed(() => String(route.params.id ?? ""));

const coursesForLocale = computed(() => {
    const currentLocale = locale.value as keyof typeof datasets;
    return (datasets[currentLocale] ?? datasets.en).courses;
});

const course = computed(() =>
    coursesForLocale.value.find((item) => String(item.id) === courseId.value)
);

if (!course.value) {
    throw createError({
        statusCode: 404,
        statusMessage: t("CourseDetails"),
    });
}

useHead(() => ({
    title: course.value?.title ?? t("CourseDetails"),
}));

const tabItems = [
    { key: "overview", labelKey: "Overview" },
    { key: "curriculum", labelKey: "Curriculum" },
    { key: "instructor", labelKey: "Instructor" },
    { key: "reviews", labelKey: "Reviews" },
] as const;

type TabKey = (typeof tabItems)[number]["key"];

const activeTab = ref<TabKey>("overview");

const ratingCount = computed(() => {
    const rawRating = course.value?.rating ?? "";
    const numeric = rawRating.replace(/[^0-9]/g, "");
    return numeric || "0";
});

const lessonsCount = computed(() => {
    if (!course.value?.curriculums?.length) {
        return 0;
    }

    return course.value.curriculums.reduce((count: number, section: any) => {
        return count + (section.lessons?.length ?? 0);
    }, 0);
});

const courseFacts = computed(() => {
    const facts = [
        { key: "price", label: t("Price"), value: course.value?.price ?? t("NotAvailable") },
        { key: "instructor", label: t("Instructor"), value: course.value?.instructor ?? t("NotAvailable") },
        { key: "duration", label: t("Duration"), value: course.value?.duration ?? t("NotAvailable") },
        {
            key: "lessons",
            label: t("Lessons"),
            value: lessonsCount.value ? String(lessonsCount.value) : t("NotAvailable"),
        },
        {
            key: "level",
            label: t("Level"),
            value: course.value?.beginer ?? t("NotAvailable"),
        },
        {
            key: "certificate",
            label: t("Certificate"),
            value: course.value?.certificate ?? t("NotAvailable"),
        },
    ];

    return facts.filter((item) => item.label && item.value);
});

const shareUrl = computed(() => encodeURIComponent(requestUrl.href));

const shareLinks = computed(() => [
    {
        icon: "fa-brands fa-facebook-f",
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl.value}`,
    },
    {
        icon: "fa-brands fa-x-twitter",
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${shareUrl.value}`,
    },
    {
        icon: "fa-brands fa-linkedin-in",
        label: "LinkedIn",
        href: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl.value}`,
    },
    {
        icon: "fa-brands fa-whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/?text=${shareUrl.value}`,
    },
]);

const defaultInstructorBio = computed(() => t("InstructorBioPlaceholder"));

const displayLanguage = computed(() => {
    const map: Record<string, string> = {
        en: "English",
        ar: "العربية",
        ru: "Русский",
    };

    return map[locale.value] ?? "English";
});
</script>

<style scoped>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
</style>
