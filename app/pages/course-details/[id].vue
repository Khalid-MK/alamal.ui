<template>
    <div class="course-details-page" :dir="direction">
        <CourseDetailsBanner :course="course" :rating-count="ratingCount" :display-language="displayLanguage" />

        <section class="py-12 md:py-16">
            <div class="mx-auto max-w-6xl px-4">
                <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
                    <CourseDetailsTabs :course="course" />

                    <CourseDetailsSidebar :course="course" :course-facts="courseFacts" :share-links="shareLinks"
                        @open-video="isVideoDialogOpen = true" />
                </div>
            </div>
        </section>

        <CourseDetailsVideoDialog v-model:show="isVideoDialogOpen" :video-url="videoUrl" />
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
    const currentLocale = (locale.value as keyof typeof datasets) || "en";
    const defaultDataset = datasets.en;
    const dataset = datasets[currentLocale] ?? defaultDataset;
    return dataset!.courses;
});

const course = computed(() =>
    coursesForLocale.value.find((item) => String(item.id) === courseId.value) ?? null
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

const isVideoDialogOpen = ref(false);

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
        {
            key: "price",
            label: t("Price"),
            value: course.value?.price ?? t("NotAvailable"),
            icon: "fa-solid fa-tag",
        },
        {
            key: "instructor",
            label: t("Instructor"),
            value: course.value?.instructor ?? t("NotAvailable"),
            icon: "fa-solid fa-user",
        },
        {
            key: "duration",
            label: t("Duration"),
            value: course.value?.duration ?? t("NotAvailable"),
            icon: "fa-solid fa-clock",
        },
        {
            key: "lessons",
            label: t("Lessons"),
            value: lessonsCount.value ? String(lessonsCount.value) : t("NotAvailable"),
            icon: "fa-solid fa-book-open",
        },
        {
            key: "level",
            label: t("Level"),
            value: course.value?.beginer ?? t("NotAvailable"),
            icon: "fa-solid fa-signal",
        },
        {
            key: "certificate",
            label: t("Certificate"),
            value: course.value?.certificate ?? t("NotAvailable"),
            icon: "fa-solid fa-certificate",
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
        brandColor: "#1877F2",
    },
    {
        icon: "fa-brands fa-x-twitter",
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${shareUrl.value}`,
        brandColor: "#17191C",
    },
    {
        icon: "fa-brands fa-linkedin-in",
        label: "LinkedIn",
        href: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl.value}`,
        brandColor: "#0A66C2",
    },
    {
        icon: "fa-brands fa-whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/?text=${shareUrl.value}`,
        brandColor: "#25D366",
    },
]);

const displayLanguage = computed(() => {
    const map: Record<string, string> = {
        en: "English",
        ar: "العربية",
        ru: "Русский",
    };

    return map[locale.value] ?? "English";
});

const videoUrl = computed(() => {
    return course.value?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";
});
</script>
