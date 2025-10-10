<script setup lang="ts">
import { computed } from 'vue'

// Get locale
const { localeProperties } = useI18n()

// Direction
const direction = computed(() => localeProperties.value.dir)
// Types
interface Feature {
    featureTitle: string
    featureIcon: string,
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
    },
    {
        featureTitle: $t('EarncertificatesAnddegrees'),
        featureIcon: 'flaticon-certificate',
    },
    {
        featureTitle: $t('LearnfromAnywhereAnytime'),
        featureIcon: 'flaticon-laptop',
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
        <div class="block w-full justify-between gap-2  max-md:px-8  md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div v-for="value in featureList" class="flex gap-4 items-center">
                <div class="features-icon">
                    <i :class="value.featureIcon"></i>
                </div>
                <!-- <img :src="value.featureImg" style="color:white" class=" w-20 max-lg:w-16" alt="img" /> -->
                <h3 class="text-lg sm:text-xl font-semibold text-white leading-tight"> {{ value.featureTitle }}</h3>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.features-icon {
    font-size: 55px;
    color: white;
}
</style>