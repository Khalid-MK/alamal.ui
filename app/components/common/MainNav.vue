<template>
  <nav class="flex flex-col space-y-4 xl:flex-row xl:items-center xl:space-y-0 xl:space-x-8">
    <!-- Home -->
    <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium">
      Home
    </NuxtLink>

    <!-- About -->
    <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium">
      About
    </NuxtLink>

    <!-- Courses -->
    <div class="relative group">
      <NuxtLink to="/courses" class="text-gray-700 hover:text-blue-600 font-medium flex items-center">
        Courses
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </NuxtLink>
      
      <!-- Courses Dropdown -->
      <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div class="py-2">
          <NuxtLink to="/courses/web-development" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Web Development
          </NuxtLink>
          <NuxtLink to="/courses/mobile-development" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Mobile Development
          </NuxtLink>
          <NuxtLink to="/courses/data-science" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Data Science
          </NuxtLink>
          <NuxtLink to="/courses/design" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Design
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Instructor -->
    <div class="relative group">
      <NuxtLink to="/instructor" class="text-gray-700 hover:text-blue-600 font-medium flex items-center">
        Instructor
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </NuxtLink>
      
      <!-- Instructor Dropdown -->
      <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div class="py-2">
          <NuxtLink to="/instructor-profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Instructor Profile
          </NuxtLink>
          <NuxtLink to="/become-instructor" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Become Instructor
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Events -->
    <NuxtLink to="/events" class="text-gray-700 hover:text-blue-600 font-medium">
      Events
    </NuxtLink>

    <!-- Blog -->
    <NuxtLink to="/blog" class="text-gray-700 hover:text-blue-600 font-medium">
      Blog
    </NuxtLink>

    <!-- FAQs -->
    <NuxtLink to="/faqs" class="text-gray-700 hover:text-blue-600 font-medium">
      FAQs
    </NuxtLink>

    <!-- Contact -->
    <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600 font-medium">
      Contact
    </NuxtLink>
  </nav>
</template>

<script setup>
// This component handles the main navigation menu
// It uses i18n for translations and includes dropdown menus for courses and instructor sections
</script>

<style scoped>
/* Ensure dropdowns work properly */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>