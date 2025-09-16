<template>
  <div :dir="direction" class="w-full">
    <header>
      <!-- Reminder bar -->
      <div v-if="!hideReminder" class="hidden md:block bg-blue-600 text-white py-2 px-5">
        <div class="container mx-auto flex justify-between items-center">
          <NuxtLink class="px-4 py-1 bg-white text-blue-600 rounded-md text-sm font-medium" to="/course-details">
            {{ $t("JoinFreeTrialLessons") }}
          </NuxtLink>
          <div class="flex gap-3">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <!-- Navbar -->
      <div :class="[
        'sticky top-0 bg-white shadow z-50 transition-all',
        isSticky ? 'py-2' : 'py-4',
      ]">
        <div class="container mx-auto flex justify-between items-center px-4">
          <!-- Left (Logo + Nav) -->
          <div class="flex items-center gap-6">
            <NuxtLink to="/">
              <img src="/img/logo/coliouredlogo&text.svg" alt="logo" class="h-10" />
            </NuxtLink>
            <!-- Desktop Menu -->
            <div class="hidden md:block">
              <MainNav />
            </div>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-6">
            <!-- Language Switch -->
            <div class="menu-item-has-children" :class="{ open: isOpen }">
              <button @click="toggleDropdown">
                <Translation />
              </button>
              <ul class="sub-menu" v-if="isOpen">
                <li v-for="lang in locales" :key="lang.code">
                  <button class="flex items-center" @click="changeLocale(lang.code)">
                    {{ lang.name }}
                  </button>
                </li>
              </ul>
            </div>
            <!-- <div class="menu-item-has-children" :class="{ open: isOpen }">
              <button @click="toggleDropdown">
                <Translation />
              </button>
              <ul v-if="isOpen" class="sub-menu">

                <li>

                  <button class="flex items-center gap-1" @click="changeLocale('en')">EN🌐</button>
                </li>
                <li>

                  <button class="flex items-center gap-1" @click="changeLocale('ar')">AR🌐</button>
                </li>
              </ul>
            </div> -->


            <!-- Auth -->
            <div class="hidden md:flex items-center gap-2" :class="{ 'flex-col': locale === 'ru' }">
              <NuxtLink to="/signin" class="flex items-center justify-center text-gray-700 hover:text-blue-600">{{
                $t("SignIn") }}</NuxtLink>
              <NuxtLink to="/signup"
                class="flex items-center justify-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                {{ $t("SignUp") }}
              </NuxtLink>
            </div>

            <!-- Mobile Menu Toggle -->
            <button class="md:hidden flex flex-col gap-1" @click="handleSidebar">
              <span class="w-6 h-0.5 bg-gray-800"></span>
              <span class="w-6 h-0.5 bg-gray-800"></span>
              <span class="w-6 h-0.5 bg-gray-800"></span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div v-if="showSidebar" class="fixed inset-0 z-50 bg-black bg-opacity-50" @click="handleSidebarClose">
      <div class="absolute top-0 w-64 h-full bg-white shadow-lg p-6 overflow-y-auto"
        :class="direction === 'rtl' ? 'left-0' : 'right-0'" @click.stop>
        <button class="absolute top-4 text-gray-600 text-xl font-bold hover:text-gray-800"
          :class="direction === 'rtl' ? 'left-4' : 'right-4'" @click="handleSidebarClose">
          ✕
        </button>
        <div class="mt-8">
          <MobileNav />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
// import { useAuthStore } from "~/stores/authStore";

import MainNav from "./MainNav.vue";
import MobileNav from "./MobileNav.vue";
import Translation from "~/assets/icons/Translation.vue";

// store - temporarily disabled
// const authStore = useAuthStore();

// reactive state
const { locale, localeProperties, locales, setLocale } = useI18n()
console.log("locales", locales);
const isOpen = ref(false);
const hideReminder = ref(false);
const isSticky = ref(false);
const showSidebar = ref(false);

const direction = computed(() => localeProperties.value.dir);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
// methods
const handleSticky = () => {
  if (typeof window !== "undefined") {
    isSticky.value = window.scrollY > 50;
  }
};

function handleSidebar() {
  console.log("Sidebar toggle clicked!");
  showSidebar.value = true;
}

const handleSidebarClose = () => {
  console.log("Sidebar close clicked!");
  showSidebar.value = false;
};

const handleReminder = () => {
  hideReminder.value = !hideReminder.value;
};

// lifecycle hooks
onMounted(async () => {
  console.log("Header component mounted!");

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleSticky);
  }
  // await getUser();
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", handleSticky);
  }
});

// watchers (if you want to debug langDir)
watch(
  () => locale.value,
  (newVal, oldVal) => {
    console.log("Language changed from", oldVal, "to", newVal);
  }
);

watchEffect(() => {
  console.log("Language changed:", locale.value);
});


function changeLocale(locale: "en" | "ar" | "ru") {
  setLocale(locale)
  isOpen.value = false
}
</script>

<style scoped>
/* Custom transitions for mobile menu */
.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}

/* Ensure mobile menu is properly positioned */
.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

/* Add some basic animations */
.transition-all {
  transition: all 0.3s ease;
}

/* Debug styles */
.debug-info {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 9999;
}

.menu-item-has-children {
  position: relative;
}

.menu-item-has-children.open .sub-menu {
  display: block;
}

.sub-menu {
  display: none;
  position: absolute;
  top: 100%;
  /* left: -20px; */
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  min-width: 80px;
  z-index: 50;
}

.sub-menu li button {
  width: 100%;
  padding: 8px 12px;
  text-align: left;
}

.sub-menu li button:hover {
  background: #f3f4f6;
}
</style>
