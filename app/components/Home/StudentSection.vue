<script setup lang="ts">
// Props
interface Props {
    studentSpace?: string
}

const props = withDefaults(defineProps<Props>(), {
    studentSpace: ''
})

// Computed class for section
const sectionClass = computed(() => {
    return props.studentSpace || 'py-20 lg:py-28'
})
</script>

<template>
    <div :class="sectionClass">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                <!-- Left Side - Image Section -->
                <div class="flex-1 lg:w-5/12">
                    <div class="relative">
                        <!-- Decorative Shapes -->
                        <div class="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>

                        <div class="absolute top-8 -right-6 z-10">
                            <img src="/img/shape/student-shape-03.png" alt="Decorative shape"
                                class="w-12 h-12 opacity-70">
                        </div>

                        <div class="absolute -bottom-4 -left-8 z-10">
                            <img src="/img/shape/student-shape-04.png" alt="Decorative shape"
                                class="w-16 h-16 opacity-60">
                        </div>

                        <div class="absolute top-1/4 -left-12 z-10">
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
                            <img src="/img/home _why students choose us_.png" alt="Why students choose us"
                                class="w-full h-auto object-cover">
                        </div>
                    </div>
                </div>

                <!-- Center Spacing with Decorative Element -->
                <div class="hidden lg:flex lg:w-2/12 justify-center">
                    <div class="relative">
                        <div class="w-1 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                        <div
                            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full">
                        </div>
                    </div>
                </div>

                <!-- Right Side - Content Section -->
                <div class="flex-1 lg:w-5/12">
                    <div class="space-y-6">
                        <!-- Title -->
                        <div class="mb-8">
                            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Why
                                <span class="relative inline-block mx-2">
                                    Students
                                    <span class="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded"></span>
                                </span>
                                Gain Knowledge
                            </h2>
                        </div>

                        <!-- Content Description -->
                        <div class="mb-6">
                            <p class="text-lg text-gray-700 font-medium">
                                - What makes us different:
                            </p>
                        </div>

                        <!-- Feature List -->
                        <div class="mb-8">
                            <ul class="space-y-4">
                                <li class="flex items-start space-x-3">
                                    <div class="flex-shrink-0 mt-1">
                                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                                    </div>
                                    <span class="text-gray-700 text-lg leading-relaxed">
                                        Personalized learning experience tailored to each student
                                    </span>
                                </li>

                                <li class="flex items-start space-x-3">
                                    <div class="flex-shrink-0 mt-1">
                                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                                    </div>
                                    <span class="text-gray-700 text-lg leading-relaxed">
                                        Expert instructors with years of teaching experience
                                    </span>
                                </li>

                                <li class="flex items-start space-x-3">
                                    <div class="flex-shrink-0 mt-1">
                                        <i class="fas fa-check-circle text-green-500 text-xl"></i>
                                    </div>
                                    <span class="text-gray-700 text-lg leading-relaxed">
                                        Interactive and engaging learning methodology
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <!-- Call to Action Button -->
                        <div class="pt-4">
                            <NuxtLink to="/about"
                                class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Know More
                                <i class="fas fa-arrow-right ml-2"></i>
                            </NuxtLink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>