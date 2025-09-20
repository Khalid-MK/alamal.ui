<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { computed, ref } from "vue"
import data from "@/constant/highlights.json"
// Props
interface Props {
    studentSpace?: string
}
const props = withDefaults(defineProps<Props>(), {
    studentSpace: ''
})

// Get locale
const { locale, localeProperties } = useI18n()

// Direction
const direction = computed(() => localeProperties.value.dir)
const currentLocale = computed(() => locale.value)
// English highlights

// Use correct array based on locale
const highlights = data.highlights.map((item: any) => ({ highlight: item[currentLocale.value], id: item.id }))
const Description = data.description[currentLocale.value]
// Section class
const sectionClass = computed(() => props.studentSpace || "py-20 lg:py-28")
</script>


<template>
    <div :class="sectionClass" :dir="direction">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:pl-14">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                <!-- Left Side - Image Section -->
                <div class="flex-1 lg:w-5/12">
                    <div class="relative">
                        <!-- Decorative Shapes -->
                        <div class="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>

                        <div class="absolute top-8 right-0 z-10">
                            <img src="/img/shape/student-shape-03.png" alt="Decorative shape"
                                class="w-12 h-12 opacity-70">
                        </div>

                        <div class="absolute -bottom-4  left-8 z-10">
                            <img src="/img/shape/student-shape-04.png" alt="Decorative shape"
                                class="w-16 h-16 opacity-60">
                        </div>

                        <div class="absolute top-1/4 left-12 z-10">
                            <img src="/img/shape/student-shape-05.png" alt="Decorative shape"
                                class="w-10 h-10 opacity-50">
                        </div>

                        <div class="absolute -top-8 right-1/4 z-10">
                            <img src="/img/shape/student-shape-06.png" alt="Decorative shape"
                                class="w-14 h-14 opacity-70">
                        </div>

                        <div class="absolute bottom-8 -right-4 z-10">
                            <img src="/img/shape/student-shape-07.png" alt="Decorative shape"
                                class="w-12 h-12 opacity-60">
                        </div>

                        <!-- Main Image -->
                        <div class="relative z-20 rounded-2xl overflow-hidden shadow-2xl">
                            <img src="/img/home _why students choose us_ تعديل2.png" alt="Why students choose us"
                                class="w-full h-auto object-cover">
                        </div>
                    </div>
                </div>

                <!-- Center Spacing with Decorative Element -->
                <div class="hidden lg:flex lg:w-2/12 justify-center">
                    <div class="relative">
                        <div class="w-1 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                        <div
                            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full">
                        </div>
                    </div>
                </div>

                <!-- Right Side - Content Section -->
                <div class="flex-1 lg:w-5/12">
                    <div class="space-y-6">
                        <!-- Title -->
                        <div class="mb-8">
                            <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                {{ locale === "en" ? "What is the most important thing that" : locale === "ru" ? `Что
                                является самой важной вещью, `: `ما هو
                                أهم شيء` }}
                                <span class="down-mark-line-2">
                                    {{ locale === "en" ? ` makes us unique` : locale === "ru" ? `которая делает нас
                                    уникальными ` : ` يجعلنا مميزين` }}
                                    <!-- <span class="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded"></span> -->
                                </span>
                                {{ locale === "en" ? " and why you choose us and join?" : locale === "ru" ? `и почему вы
                                выбираете нас и присоединяетесь?` : `ولماذا تختارنا وتنضم
                                إلينا؟` }}
                            </h2>
                        </div>

                        <!-- Content Description -->
                        <div class="mb-6">
                            <p class="text-sm text-gray-700 font-medium">
                                {{ `- ${Description}` }}
                            </p>
                        </div>

                        <!-- Feature List -->
                        <div class="mb-8">
                            <ul class="space-y-4">
                                <li v-for="value in highlights" :key="value.id"
                                    class="flex items-center gap-1 space-x-3">
                                    <div class="flex-shrink-0 mt-1">
                                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                                    </div>
                                    <span class="text-gray-700 text-sm leading-relaxed">
                                        {{ value.highlight }} </span>
                                </li>
                            </ul>
                        </div>

                        <!-- Call to Action Button -->
                        <div class="pt-4">
                            <NuxtLink to="/about"
                                class="inline-flex items-center px-8 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                {{ $t("knowMore") }}
                                <i class="fas fa-arrow-right ms-2"></i>
                            </NuxtLink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.down-mark-line-2 {
    position: relative;
    z-index: 2;
    display: inline-block;
}

.down-mark-line-2::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: -29%;
    width: 100%;
    z-index: -1;
    height: 100%;
    background: url(/img/icon/down-mark-line-2.png);
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