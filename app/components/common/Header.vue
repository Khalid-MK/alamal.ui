<template>
  <div :dir="langDir" class="w-full">
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
            <div class="hidden xl:block">
              <MainNav />
            </div>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-6">
            <!-- Language Switch -->
            <!-- <div class="menu-item-has-children">
              <a href="javascript:void(0)">
                <svg fill="#000000" width="22" height="22" version="1.1" id="anna_vital_language_icon"
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256"
                  enable-background="new 0 0 256 256" xml:space="preserve">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M62.4,101c-1.5-2.1-2.1-3.4-1.8-3.9c0.2-0.5,1.6-0.7,3.9-0.5c2.3,0.2,4.2,0.5,5.8,0.9c1.5,0.4,2.8,1,3.8,1.7 c1,0.7,1.8,1.5,2.3,2.6c0.6,1,1,2.3,1.4,3.7c0.7,2.8,0.5,4.7-0.5,5.7c-1.1,1-2.6,0.8-4.6-0.6c-2.1-1.4-3.9-2.8-5.5-4.2 C65.5,105.1,63.9,103.2,62.4,101z M40.7,190.1c4.8-2.1,9-4.2,12.6-6.4c3.5-2.1,6.6-4.4,9.3-6.8c2.6-2.3,5-4.9,7-7.7 c2-2.7,3.8-5.8,5.4-9.2c1.3,1.2,2.5,2.4,3.8,3.5c1.2,1.1,2.5,2.2,3.8,3.4c1.3,1.2,2.8,2.4,4.3,3.8c1.5,1.4,3.3,2.8,5.3,4.5 c0.7,0.5,1.4,0.9,2.1,1c0.7,0.1,1.7,0,3.1-0.6c1.3-0.5,3-1.4,5.1-2.8c2.1-1.3,4.7-3.1,7.9-5.4c1.6-1.1,2.4-2,2.3-2.7 c-0.1-0.7-1-1-2.7-0.9c-3.1,0.1-5.9,0.1-8.3-0.1c-2.5-0.2-5-0.6-7.4-1.4c-2.4-0.8-4.9-1.9-7.5-3.4c-2.6-1.5-5.6-3.6-9.1-6.2 c1-3.9,1.8-8,2.4-12.4c0.3-2.5,0.6-4.3,0.8-5.6c0.2-1.2,0.5-2.4,0.9-3.3c0.3-0.8,0.4-1.4,0.5-1.9c0.1-0.5-0.1-1-0.4-1.6 c-0.4-0.5-1-1.1-1.9-1.7c-0.9-0.6-2.2-1.4-3.9-2.3c2.4-0.9,5.1-1.7,7.9-2.6c2.7-0.9,5.7-1.8,8.8-2.7c3-0.9,4.5-1.9,4.6-3.1 c0.1-1.2-0.9-2.3-3.2-3.5c-1.5-0.8-2.9-1.1-4.3-0.9c-1.4,0.2-3.2,0.9-5.4,2.2c-0.6,0.4-1.8,0.9-3.4,1.6c-1.7,0.7-3.6,1.5-6,2.5 c-2.4,1-5,2-7.8,3.1c-2.9,1.1-5.8,2.2-8.7,3.2c-2.9,1.1-5.7,2-8.2,2.8c-2.6,0.8-4.6,1.4-6.1,1.6c-3.8,0.8-5.8,1.6-5.9,2.4 c0,0.8,1.5,1.6,4.4,2.4c1.2,0.3,2.3,0.6,3.1,0.6c0.8,0.1,1.7,0.1,2.5,0c0.8-0.1,1.6-0.3,2.4-0.5c0.8-0.3,1.7-0.7,2.8-1.1 c1.6-0.8,3.9-1.7,6.9-2.8c2.9-1,6.6-2.4,11.2-4c0.9,2.7,1.4,6,1.4,9.8c0,3.8-0.4,8.1-1.4,13c-1.3-1.1-2.7-2.3-4.2-3.6 c-1.5-1.3-2.9-2.6-4.3-3.9c-1.6-1.5-3.2-2.5-4.7-3c-1.6-0.5-3.4-0.5-5.5,0c-3.3,0.9-5,1.9-4.9,3.1c0,1.2,1.3,1.8,3.8,1.9 c0.9,0.1,1.8,0.3,2.7,0.6c0.9,0.3,1.9,0.9,3.2,1.8c1.3,0.9,2.9,2.2,4.7,3.8c1.8,1.6,4.2,3.7,7,6.3c-1.2,2.9-2.6,5.6-4.1,8 c-1.5,2.5-3.4,5-5.5,7.3c-2.2,2.4-4.7,4.8-7.7,7.2c-3,2.5-6.6,5.1-10.8,7.8c-4.3,2.8-6.5,4.7-6.5,5.6C35,192.1,37,191.7,40.7,190.1z M250.5,81.8v165.3l-111.6-36.4L10.5,253.4V76.1l29.9-10V10.4l81.2,28.7L231.3,2.6v73.1L250.5,81.8z M124.2,50.6L22.3,84.6v152.2 l101.9-33.9V50.6L124.2,50.6z M219.4,71.9V19L138.1,46L219.4,71.9z M227,201.9L196.5,92L176,85.6l-30.9,90.8l18.9,5.9l5.8-18.7 l31.9,10l5.7,22.3L227,201.9z M174.8,147.7l22.2,6.9l-10.9-42.9L174.8,147.7z">
                    </path>
                  </g>
                </svg>
              </a>
              <ul class="sub-menu">
                <li v-for="item in locales" :key="item.code">
                  <a href="javascript:void(0)" @click="handleChangeLanguage(item)">{{ item.name }}</a>
                </li>
              </ul>
            </div> -->

            <button class="flex items-center gap-1" @click="setLocale('en')">EN🌐</button>
            <button class="flex items-center gap-1" @click="setLocale('ar')">AR🌐</button>

            <!-- Auth -->
            <div class="hidden md:flex gap-4">
              <NuxtLink to="/signin" class="text-gray-700 hover:text-blue-600">Sign In</NuxtLink>
              <NuxtLink to="/signup" class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                Sign Up
              </NuxtLink>
            </div>

            <!-- Mobile Menu Toggle -->
            <button class="xl:hidden flex flex-col gap-1" @click="handleSidebar">
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
      <div class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 overflow-y-auto" @click.stop>
        <button class="absolute top-4 right-4 text-gray-600 text-xl font-bold hover:text-gray-800"
          @click="handleSidebarClose">
          ✕
        </button>
        <div class="mt-8">
          <MainNav />
        </div>
      </div>
    </div>

    <!-- Debug info to test if JS is working -->
    <div class="debug-info">
      <div>Sidebar: {{ showSidebar ? 'Open' : 'Closed' }}</div>
      <div>Sticky: {{ isSticky ? 'Yes' : 'No' }}</div>
      <button @click="handleSidebar" class="bg-blue-500 text-white px-2 py-1 rounded text-xs mt-1">
        Test JS
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
// import { useAuthStore } from "~/stores/authStore";

import MainNav from "./MainNav.vue";

// store - temporarily disabled
// const authStore = useAuthStore();

// reactive state
const { locale, setLocale } = useI18n()
const langDir = ref("ltr");
const showCart = ref(false);
const hideReminder = ref(false);
const isSticky = ref(false);
const showSidebar = ref(false);

const menuOption = reactive({
  menuShow: false,
  homeDropdown: false,
  coursesDropdown: false,
  shopDropdown: false,
  pagesDropDown: false,
  instructorDropDown: false,
  faqDropDown: false,
  eventDropDown: false,
  blogDropdown: false,
});

// methods
const handleSticky = () => {
  if (process.client) {
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

// Language switching temporarily disabled

// Temporarily disable auth store to isolate the issue
// const getUser = async () => {
//   await authStore.verifyUser();
// };

// lifecycle hooks
onMounted(async () => {
  console.log("Header component mounted!");

  if (process.client) {
    window.addEventListener("scroll", handleSticky);
  }
  // await getUser();
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("scroll", handleSticky);
  }
});

// watchers (if you want to debug langDir)
watch(langDir, (newVal) => {
  console.log("Language direction changed:", newVal);
});

function handleChangeLanguage(item) {
  setLocale(item.name)
}
</script>

<style scoped>
[dir="rtl"] .header-area {
  direction: rtl;
}

[dir="ltr"] .header-area {
  direction: ltr;
}

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

.sub-menu {
  position: absolute;
  top: 0;
  left: 100%;
  right: auto;
  z-index: 999;
  width: fit-content;
  max-width: 220px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: none;
  white-space: normal;
  /* word-break: break-word; */
  padding: 0.5rem 0;
  /* background: red; */
}

.sub-menu li {
  max-width: 100%;
  padding: 0 1.2rem;
}

.menu-item-has-children {
  position: relative;
}

.menu-item-has-children:hover>.sub-menu,
.menu-item-has-children:focus-within>.sub-menu {
  display: block;
}

/* RTL support */
.rtl .menu-item-has-children>.sub-menu {
  left: auto;
  right: 100%;
}


.rtl .sub-menu {
  text-align: right;
}
</style>
