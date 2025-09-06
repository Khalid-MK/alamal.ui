<template>
  <div :dir="langDir" class="w-full">
    <header>
      <!-- Reminder bar -->
      <div
        v-if="!hideReminder"
        class="hidden md:block bg-blue-600 text-white py-2 px-5"
      >
        <div class="container mx-auto flex justify-between items-center">
          <NuxtLink
            class="px-4 py-1 bg-white text-blue-600 rounded-md text-sm font-medium"
            to="/course-details"
          >
            Join Free Trial Lessons
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
      <div
        :class="[
          'sticky top-0 bg-white shadow z-50 transition-all',
          isSticky ? 'py-2' : 'py-4',
        ]"
      >
        <div class="container mx-auto flex justify-between items-center px-4">
          <!-- Left (Logo + Nav) -->
          <div class="flex items-center gap-6">
            <NuxtLink to="/">
              <img
                src="/img/logo/coliouredlogo&text.svg"
                alt="logo"
                class="h-10"
              />
            </NuxtLink>
            <!-- Desktop Menu -->
            <div class="hidden xl:block">
              <MainNav />
            </div>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-6">
            <!-- Language Switch -->
            <div class="relative hidden xl:block">
              <button class="flex items-center gap-1">🌐</button>
            </div>

            <!-- Auth -->
            <div class="hidden md:flex gap-4">
              <NuxtLink to="/signin" class="text-gray-700 hover:text-blue-600"
                >Sign In</NuxtLink
              >
              <NuxtLink
                to="/signup"
                class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </NuxtLink>
            </div>

            <!-- Mobile Menu Toggle -->
            <button
              class="xl:hidden flex flex-col gap-1"
              @click="handleSidebar"
            >
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
       <div
         class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 overflow-y-auto"
         @click.stop
       >
         <button
           class="absolute top-4 right-4 text-gray-600 text-xl font-bold hover:text-gray-800"
           @click="handleSidebarClose"
         >
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
</style>
