<script setup lang="ts">
import { computed } from 'vue'

const { locale } = useI18n()  // Same global state!
const direction = computed(() => locale.value === "en" ? "ltr" : "rtl")
// Types
interface Feature {
    featureTitle: string
    featureIcon: string,
    featureImg: string
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
        featureTitle: $t("Learnwithskills"),
        featureIcon: 'flaticon-online-course',
        featureImg: '/img/fact/online-learning.png',
    },
    {
        featureTitle: $t('EarncertificatesAnddegrees'),
        featureIcon: 'flaticon-certificate',
        featureImg: "/img/fact/online-certificate.png"
    },
    {
        featureTitle: $t('LearnfromAnywhereAnytime'),
        featureIcon: 'flaticon-laptop',
        featureImg: "/img/fact/browsing.png"
    }
])

// Computed
const sectionClass = computed(() => {
    return props.spaceMinus || 'py-6 pb-4'
})

const backgroundStyle = computed(() => ({
    backgroundImage: `url(${featureBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}))
//:style="backgroundStyle" 
</script>

<template>
    <div :dir="direction" :class="sectionClass" :style="{ backgroundImage: `url(${featureBg})` }" class="">
        <div class="block w-full justify-between gap-2 px-5 max-md:px-8 sm:px-16 md:flex">
            <div v-for="value in featureList" class="flex gap-2 items-center">
                <img :src="value.featureImg" style="color:white" class=" w-20 max-lg:w-16" alt="img" />
                <h3 class="text-lg sm:text-xl font-semibold text-white leading-tight"> {{ value.featureTitle }}</h3>
            </div>
        </div>
    </div>
</template>