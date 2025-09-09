<script setup lang="ts">
import { computed } from 'vue'

// Types
interface Feature {
    featureTitle: string
    featureIcon: string
}

// Props
interface Props {
    spaceMinus?: string
}

const props = withDefaults(defineProps<Props>(), {
    spaceMinus: ''
})

// Data
const featureBg = ref('/img/fact/fact.png')

const featureList = ref<Feature[]>([
    {
        featureTitle: "Learn with Skills",
        featureIcon: 'flaticon-online-course',
    },
    {
        featureTitle: 'Earn Certificates and Degrees',
        featureIcon: 'flaticon-certificate',
    },
    {
        featureTitle: 'Learn from Anywhere, Anytime',
        featureIcon: 'flaticon-laptop',
    }
])

// Computed
const sectionClass = computed(() => {
    return props.spaceMinus || 'py-12 pb-4'
})

const backgroundStyle = computed(() => ({
    backgroundImage: `url(${featureBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}))
</script>

<template>
    <div :class="sectionClass" :style="backgroundStyle" class="relative bg-gray-50">
        <!-- Optional overlay for better text readability -->
        <div class="absolute inset-0 bg-white/80"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">

                <!-- Feature 1 -->
                <div class="flex-1">
                    <div
                        class="flex items-center gap-5 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex-shrink-0">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="flaticon-online-course text-2xl text-blue-600"></i>
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                                {{ featureList[0]?.featureTitle }}
                            </h3>
                        </div>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div class="flex-1">
                    <div
                        class="flex items-center gap-5 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex-shrink-0">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="flaticon-certificate text-2xl text-green-600"></i>
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                                {{ featureList[1]?.featureTitle }}
                            </h3>
                        </div>
                    </div>
                </div>

                <!-- Feature 3 -->
                <div class="flex-1">
                    <div
                        class="flex items-center gap-5 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex-shrink-0">
                            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                <i class="flaticon-laptop text-2xl text-purple-600"></i>
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                                {{ featureList[2]?.featureTitle }}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>