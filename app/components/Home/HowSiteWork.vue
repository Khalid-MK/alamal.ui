<template>
    <div>
        <section style="padding-top:3rem ;">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-wrap">
                    <div class="w-full">
                        <div class="mb-8">
                            <!-- Video Section -->
                            <div class="relative mb-6">
                                <div class="relative w-full overflow-hidden rounded-lg shadow-lg">
                                    <img src="/img/welcome.png" alt="Welcome video thumbnail"
                                        class="w-full h-auto object-cover" />
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <button @click="handleVideoPopup"
                                            class="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 hover:bg-blue-700 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            aria-label="Play video">
                                            <i class="fas fa-play text-white text-lg sm:text-xl ml-1"></i>
                                            <div
                                                class="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-30">
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Heading -->
                            <div class="mb-5">
                                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                    {{ $t("HowSiteWorkHeader") }}
                                </h2>
                            </div>

                            <!-- Description -->
                            <div class="pb-8">
                                <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
                                    {{ $t("HowSiteWorkText") }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Video Modal -->
        <VideoModal v-if="isModalVisible" ref="videoModal" :video-url="videoUrl" @close="handleCloseModal" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VideoModal from "../common/VideoModal.vue";

// Reactive data
const isModalVisible = ref<boolean>(false);
const videoUrl = ref<string>("/videos/welcome.mp4");

// Template ref
const videoModal = ref<InstanceType<typeof VideoModal> | null>(null);

// Methods
const handleVideoPopup = (): void => {
    isModalVisible.value = true;
};

const handleCloseModal = (): void => {
    isModalVisible.value = false;
};
</script>
