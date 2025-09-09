<template>
  <footer class="bg-[#0b0d17] text-gray-300">
    <!-- Main footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:space-x-10 space-y-10 lg:space-y-0"
      >
        <!-- Logo & About -->
        <div class="flex-1 max-w-sm">
          <NuxtLink to="/" class="inline-block mb-4">
            <img
              src="/img/logo/coliouredlogo&text.svg"
              alt="footer-logo"
              class="h-12"
            />
          </NuxtLink>
          <p class="text-gray-400 text-sm mb-6">
            Great lesson ideas and lesson plans for ESL teachers! Educators can
            customize lessons as best plans to knowledge.
          </p>
          <div class="flex space-x-3">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center text-gray-400 hover:bg-sky-400 hover:text-white"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Online Platform -->
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-white mb-4">Online Platform</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Proper Guidelines</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Digital Library</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Compare Us</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/become-instructor" class="hover:text-white"
                >Become Instructor</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Build Career</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Browse Courses -->
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-white mb-4">Browse Courses</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Development</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Business</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Health & Fitness</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Life Styles</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Photography</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Insight Community -->
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-white mb-4">
            Insight Community
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/contact" class="hover:text-white"
                >Global Partners</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/faq-page" class="hover:text-white">Forum</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-white"
                >Help & Support</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/course" class="hover:text-white"
                >Community</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/faq-details" class="hover:text-white"
                >Documentation</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="bg-[#0f111c] border-t border-gray-800">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0"
      >
        <!-- Left -->
        <div class="text-sm text-gray-400">
          © Copyrighted & Designed by
          <a
            href="https://themeforest.net/user/bdevs"
            class="text-blue-500 hover:underline"
            >BDevs</a
          >
        </div>

        <!-- Center -->
        <div class="flex items-center space-x-3">
          <div class="text-blue-500">
            <i class="fas fa-headset text-2xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-400">Have a question? Call us 24/7</p>
            <h5 class="text-lg font-bold text-white">
              <a href="tel:(987)547587587">(987) 547587587</a>
            </h5>
          </div>
        </div>

        <!-- Right -->
        <div class="w-full md:w-auto">
          <form
            action="#"
            class="flex items-center bg-[#111827] rounded-md overflow-hidden"
          >
            <div class="flex items-center px-3 text-gray-400">
              <i class="fas fa-envelope"></i>
            </div>
            <input
              type="email"
              placeholder="Enter Email"
              class="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-white placeholder-gray-400"
            />
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 flex items-center space-x-2"
            >
              <span>Subscribe</span>
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
