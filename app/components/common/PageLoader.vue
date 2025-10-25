<template>
  <Transition name="fade">
    <div v-if="isLoading" class="page-loader-overlay">
      <div class="loader-content">
        <div class="logo-container">
          <img
            src="/img/logo/logo-primary.png"
            alt="Al-Amal Academy Logo"
            class="app-logo pulse"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const isLoading = ref(true)
const nuxtApp = useNuxtApp()

// Handle initial page loading state
onMounted(() => {
  // Hide loader after a minimum time to ensure smooth experience
  const minLoadTime = 800 // minimum display time in ms
  const startTime = Date.now()
  
  const hideLoader = () => {
    const elapsed = Date.now() - startTime
    const remainingTime = Math.max(0, minLoadTime - elapsed)
    
    setTimeout(() => {
      isLoading.value = false
    }, remainingTime)
  }
  
  // Check if page is already loaded
  if (document.readyState === 'complete') {
    hideLoader()
  } else {
    window.addEventListener('load', hideLoader)
  }
})

// Handle route changes
const router = useRouter()
let routeChangeTimer = null

router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  // Clear any existing timer
  if (routeChangeTimer) {
    clearTimeout(routeChangeTimer)
  }
  
  // Small delay to ensure content is rendered
  routeChangeTimer = setTimeout(() => {
    isLoading.value = false
  }, 400)
})

// Handle errors - hide loader if there's an error
nuxtApp.hook('vue:error', () => {
  isLoading.value = false
})
</script>

<style scoped>
.page-loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  overflow: hidden;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .page-loader-overlay {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 200px;
}

.pulse-ring {
  position: absolute;
  width: 220px;
  height: 220px;
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
}

.app-logo {
  position: relative;
  width: 280px;
  max-width: 90%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
  z-index: 1;
}

/* Pulse animation */
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95);
  }
}

/* Loading dots */
.loading-dots {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.loading-dots span {
  width: 10px;
  height: 10px;
  background-color: #3b82f6;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Fade transition */
.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive sizing */
@media (max-width: 768px) {
  .logo-container {
    max-width: 320px;
    height: 160px;
  }
  
  .pulse-ring {
    width: 180px;
    height: 180px;
  }
  
  .app-logo {
    width: 220px;
  }
}

@media (max-width: 480px) {
  .logo-container {
    max-width: 280px;
    height: 140px;
  }
  
  .pulse-ring {
    width: 160px;
    height: 160px;
  }
  
  .app-logo {
    width: 180px;
  }
  
  .loading-dots span {
    width: 8px;
    height: 8px;
  }
  
  .loader-content {
    gap: 20px;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .pulse-ring {
    border-color: rgba(96, 165, 250, 0.4);
  }
  
  .loading-dots span {
    background-color: #60a5fa;
  }
  
  .app-logo {
    filter: drop-shadow(0 10px 30px rgba(255, 255, 255, 0.1));
  }
}
</style>

