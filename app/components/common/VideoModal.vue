<template>
    <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <!-- Modal Overlay -->
        <div class="absolute inset-0 w-full h-full bg-transparent cursor-pointer" @click="handleClose"></div>

        <!-- Modal Content -->
        <div class="relative bg-white p-5 rounded-lg max-w-4xl w-full mx-4 sm:mx-6 lg:mx-8">
            <!-- Video Player -->
            <video :src="videoUrl" controls autoplay playsinline class="w-full h-auto rounded-lg"
                @loadstart="handleVideoLoad">
                Your browser does not support the video tag.
            </video>

            <!-- Close Button -->
            <button @click="handleClose"
                class="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white border-none p-2 rounded cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Close video modal">
                <i class="fas fa-times text-sm"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// Props
interface Props {
    videoUrl: string
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
    close: []
}>()

// Methods
const handleClose = (): void => {
    emit('close')
}

const handleVideoLoad = (): void => {
    console.log('Video is loading...')
}

const handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
        handleClose()
    }
}

// Lifecycle
onMounted(() => {
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey)
    // Restore body scroll
    document.body.style.overflow = 'auto'
})
</script>