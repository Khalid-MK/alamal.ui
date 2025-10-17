<template>
    <div :dir="direction" class="about-section">
        <!-- Background vectors -->
        <div class="slider-six_vector-1"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/vector-8.png')">
        </div>
        <div class="slider-six_vector-2" style="background-image:url('img/icon/تخطيط_اسم_محمد.png')"></div>

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 container-wrapper">
            <!-- Left Content -->
            <div class="content-side">
                <div class="tabs-section">
                    <div class="header-section">
                        <span class="subtitle">{{ $t("AboutUs") }}</span>
                        <h2 class="main-title">
                            {{ $t("WeProvideBest") }}
                            <span class="edu-span">{{ $t("Education") }}</span>
                            <span class="serv-icon">
                                {{ $t("Services") }}
                                <span class="shape-line"><i class="icon-19"></i></span>
                            </span>
                            {{ $t("ForYou") }}
                        </h2>
                    </div>

                    <!-- Tabs -->
                    <v-tabs v-model="tab" align-tabs="start" class="custom-tabs">
                        <v-tab v-for="tabItem in tabsData" :key="tabItem.value" :value="tabItem.value">
                            {{ $t(`tabs.${tabItem.value}.title`) }}
                        </v-tab>
                    </v-tabs>

                    <!-- Tab Content -->
                    <v-window v-model="tab" class="tabs-content">
                        <v-window-item v-for="tabItem in tabsData" :key="tabItem.value" :value="tabItem.value">
                            <div class="content-wrapper">
                                <p class="description">{{ $t(`tabs.${tabItem.value}.description`) }}</p>

                                <div class="features-list">
                                    <div v-for="(feature, index) in tabItem.features" :key="index" class="feature-item">
                                        <span class="feature-text">{{ $t(feature) }}</span>
                                    </div>
                                </div>
                            </div>
                        </v-window-item>
                    </v-window>
                </div>
            </div>

            <!-- Right Images -->
            <div class="image-side">
                <div class="images-container">
                    <div class="primary-image">
                        <img loading="lazy" src="/img/about/about-1.webp" alt="About Education" />
                    </div>
                    <div class="secondary-image">
                        <img loading="lazy" src="/img/about/about-3.png" alt="About Education" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics -->
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 statistics-section">
            <div class="statistic-div" v-for="statistic in animatedStats" :key="statistic.id">
                <div :style="{ color: statistic.color }" class="value-Stat">
                    {{ statistic.displayValue }}
                </div>
                <div class="title-Stat">{{ $t(statistic.titleKey) }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale, localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);
const tab = ref("vision");

// --- Statistics Data ---
interface StatisticsData {
    id: number;
    value: number;
    suffix?: string;
    titleKey: string;
    color: string;
}

const statisticsData: StatisticsData[] = [
    { id: 1, titleKey: "statistics.studentEnrolled", value: 29300, color: "#1AB69D", suffix: "k" },
    { id: 2, titleKey: "statistics.classCompleted", value: 32400, color: "#EE4A62", suffix: "k" },
    { id: 3, titleKey: "statistics.satisfactionRate", value: 100, color: "#8E56FF", suffix: "%" },
    { id: 4, titleKey: "statistics.topInstructors", value: 354, color: "#F8941F", suffix: "+" }
];

// --- Animated Values ---
const animatedStats = ref(
    statisticsData.map((s) => ({
        ...s,
        displayValue: 0 as number | string
    }))
);

onMounted(() => {
    animatedStats.value.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 1500; // ms
        const stepTime = 20;
        const increment = end / (duration / stepTime);

        const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(interval);
            }
            const formatted =
                stat.suffix === "k"
                    ? (start / 1000).toFixed(1) + "k"
                    : Math.floor(start) + (stat.suffix || "");
            if (animatedStats.value[index]) {
                animatedStats.value[index].displayValue = formatted;
            }
        }, stepTime);
    });
});

// --- Tabs ---
interface TabData {
    value: string;
    features: string[];
}
const tabsData: TabData[] = [
    { value: "about", features: ["tabs.about.feature1", "tabs.about.feature2"] },
    { value: "mission", features: ["tabs.mission.feature1", "tabs.mission.feature2"] },
    { value: "vision", features: ["tabs.vision.feature1", "tabs.vision.feature2"] }
];
</script>


<style lang="scss" scoped>
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes moveUpDown {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

.slider-six_vector-1 {
    position: absolute;
    right: 10;
    width: 106px;
    height: 106px;
    /* z-index: 1; */
    background-repeat: no-repeat;
    background-size: contain;
    animation: spin 30s linear infinite;

    [dir="ltr"] & {
        right: 3%;
        bottom: -10%;
    }

    [dir="rtl"] & {
        left: 3%;
        bottom: -10%;
    }

    @media (max-width: 1023px) {
        width: 90px;
        height: 90px;
    }

    @media (max-width: 767px) {
        width: 60px;
        height: 60px;
    }
}

.slider-six_vector-2 {
    color: #1a1a1a;
    position: absolute;
    opacity: 0.55;
    z-index: 1;
    left: 55%;
    top: 10%;
    overflow: hidden;
    width: 96px;
    height: 96px;
    background-repeat: no-repeat;
    background-size: contain;
    animation: moveUpDown 4s infinite;

    [dir="ltr"] & {
        transform: translate(100%, -40%);
        right: 2%;
    }

    [dir="rtl"] & {
        left: 2%;
        transform: translate(50%, 40%);
    }

    @media (max-width: 1023px) {
        left: auto;
        right: 80px;
        top: 80px;
        width: 80px;
        height: 80px;
    }

    @media (max-width: 767px) {
        right: 30px;
        top: 50px;
        width: 60px;
        height: 60px;
    }
}

.statistics-section {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    justify-content: space-evenly;
    align-items: center;

    .statistic-div {
        width: 250px;
        height: 150px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;

        .value-Stat {
            font-size: 2rem;
            font-weight: 700;
        }
    }
}

.about-section {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 60px 0;

    @media (max-width: 1023px) {
        padding: 40px 0;
    }

    @media (max-width: 767px) {
        padding: 30px 0;
    }

    @media (max-width: 321px) {
        margin: 50px 0;

    }
}

.container-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;

    @media (max-width: 1279px) {
        gap: 40px;
    }

    @media (max-width: 1023px) {
        flex-direction: column;
        gap: 40px;
    }

    @media (max-width: 767px) {
        gap: 30px;
    }
}

.content-side {
    flex: 1;
    min-width: 0;
    max-width: 46%;

    @media (max-width: 1023px) {
        max-width: 100%;
    }
}

.image-side {
    flex: 0 0 auto;
    width: 450px;

    @media (max-width: 1279px) {
        width: 400px;
    }

    @media (max-width: 1023px) {
        width: 100%;
        max-width: 450px;
    }

    @media (max-width: 767px) {
        max-width: 350px;
    }

    @media (max-width: 639px) {
        max-width: 100%;
    }
}

.images-container {
    position: relative;
    width: 100%;
    padding-bottom: 50px;

    @media (max-width: 767px) {
        padding-bottom: 0;
    }
}




img {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 90%;
    border-radius: 12px;
    overflow: hidden;
    height: auto;
    display: block;
    object-fit: cover;

    @media (max-width: 767px) {
        border-radius: 8px;
        margin: 0 auto;
    }

}

.primary-image {
    position: relative;
    width: 90%;
    z-index: 1;
}

.secondary-image {
    position: relative;
    width: 50%;
    bottom: 0;
    z-index: 2;

    [dir="ltr"] & {
        right: 0;
        transform: translate(100%, -40%);
    }

    [dir="rtl"] & {
        left: 0;
        transform: translate(-100%, -40%);
    }


    @media (max-width: 1279px) {
        width: 65%;

        [dir="ltr"] & {
            transform: translate(60%, -40%);
        }

        [dir="rtl"] & {
            transform: translate(-60%, -40%);
        }

    }

    @media (max-width: 1025px) {
        width: 60%;

        [dir="ltr"] & {

            transform: translate(80%, -40%);
        }

        [dir="rtl"] & {

            transform: translate(-80%, -40%);
        }

    }

    @media (max-width: 767px) {
        display: none;
    }
}

.tabs-section {
    width: 100%;
}

.header-section {
    margin-bottom: 30px;

    @media (max-width: 767px) {
        margin-bottom: 20px;
    }
}

.subtitle {
    display: inline-block;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    color: #9ca3af;
    letter-spacing: 1px;
    margin-bottom: 12px;

    @media (max-width: 767px) {
        font-size: 12px;
        margin-bottom: 8px;
    }
}

.main-title {
    font-size: 42px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.3;
    margin: 0;

    >span.edu-span {
        color: var(--color-primary);

    }

    >span.serv-icon {
        position: relative;

        .shape-line {
            position: absolute;
            font-size: 14px;
            color: var(--color-primary);
            /* display: block; */
            right: 21px;
            top: 44px;
            /* margin-bottom: 14px; */

            /* i {
            font-family: 'icomoon' !important;
            speak: never;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            
        } */
        }
    }

    @media (max-width: 1279px) {
        font-size: 36px;
    }

    @media (max-width: 1023px) {
        font-size: 32px;
    }

    @media (max-width: 767px) {
        font-size: 28px;
    }

    @media (max-width: 479px) {
        font-size: 24px;
    }
}

.custom-tabs {
    margin-bottom: 30px;
    margin-top: 30px;
    color: var(--color-primary) !important;

    @media (max-width: 767px) {
        margin-bottom: 20px;
        margin-top: 20px;
    }

    :deep(.v-tab) {
        font-size: 18px;
        font-weight: 500;
        text-transform: none;
        letter-spacing: 0;
        color: #666;
        padding: 0 24px;
        min-width: auto;
        min-height: 48px;

        @media (max-width: 1023px) {
            font-size: 16px;
            padding: 0 16px;
        }

        @media (max-width: 767px) {
            font-size: 14px;
            padding: 0 10px;
            min-height: 42px;
        }

        @media (max-width: 479px) {
            font-size: 13px;
            padding: 0 8px;
        }

        &.v-tab--selected {
            color: #333;
            font-weight: 600;
        }
    }

    :deep(.v-tabs-slider) {
        height: 3px;
        border-radius: 3px;
    }

    //overwrite the color

    .v-slide-group__container {
        .v-slide-group__content {
            button.v-btn {

                color: var(--color-secondary) !important;
            }

            /* 
            &.v-tab-item--selecte {

            } */
        }
    }
}

/* 
custom-tabs {
    margin-bottom: 30px;
    margin-top: 30px;

    @media (max-width: 767px) {
        margin-bottom: 20px;
        margin-top: 20px;
    }

    :deep(.v-tab) {
        font-size: 18px;
        font-weight: 500;
        text-transform: none;
        letter-spacing: 0;
        color: #666;
        padding: 0 24px;
        min-width: auto;
        min-height: 48px;
        position: relative;
        transition: all 0.3s ease;

        @media (max-width: 1023px) {
            font-size: 16px;
            padding: 0 16px;
        }

        @media (max-width: 767px) {
            font-size: 14px;
            padding: 0 10px;
            min-height: 42px;
        }

        @media (max-width: 479px) {
            font-size: 13px;
            padding: 0 8px;
        }

        // Hover state for INACTIVE tabs
        &:not(.v-tab--selected):hover {
            color: #999;
            background-color: black;
            border-radius: 8px 8px 0 0;
        }

        // Active tab styling
        &.v-tab--selected {
            color: var(--color-primary);
            font-weight: 600;

            // Hover state for ACTIVE tab
            &:hover {
                color: var(--color-secondary, #555);
                background-color: rgba(var(--color-primary-rgb, 0, 0, 0), 0.05);
                border-radius: 8px 8px 0 0;
            }
        }
    }

    // Slider/Indicator styling
    :deep(.v-tabs-slider) {
        height: 3px;
        border-radius: 3px;
        background-color: var(--color-primary, #1ab69d);
    }

    // Alternative: If you want to style the indicator differently
    :deep(.v-slide-group__content) {
        .v-tab__slider {
            height: 3px;
            border-radius: 3px;
            background-color: var(--color-primary, #1ab69d);
        }
    }
} */

.tabs-content {
    padding: 20px 0;

    @media (max-width: 767px) {
        padding: 15px 0;
    }
}

.content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media (max-width: 767px) {
        gap: 20px;
    }
}

.description {
    font-size: 16px;
    line-height: 1.8;
    color: #666;
    margin: 0;

    @media (max-width: 1023px) {
        font-size: 15px;
    }

    @media (max-width: 767px) {
        font-size: 14px;
        line-height: 1.7;
    }
}

.features-list {
    display: flex;
    flex-direction: column;
    gap: 16px;


    @media (max-width: 767px) {
        gap: 12px;
    }
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 767px) {
        gap: 10px;
    }

    .v-icon {
        flex-shrink: 0;
        color: var(--color-secondary);

        @media (max-width: 767px) {
            font-size: 20px !important;
        }
    }
}

.feature-text {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    display: inline-flex;
    /* ensures proper spacing handling */
    align-items: center;
    /* vertically centers icon and text */

    @media (max-width: 1023px) {
        font-size: 16px;
    }

    @media (max-width: 767px) {
        font-size: 15px;
    }

    &:before {
        content: "\e913";
        font-family: 'icomoon';
        color: var(--color-secondary);
        font-size: 19px;
        margin-right: 6px;
    }
}
</style>