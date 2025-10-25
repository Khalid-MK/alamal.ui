<template>
  <div class="testimonial-area py-16 lg:py-20 mb-16 lg:mb-20">
    <div class="max-w-7xl mx-auto px-6 sm:px-6 lg:px-0">
      <div class="flex lg:gap-10">

        <!-- LEFT COLUMN: Heading & CTA -->
        <div class="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
          <div class="lg:pr-12">
            <div
              ref="sectionTitleRef"
              class="text-left opacity-0 transition-all duration-800"
              :class="{ 'animate-fade-up': isTitleVisible }"
            >
              <!-- Pre-title -->
              <span class="block text-sm text-[var(--color-grey)] font-semibold uppercase tracking-wide mb-4">
                {{ $t('testimonials.preTitle') }}
              </span>

              <!-- Main Title -->
              <h2 class="text-3xl lg:text-4xl font-bold text-[var(--color-heading)] mb-4 leading-tight">
                {{ $t('testimonials.title') }}
              </h2>

              <!-- Decorative Line with Icon -->
              <span class="inline-flex items-center text-[var(--color-primary)] text-xl mb-4">
                <i class="icon-19"></i>
              </span>

              <!-- Description -->
              <p class="text-[var(--color-body)] text-base leading-relaxed mb-6">
                {{ $t('testimonials.description') }}
              </p>

              <EduButton variant="secondary" icon="icon-4" class="mt-4">{{ $t("ctaBanner.buttonText") || "Enroll Now" }}</EduButton>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Testimonial Slider -->
        <div class="w-full lg:w-7/12 px-4">
          <div class="testimonial-swiper-wrapper -my-14">
            <swiper-container ref="testimonialSwiperRef" class="testimonial-swiper" :init="false">
              <!-- TESTIMONIAL SLIDES -->
              <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
                <div class="testimonial-grid bg-white rounded-lg shadow-xl p-8 lg:p-12 relative overflow-hidden my-14">
                  <!-- Decorative Shape (top-right corner) -->
                  <div class="testimonial-shape absolute -top-1 -right-1 -z-10 w-24 h-24"></div>

                  <!-- Overlay for inactive slides -->
                  <div class="testimonial-overlay"></div>

                  <!-- Profile Image with Quote Badge -->
                  <div class="inline-block relative mb-8 z-20">
                    <img
                      :src="testimonial.image"
                      :alt="testimonial.name"
                      class="w-20 h-20 rounded-full object-cover"
                    >

                    <!-- Quote Icon Badge -->
                    <span class="absolute -bottom-2 -right-3 w-9 h-9 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xs border-4 border-white">
                      <i class="icon-26"></i>
                    </span>
                  </div>

                  <!-- Content -->
                  <div class="relative z-20">
                    <!-- Testimonial Text -->
                    <p class="text-[var(--color-body)] text-base mb-5 leading-relaxed">
                      {{ testimonial.text[locale] }}
                    </p>

                    <!-- Star Rating -->
                    <div class="flex gap-1 mb-2">
                      <i v-for="n in 5" :key="n" class="icon-23 text-yellow-400"></i>
                    </div>

                    <!-- Author Info -->
                    <h5 class="text-lg font-semibold text-[var(--color-heading)] mb-1">
                      {{ testimonial.name }}
                    </h5>
                    <span class="text-sm text-[var(--color-body)]">
                      {{ testimonial.role[locale] }}
                    </span>
                  </div>
                </div>
              </swiper-slide>

            </swiper-container>
            <!-- Swiper Pagination - moved inside swiper-container -->
            <div slot="pagination" class="swiper-pagination testimonial-pagination"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { register } from 'swiper/element/bundle';
import EduButton from '~/components/common/EduButton.vue';

// Register Swiper web components
register();

// Interfaces
interface Testimonial {
  id: string;
  image: string;
  name: string;
  text: {
    en: string;
    ar: string;
    ru: string;
  };
  role: {
    en: string;
    ar: string;
    ru: string;
  };
}

// Refs
const sectionTitleRef = ref<HTMLElement | null>(null);
const testimonialSwiperRef = ref<any>(null);
const isTitleVisible = ref(false);

const { locale } = useI18n();

// Testimonials Data
const testimonials: Testimonial[] = [
  {
    id: '1',
    image: '/img/testimonial/testimonial-01.png',
    name: 'Ray Sanchez',
    text: {
      en: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
      ar: 'لوريم إيبسوم دولور أميت كونسيك تور إيليت أديسينغ سيد دو أوسمود زكس تيمبور إنيم مينيم فينيام كويس نوسترود إكسير سيتيشن.',
      ru: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    role: {
      en: 'Student',
      ar: 'طالب',
      ru: 'Студент'
    }
  },
  {
    id: '2',
    image: '/img/testimonial/testimonial-02.png',
    name: 'Thomas Lopez',
    text: {
      en: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
      ar: 'لوريم إيبسوم دولور أميت كونسيك تور إيليت أديسينغ سيد دو أوسمود زكس تيمبور إنيم مينيم فينيام كويس نوسترود إكسير سيتيشن.',
      ru: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    role: {
      en: 'Designer',
      ar: 'مصمم',
      ru: 'Дизайнер'
    }
  },
  {
    id: '3',
    image: '/img/testimonial/testimonial-03.png',
    name: 'Amber Page',
    text: {
      en: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
      ar: 'لوريم إيبسوم دولور أميت كونسيك تور إيليت أديسينغ سيد دو أوسمود زكس تيمبور إنيم مينيم فينيام كويس نوسترود إكسير سيتيشن.',
      ru: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    role: {
      en: 'Developer',
      ar: 'مطور',
      ru: 'Разработчик'
    }
  },
  {
    id: '4',
    image: '/img/testimonial/testimonial-04.png',
    name: 'Robert Tapp',
    text: {
      en: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
      ar: 'لوريم إيبسوم دولور أميت كونسيك تور إيليت أديسينغ سيد دو أوسمود زكس تيمبور إنيم مينيم فينيام كويس نوسترود إكسير سيتيشن.',
      ru: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    role: {
      en: 'Content Creator',
      ar: 'منشئ المحتوى',
      ru: 'Создатель контента'
    }
  },
  {
    id: '5',
    image: '/img/testimonial/testimonial-03.png',
    name: 'Amber Page',
    text: {
      en: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
      ar: 'لوريم إيبسوم دولور أميت كونسيك تور إيليت أديسينغ سيد دو أوسمود زكس تيمبور إنيم مينيم فينيام كويس نوسترود إكسير سيتيشن.',
      ru: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    role: {
      en: 'Developer',
      ar: 'مطور',
      ru: 'Разработчик'
    }
  },
  {
    id: '6',
    image: '/img/testimonial/testimonial-04.png',
    name: 'Robert Tapp',
    text: {
      en: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
      ar: 'لوريم إيبسوم دولور أميت كونسيك تور إيليت أديسينغ سيد دو أوسمود زكس تيمبور إنيم مينيم فينيام كويس نوسترود إكسير سيتيشن.',
      ru: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    role: {
      en: 'Content Creator',
      ar: 'منشئ المحتوى',
      ru: 'Создатель контента'
    }
  }
];

// Initialize Swiper
onMounted(() => {
  // Intersection Observer for title animation
  if (typeof window !== 'undefined') {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target === sectionTitleRef.value) {
          isTitleVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (sectionTitleRef.value) {
      observer.observe(sectionTitleRef.value);
    }
  }

  // Initialize Swiper
  if (testimonialSwiperRef.value) {
    const swiperContainer = testimonialSwiperRef.value;

    // Set swiper parameters
    Object.assign(swiperContainer, {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      centeredSlides: true,
      effect: 'coverflow',
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      coverflowEffect: {
        rotate: 0,
        slideShadows: false,
        depth: 180,
        modifier: 1,
        stretch: 0
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
        type: 'bullets',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active'
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        }
      }
    });

    // Initialize
    swiperContainer.initialize();
  }
});

// Cleanup
onBeforeUnmount(() => {
  if (testimonialSwiperRef.value) {
    testimonialSwiperRef.value.swiper?.destroy();
  }
});
</script>

<style scoped>
/* Testimonial Grid Card */
.testimonial-grid {
  box-shadow: var(--shadow-darker);
  transition: var(--transition);
}

/* Decorative Shape Background */
.testimonial-shape {
  background-image: url('/img/testimonial/shape-1.png');
  background-size: contain;
  background-repeat: no-repeat;
}

/* Overlay for Inactive Slides */
.testimonial-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.7);
  transition: opacity 0.3s;
  z-index: 10;
}

/* Active slide: remove overlay */
.swiper-slide-active .testimonial-overlay {
  opacity: 0;
}

/* Coverflow Effect Styling */
.testimonial-swiper-wrapper {
  position: relative;
}

.testimonial-swiper {
  overflow: visible;
  height: 540px;
}

/* Adjust margins for coverflow effect */
.swiper-slide .testimonial-grid {
  position: relative;
}

/* Previous slide styling */
.swiper-slide-prev .testimonial-grid {
  margin-left: 36px;
  box-shadow: 70px 0px 50px 0px rgba(26, 46, 85, 0.1);
  padding: 2.5rem 2rem 3rem;
}

/* Next slide styling */
.swiper-slide-next .testimonial-grid {
  margin-left: 40px;
  margin-right: 36px;
  box-shadow: -40px 0px 50px 0px rgba(26, 46, 85, 0.1);
  padding: 2.5rem 2rem 3rem;
}

/* Swiper Pagination Bullets */
.testimonial-pagination {
  position: relative !important;
  text-align: center;
  bottom: auto !important;
}

:deep(.swiper-pagination) {
  position: relative !important;
  bottom: auto !important;
}

:deep(.swiper-pagination-bullet) {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: rgba(26, 182, 157, 0.3);
  margin: 0 8px !important;
  opacity: 1 !important;
  border-radius: 50%;
  transition: background-color 0.3s;
  cursor: pointer;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: rgba(26, 182, 157, 1);
}

/* Fade up animation */
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
  opacity: 1 !important;
}

/* Mobile Responsive Adjustments */
@media (max-width: 1199px) {
  .swiper-slide-prev .testimonial-grid,
  .swiper-slide-next .testimonial-grid {
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 991px) {
  .swiper-slide-prev .testimonial-grid,
  .swiper-slide-next .testimonial-grid {
    margin-left: 40px;
  }
}

@media (max-width: 575px) {
  .testimonial-grid {
    margin: 55px 30px;
  }
}

/* RTL Support */
html[dir="rtl"] .swiper-slide-prev .testimonial-grid {
  margin-left: auto;
  margin-right: 36px;
}

html[dir="rtl"] .swiper-slide-next .testimonial-grid {
  margin-right: 40px;
  margin-left: 36px;
}

html[dir="rtl"] .testimonial-shape {
  right: auto;
  left: -0.25rem;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up,
  .testimonial-overlay {
    animation: none !important;
    transition: none !important;
  }
}

:deep(.swiper-slide-visible.swiper-slide-prev) {
  transform: translate3d(80px, 0px, -180px) rotateX(0deg) rotateY(0deg) scale(1) !important;
  opacity: 0.4;
}

:deep(.swiper-slide-visible.swiper-slide-next) {
  transform: translate3d(-80px, 0px, -180px) rotateX(0deg) rotateY(0deg) scale(1) !important;
  opacity: 0.4;
}

:deep(.swiper-slide-visible .testimonial-grid:before) {
    content: "";
    height: 100%;
    width: 100%;
    background-color: #fff;
    opacity: 0.8;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

:deep(.testimonial-grid:after) {
    content: url('/img/testimonial/shape-1.png');
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 1;
}
</style>