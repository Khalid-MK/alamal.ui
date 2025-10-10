<script setup lang="ts">
const slides = [
  {
    id: "quraan",
    image: "/img/new_cover_quran.png",
    title: "QuranCourses",
    subtitle: "HomeSlider2Subtitle",
    buttonText: "Slide2Button",
  },
  {
    id: "tjweed",
    image: "/img/new_cover_tajweed.png",
    title: "TajweedCourses",
    subtitle: "HomeSlider3Subtitle",
    buttonText: "Slide3Button",
  },
  {
    id: "arabic",
    image: "/img/new_cover_arabic.png",
    title: "QuranCourses",
    subtitle: "HomeSlider4Subtitle",
    buttonText: "Slide4Button",
  },
];
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  effect: "slide",
});

onMounted(() => {
  console.log(swiper.instance);
});
</script>

<template>
  <ClientOnly>
    <div class="home-slider">
      <swiper-container ref="containerRef" :init="false">
        <swiper-slide v-for="(slide, idx) in slides" :key="idx">
          <div class="slider-content-wrapper">
            <div class="slider-content-container">
              <div class="background-image-container">
                <img :src="slide.image" alt="" />
              </div>
              <div class="verse-text-container">
                <div class="verse-image-container">
                  <img src="/img/home-slider/home-05.png" alt="" />
                </div>
                <ul class="text-container text-secondary">
                  <li class="title">{{ $t(slide.title) }}</li>
                  <li class="subtitle">{{ $t(slide.subtitle) }}</li>
                  <!-- <li class="button"> -->
                  <button class="edu-btn rounded-[4px] hover:text-secondary-hover bg-primary hover:bg-primary-hover"
                    style="width: fit-content">
                    {{ $t(slide.buttonText) }}
                  </button>

                </ul>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </ClientOnly>
</template>

<style lang="css">
@media only screen and (min-width: 1400px) and (max-width: 1599px) {
  .slider-content-wrapper {
    text-align: center;
  }
}

swiper-slide {
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

.home-slider .slider-content-wrapper {
  height: 60%;
}

.home-slider .slider-content-wrapper .slider-content-container {
  display: flex;
  width: 100%;
}

.home-slider .slider-content-wrapper .slider-content-container .background-image-container {
  width: 100%;
  height: auto;
  position: relative;
}

.home-slider .slider-content-wrapper .slider-content-container .background-image-container img {
  width: 100%;
}

.home-slider .slider-content-wrapper .slider-content-container .verse-text-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: 85%;
  align-items: center;
  flex-direction: column;
  width: 50%;
  padding: 15px 0;
  box-sizing: border-box;
  left: 0;
  top: 0;
}

.home-slider .slider-content-wrapper .slider-content-container .verse-text-container .verse-image-container {
  width: 80%;
}

.home-slider .slider-content-wrapper .slider-content-container .verse-text-container .verse-image-container img {
  width: 100%;
}

/* text-container */
.home-slider .slider-content-wrapper .slider-content-container .verse-text-container .text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  gap: 1rem;
  font-size: 20px;
}

.home-slider .slider-content-wrapper .slider-content-container .verse-text-container .text-container .title {
  font-size: 25px;
  font-weight: bold;
}

.home-slider .slider-content-wrapper .slider-content-container .verse-text-container .text-container .button {
  align-self: flex-end;
}

@media (max-width: 575px),
only screen and (min-width: 576px) and (max-width: 767px) {
  .free-trial-btn {
    width: 100%;
  }
}

.edu-btn {
  display: inline-block;
  height: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  /* color: #ffffff;
  background-color: #2467EC; */
  padding: 0 40px;
  /* border-radius: 4px; */
  transition: all 0.3s ease-out 0s;
  border: 1px solid transparent;
}

/* 
.edu-btn:hover {
   background-color: #FFB013; 
  color: #141517;
} */

.edu-btn:focus {
  /* color: #ffffff; */
  border: 1px solid transparent;
}

@media (max-width: 576px) {
  .home-slider .slider-content-wrapper .slider-content-container .verse-text-container .text-container .title {
    font-size: 15px;
  }

  .home-slider .slider-content-wrapper .slider-content-container .verse-text-container .text-container {
    gap: 0.5rem;
    font-size: 10px;
  }

  .edu-btn {
    font-size: 10px;
    font-weight: 600;
    height: 30px;
    color: #ffffff;
    /* background-color: #2467EC; */
    padding: 0 20px;
    /* border-radius: 4px; */
    transition: all 0.3s ease-out 0s;
    border: 1px solid transparent;
  }
}

@media (max-width: 373px) {
  .edu-btn {
    height: 20px;
  }

  .home-slider .slider-content-wrapper .slider-content-container .verse-text-container .text-container .title {
    font-size: 12px;
  }

  .home-slider .slider-content-wrapper .slider-content-container .verse-text-container .text-container {
    gap: 0.3rem;
    font-size: 9px;
  }
}
</style>
