<template>
  <div
    class="bg-[#F6F8FB] flex justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8"
  >
    <div class="Wrapper max-w-[90%] flex gap-10 justify-between">
      <!-- Current Events Section -->
      <div>
        <!-- Title with underline -->
        <div class="mb-8">
          <h1
            class="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative"
          >
            {{ $t("CurrentEvents") }}
            <span class="shape-line"><i class="icon-19"></i></span>
          </h1>
        </div>

        <!-- Events List -->
        <div class="space-y-4">
          <div
            v-for="(event, index) in events"
            :key="index"
            class="flex flex-col sm:flex-row gap-4 items-start"
          >
            <!-- Date Box -->
            <div class="flex-shrink-0">
              <div
                class="bg-primary-500 text-white overflow-hidden shadow-md w-20 text-center"
              >
                <div class="py-3 px-4">
                  <div class="text-3xl rtl:text-xl font-bold leading-none">
                    {{ getDay(event.date, locale) }}
                  </div>
                </div>
                <div
                  class="bg-white text-gray-700 py-2 px-2 text-sm rtl:text-[13px] font-medium"
                >
                  {{ getMonthYear(event.date, locale) }}
                </div>
              </div>
            </div>

            <!-- Event Info Card -->
            <div
              class="flex items-start Event-Info-Card bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div class="flex-grow">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  {{ event.title }}
                </h3>
                <div
                  class="flex flex-col sm:flex-row gap-3 text-sm text-gray-600"
                >
                  <div class="flex items-center gap-2">
                    <v-icon size="16" color="#666">mdi-clock-outline</v-icon>
                    <span>{{ getHour(event, locale) }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <v-icon size="16" color="#666">mdi-map-marker</v-icon>
                    <span>{{ event.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Arrow Icon -->
              <div class="flex-shrink-0 ml-4">
                <button
                  class="w-10 h-10 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
                >
                  <v-icon size="20" color="#999">mdi-arrow-right</v-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Student's Feedback Section -->
      <div class="Feedback-Section">
        <!-- Title -->
        <div class="mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            {{ $t("Student'sFeedback") }}
          </h1>
        </div>

        <!-- Feedback Card -->
        <swiper-container ref="containerRef" :init="false">
          <swiper-slide v-for="item in testimonialItems" :key="item.id">
            <div
              class="bg-white flex flex-col gap-5 p-6 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <!-- Header with Avatar and Quote Icons -->
              <div class="flex items-start justify-between mb-4 relative z-10">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 overflow-hidden bg-gray-200 flex-shrink-0"
                  >
                    <img
                      v-if="item.testimonialImage"
                      :src="item.testimonialImage"
                      :alt="item.feedbackAuthor"
                      class="w-full h-full object-cover"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center text-gray-500 font-semibold"
                    >
                      {{ item.feedbackAuthor[0] }}
                    </div>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      {{ item.feedbackAuthor }}
                    </h3>
                    <p class="text-sm text-gray-500">{{ item.feedbackType }}</p>
                  </div>
                </div>
                <div class="feedback-icon">
                  <i class="flaticon-quotes"></i>
                </div>
              </div>

              <!-- Feedback Title -->
              <h4 class="text-lg font-semibold text-primary-500 mb-3">
                {{ item.feedbackQuote }}
              </h4>

              <!-- Feedback Content -->
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                {{ item.feedback }}
              </p>

              <!-- Star Rating -->
              <div class="flex gap-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import eventsData from "@/constant/Events.json";
import testimonialsData from "@/constant/testimonials.json";

const { locale, localeProperties } = useI18n();
const testimonialItems = computed(
  () => testimonialsData[locale.value].testimonialItem
);
const events = computed(() => eventsData[locale.value].events);

const containerRef = ref(null);

interface EventData {
  title: string;
  date: string;
  location: string;
}

const swiper = useSwiper(containerRef, {
  effect: "slide",
  loop: true,
  autoplay: {
    delay: 5000,
  },
});

function getDay(dateString: string, lang: string = "en"): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // fallback if date is localized text (Arabic/Russian)
      const match = dateString.match(/\b\d{1,2}\b/);
      return match ? match[0] : "";
    }
    return date.getDate().toString().padStart(2, "0");
  } catch {
    return "";
  }
}

function getMonthYear(dateString: string, lang: string = "en"): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // fallback for Arabic or Russian
      const parts = dateString.split(" ");
      if (lang === "ar") {
        const month = parts[2] || "";
        const year = parts[3] || "";
        return `${month} ${year}`;
      }
      if (lang === "ru") {
        const month = parts[2] || "";
        const year = parts[3] || "";
        return `${month} ${year}`;
      }
      return "";
    }

    return date.toLocaleDateString(lang, {
      month: "short",
      year: "2-digit",
    });
  } catch {
    return "";
  }
}

function getHour(event: { date: string }, lang: string = "en"): string {
  try {
    const date = new Date(event.date);
    if (isNaN(date.getTime())) {
      // fallback for localized strings
      const match = event.date.match(/\b\d{1,2}:\d{2}/);
      return match ? match[0] : "";
    }

    return date.toLocaleTimeString(lang, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}
</script>

<style lang="scss" scoped>
.Wrapper {
  @media (max-width: 1024px) {
    flex-direction: column;
  }

  .Event-Info-Card {
    width: 400px;

    @media (max-width: 1024px) {
      width: 100%;
    }
  }

  .Feedback-Section {
    width: 500px;

    @media (max-width: 1024px) {
      width: 100%;
    }
  }
}

.feedback-icon {
  i {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 72px;
    color: #ced5e5;
    z-index: -1;
  }
}
[dir="rtl"] .feedback-icon {
  i {
    right: auto;
    left: 30px;
  }
}

.flaticon-quotes:before {
  bottom: 39px;
  position: relative;
  content: "\f110";
}

.shape-line {
  position: absolute;
  font-size: 14px;
  color: var(--color-primary);
  right: 21px;
  top: 25px;
}

.down-mark-line {
  position: relative;
  z-index: 2;
  display: inline-block;
}

.down-mark-line::before {
  position: absolute;
  content: "";
  left: 0;
  bottom: -5px;
  width: 100%;
  z-index: -1;
  height: 100%;
  background: url(/img/icon/down-mark-line.png);
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
