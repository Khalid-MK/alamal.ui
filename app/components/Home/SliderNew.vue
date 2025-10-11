<template>
    <div :dir="direction" class="slider-six">
        <div class="slider-six__mosque"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/mosque-1.png')">
        </div>
        <div class="slider-six__bg"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/9.jpg')"></div>

        <div class="slider-six_vector-1"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/vector-8.png')">
        </div>

        <div class="slider-six_vector-2"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/vector-9.png')">
        </div>
        <div class="slider-six_shadow"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/banner-shadow-1.png')">
        </div>
        <div class="slider-six_shadow-two"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/banner-shadow-2.png')">
        </div>
        <div class="slider-six_shadow-three"
            style="background-image:url('https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/banner-shadow-3.png')">
        </div>
        <swiper-container ref="containerRef" class="swiperContainer" :init="false">
            <swiper-slide class="slide-content" v-for="(slide, idx) in slides" :key="idx">
                <div class="content-wrapper">
                    <div class="text-content">
                        <h1 class="slider-six_title">
                            {{ slide.title }}
                        </h1>

                        <div class="slider-six_text">
                            <span class="text-icon">
                                <img decoding="async"
                                    src="https://themazine.com/newwp/alquran/wp-content/uploads/2025/07/slider-img.png"
                                    alt="Alquran" />
                            </span>
                            <p>{{ slide.desc }}</p>
                        </div>

                        <div class="slider-six_button">
                            <v-btn class="alquran-btn" color="#C5E96B">{{ $t("CheckOutMore") }}</v-btn>
                        </div>
                    </div>

                    <div class="slider-six_images-column">
                        <div class="slider-six_images-outer">
                            <div class="image">
                                <img decoding="async" :src="slide.imgSrc" alt="Alquran" />
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper-container>
        <AudioPlayer />
    </div>
</template>

<script setup lang="ts">
import slidesData from "@/constant/AboutUs";
import AudioPlayer from "../AudioPlayer.vue";

// Get locale
const { locale, localeProperties } = useI18n()

// Direction
const direction = computed(() => localeProperties.value.dir)

const slides = computed(() => slidesData.messages[locale.value].slides);
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
    effect: "slide",
});

onMounted(() => {
    console.log(swiper.instance);
});
</script>

<style lang="scss" scoped>
[dir="rtl"] .slider-six_title,
[dir="rtl"] .slider-six_text {
    text-align: right;
}

.slider-six {
    position: relative;
    z-index: 11;
    min-height: 100vh;
    height: 100%;
    overflow: visible;
    margin: 40px;
    border-radius: 40px 40px 0 0;

    @media (max-width:890px) {
        margin: 0 0 110px 0;
    }

    @media (max-width:430px) {
        /* margin: 0 0 110px 0; */
        border-radius: 0;
    }

    // Background layers
    &__bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        z-index: 1;
    }

    &__mosque {
        position: absolute;
        inset: 0;
        background-repeat: repeat-x;
        background-size: contain;
        background-position: bottom;
        opacity: 0.3;
        z-index: 2;
        animation: move-mosque 70s linear infinite;
    }

    // Shadow layers
    .slider-six_shadow {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        z-index: 2;
    }

    .slider-six_shadow-two {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: left;
    }

    .slider-six_shadow-three {
        position: absolute;
        inset: 0;
        background-position: right;
        background-repeat: no-repeat;
    }

    // Decorative vectors - Desktop first
    .slider-six_vector-1 {
        position: absolute;
        left: 70px;
        top: 70px;
        width: 106px;
        height: 106px;
        z-index: 1;
        background-repeat: no-repeat;
        background-size: contain;
        animation: spin 30s linear infinite;

        @media (max-width: 1023px) {
            left: 50px;
            top: 80px;
            width: 90px;
            height: 90px;
        }

        @media (max-width: 767px) {
            left: 20px;
            top: 70px;
            width: 60px;
            height: 60px;
        }
    }

    .slider-six_vector-2 {
        position: absolute;
        z-index: 1;
        left: 55%;
        top: 10%;
        width: 96px;
        height: 96px;
        background-repeat: no-repeat;
        background-size: contain;
        animation: moveUpDown 4s infinite;

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

    // Swiper container - Desktop first
    .swiperContainer {
        position: relative;
        z-index: 11;
        height: 100%;
        min-height: 100vh;
        padding: 60px;

        @media (max-width: 1023px) {
            padding: 40px;
        }

        @media (max-width: 767px) {
            padding: 30px;
        }

        @media (max-width: 639px) {
            padding: 20px;
        }
    }

    // Slide content
    .slide-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    .content-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 80px;
        padding: 0 5px;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;

        @media (max-width: 1279px) {
            gap: 60px;
        }

        @media (max-width: 1023px) {
            flex-direction: column;
            gap: 40px;
        }
    }

    .text-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        gap: 40px;
        flex: 1;

        @media (max-width: 1023px) {
            align-items: center;
            text-align: center;
            gap: 25px;
        }
    }

    .slider-six_title {
        font-size: 60px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 1.2;
        margin: 0;

        @media (max-width: 1279px) {
            font-size: 54px;
        }

        @media (max-width: 1023px) {
            font-size: 48px;
        }

        @media (max-width: 767px) {
            font-size: 42px;
        }

        @media (max-width: 639px) {
            font-size: 36px;
        }

        @media (max-width: 479px) {
            font-size: 28px;
        }
    }

    .slider-six_text {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        max-width: 600px;
        line-height: 30px;
        font-weight: 400;
        color: #585956;
        font-size: 17px;

        @media (max-width: 1023px) {
            font-size: 16px;
            line-height: 1.9;
        }

        @media (max-width: 767px) {
            font-size: 15px;
            line-height: 1.8;
        }

        @media (max-width: 639px) {
            font-size: 14px;
            line-height: 1.7;
        }

        .text-icon {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            margin-top: 4px;

            img {
                width: 100px;

                @media (max-width: 767px) {
                    width: 70px;
                }

                @media (max-width: 650px) {
                    width: 50px;
                }
            }
        }

        p {
            margin: 0;
            flex: 1;
        }
    }

    .slider-six_button {
        .alquran-btn {
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transition: transform 0.3s ease;
            border-radius: 50px;

            &:hover {
                transform: scale(1.01);
            }
        }
    }

    // Images column - Desktop first
    .slider-six_images-column {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

        @media (max-width: 1023px) {
            justify-content: center;
            max-width: 400px;
        }
    }

    .slider-six_images-outer {
        position: relative;
        width: 100%;
        max-width: 420px;

        @media (max-width: 1279px) {
            max-width: 380px;
        }

        @media (max-width: 1023px) {
            max-width: 360px;
        }

        @media (max-width: 639px) {
            max-width: 320px;
        }

        @media (max-width: 479px) {
            max-width: 280px;
        }

        .image {
            width: 100%;

            img {
                width: 100%;
                height: auto;
                display: block;
                filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
            }
        }
    }
}

// Animations
@keyframes moveUpDown {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes move-mosque {
    0% {
        background-position: 0 bottom;
    }

    100% {
        background-position: -2000px bottom;
    }
}
</style>