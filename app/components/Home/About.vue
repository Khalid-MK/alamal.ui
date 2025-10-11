<template>
    <div class="about-section">
        <div class="container-wrapper">
            <div class="content-side">
                <div class="tabs-section">
                    <div class="header-section">
                        <span class="subtitle">{{ $t("AboutUs") }}</span>
                        <h2 class="main-title">{{ $t("WeProvideBest") }}<span class="text-[#C5E96B]">{{ $t("Education")
                                }} </span>
                            {{ $t("ServicesForYou") }}</h2>
                    </div>

                    <v-tabs v-model="tab" color="#C5E96B" align-tabs="start" class="custom-tabs">
                        <v-tab v-for="tabItem in tabsData" :key="tabItem.value" :value="tabItem.value">
                            {{ tabItem.title }}
                        </v-tab>
                    </v-tabs>

                    <v-window v-model="tab" class="tabs-content">
                        <v-window-item v-for="tabItem in tabsData" :key="tabItem.value" :value="tabItem.value">
                            <div class="content-wrapper">
                                <p class="description">
                                    {{ tabItem.description }}
                                </p>

                                <div class="features-list">
                                    <div v-for="(feature, index) in tabItem.features" :key="index" class="feature-item">
                                        <v-icon color="#C5E96B" size="24">mdi-check</v-icon>
                                        <span class="feature-text">{{ feature }}</span>
                                    </div>
                                </div>
                            </div>
                        </v-window-item>
                    </v-window>
                </div>
            </div>

            <div class="image-side">
                <div class="images-container">
                    <div class="primary-image">
                        <img loading="lazy" src="/img/courses/tag/course-02.png" alt="About Education" />
                    </div>
                    <div class="secondary-image">
                        <img loading="lazy" src="/img/courses/tag/course-02.png" alt="About Education" />
                    </div>
                </div>
            </div>
        </div>
        <div class="statistics-section">
            <div class="statistic-div" v-for="statistic in statisticsData" :key="statistic.id">
                <div :style="{ color: statistic.color }" class="value-Stat">{{ statistic.value }}</div>
                <div class="title-Stat">{{ statistic.title }}</div>
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('vision');
interface StatisticsData {
    id: number,
    value: string,
    title: string,
    color: string
}
const statisticsData: StatisticsData[] = [
    { id: 1, title: "Student Enrolled", value: "29.3k", color: "#1AB69D" },
    { id: 2, title: "Class Completed", value: "32.4k", color: "#EE4A62" },
    { id: 3, title: "SatisfAction Rate", value: "100%", color: "#8E56FF" },
    { id: 4, title: "Top Indstructors", value: "354+", color: "#F8941F" }

]
interface TabData {
    value: string,
    title: string,
    description: string,
    features: string[]
}
const tabsData: TabData[] = [
    {
        value: 'about',
        title: 'About EduBlink',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer.',
        features: [
            'Online Remote Learning',
            'Lifetime Access For Learning'
        ]
    },
    {
        value: 'mission',
        title: 'Our Mission',
        description: 'Our mission is to provide accessible, high-quality education to learners worldwide. We believe in empowering individuals through knowledge and fostering a community of lifelong learners.',
        features: [
            'Expert Instructors',
            'Interactive Learning Experience'
        ]
    },
    {
        value: 'vision',
        title: 'Our Vision',
        description: 'We envision a world where education knows no boundaries. Our goal is to create an innovative platform that connects students and educators, making learning accessible and enjoyable for everyone.',
        features: [
            'Global Learning Community',
            'Cutting-Edge Technology'
        ]
    }
];
</script>

<style lang="scss" scoped>
.statistics-section {
    max-width: 1400px;
    margin: 0 auto;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;

    .statistic-div {
        width: 200px;
        height: 150px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .value-Stat {
            font-size: 2rem;
            font-weight: 700;
        }
    }
}

.about-section {
    width: 100%;
    padding: 60px 0;

    @media (max-width: 1023px) {
        padding: 40px 0;
    }

    @media (max-width: 767px) {
        padding: 30px 0;
    }
}

.container-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 60px;

    @media (max-width: 1279px) {
        gap: 40px;
        padding: 0 30px;
    }

    @media (max-width: 1023px) {
        flex-direction: column;
        gap: 40px;
        padding: 0 20px;
    }

    @media (max-width: 767px) {
        padding: 0 15px;
        gap: 30px;
    }
}

.content-side {
    flex: 1;
    min-width: 0;

    @media (max-width: 1023px) {
        width: 100%;
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
    right: 0;
    bottom: 0;
    transform: translate(100%, -40%);
    z-index: 2;


    @media (max-width: 1279px) {
        transform: translate(60%, -40%);

        width: 65%;

    }

    @media (max-width: 1025px) {
        transform: translate(80%, -40%);

        width: 60%;
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
}

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

        @media (max-width: 767px) {
            font-size: 20px !important;
        }
    }
}

.feature-text {
    font-size: 18px;
    font-weight: 500;
    color: #333;

    @media (max-width: 1023px) {
        font-size: 16px;
    }

    @media (max-width: 767px) {
        font-size: 15px;
    }
}
</style>