<template>
	<div :dir="direction" class="video-area-section">
		<!-- Main Content Container -->
		<div class="max-w-7xl mx-auto">
			<div class="flex justify-center">
				<!-- Column (50% width on desktop, 66% on tablet, full on mobile) -->
				<div class="w-full lg:w-6/12 md:w-8/12">
					<!-- Video Banner Content -->
					<div class="video-banner-content">
						<!-- Video Button -->
						<div class="video-btn">
							<button @click="openVideoModal" class="video-play-btn" :aria-label="$t('videoArea.playButtonAriaLabel')"
								type="button">
								<i class="icon-18"></i>
							</button>
						</div>

						<!-- Title -->
						<h2 class="title">{{ $t("videoArea.title") }}</h2>
					</div>
				</div>
			</div>
		</div>

		<!-- Video Modal (using Teleport to body) -->
		<Teleport to="body">
			<Transition name="modal-fade">
				<div v-if="isModalOpen" class="video-modal-overlay" @click="closeVideoModal">
					<div class="video-modal-container" @click.stop>
						<!-- Close Button -->
						<button @click="closeVideoModal" class="video-modal-close" aria-label="Close video" type="button">
							×
						</button>

						<!-- Video Content -->
						<div class="video-modal-content">
							<!-- Local Video (MP4) -->
							<video v-if="isModalOpen" ref="videoPlayer" controls autoplay class="video-player">
								<source src="/videos/welcome.mp4" type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

const { locale, localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);

// Modal state
const isModalOpen = ref(false);
const videoPlayer = ref<HTMLVideoElement | null>(null);

// Open video modal
const openVideoModal = () => {
	isModalOpen.value = true;
	// Prevent body scroll when modal is open
	document.body.style.overflow = "hidden";
};

// Close video modal
const closeVideoModal = () => {
	isModalOpen.value = false;
	// Re-enable body scroll
	document.body.style.overflow = "";
	// Stop video playback
	if (videoPlayer.value) {
		videoPlayer.value.pause();
		videoPlayer.value.currentTime = 0;
	}
};

// Handle ESC key to close modal
const handleEscKey = (event: KeyboardEvent) => {
	if (event.key === "Escape" && isModalOpen.value) {
		closeVideoModal();
	}
};

// Add keyboard listener
if (typeof window !== "undefined") {
	window.addEventListener("keydown", handleEscKey);
}

// Cleanup on component unmount
onBeforeUnmount(() => {
	if (typeof window !== "undefined") {
		window.removeEventListener("keydown", handleEscKey);
	}
	// Ensure body scroll is re-enabled
	document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
// Video Area Section
.video-area-section {
	position: relative;
	padding: 210px 0;
	background-image: url(/img/bg/bg-image-14.webp);
	mask-image: url(/img/bg/mask-01.png);
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	isolation: isolate;
	z-index: 1;
	-webkit-mask-repeat: no-repeat;
	-webkit-mask-size: cover;
	-webkit-mask-position: bottom;

	// Responsive padding
	@media (max-width: 991px) {
		padding: 150px 0 200px;
	}

	@media (max-width: 767px) {
		padding: 120px 0 150px;
	}

	// Dark overlay (60% black)
	&::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: -1;
	}
}

// Video Banner Content
.video-banner-content {
	text-align: center;
}

// Video Button Container
.video-btn {
	margin-bottom: 100px;

	@media (max-width: 767px) {
		margin-bottom: 70px;
	}
}

// Video Play Button with Ripple Animation
.video-play-btn {
	position: relative;
	border: 0;
	width: 80px;
	height: 80px;
	line-height: 82px; // Optical centering
	transition: all 1s cubic-bezier(0, 0, 0.2, 1);
	border-radius: 50%;
	background: var(--color-secondary); // Coral/pink
	margin: 0 auto;
	display: inline-block;
	font-size: 24px;
	text-align: center;
	color: var(--color-white);
	cursor: pointer;

	// Icon optical centering
	i {
		[dir="ltr"] & {
			margin-left: 5px;
		}

		[dir="rtl"] & {
			margin-right: 5px;
		}
	}

	// First ripple (::before)
	&::before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		transition: var(--transition);
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.3);
		animation: ripple 2s linear infinite;
	}

	// Second ripple (::after) - delayed by 1s
	&::after {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		transition: var(--transition);
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.3);
		animation: ripple 2s linear 1s infinite;
	}

	// Hover effect
	&:hover {
		transform: scale(1.1);
	}

	// Focus styles for accessibility
	&:focus-visible {
		outline: 2px solid white;
		outline-offset: 4px;
	}
}

// Ripple Keyframe Animation
@keyframes ripple {
	0% {
		transform: scale(1);
		opacity: 1;
	}

	75% {
		transform: scale(1.75);
		opacity: 1;
	}

	100% {
		transform: scale(2);
		opacity: 0;
	}
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {

	.video-play-btn::before,
	.video-play-btn::after {
		animation: none !important;
	}
}

// Title
.title {
	font-weight: 700;
	font-size: 48px;
	line-height: 1.25;
	color: var(--color-white);
	margin-bottom: 0;

	@media (max-width: 1023px) {
		font-size: 42px;
	}

	@media (max-width: 767px) {
		font-size: 36px;
	}

	@media (max-width: 639px) {
		font-size: 30px;
	}

	@media (max-width: 479px) {
		font-size: 28px;
	}
}

// ============================================
// Video Modal Styles
// ============================================

.video-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
}

.video-modal-container {
	position: relative;
	width: 100%;
	max-width: 900px;
	background: #000;
	border-radius: 8px;
	overflow: hidden;
}

.video-modal-close {
	position: absolute;
	top: -40px;
	right: 0;
	background: transparent;
	border: none;
	color: white;
	font-size: 40px;
	line-height: 1;
	cursor: pointer;
	padding: 0;
	width: 40px;
	height: 40px;
	z-index: 10;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.1);
	}

	&:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}
}

.video-modal-content {
	position: relative;
	width: 100%;
	padding-top: 56.25%; // 16:9 aspect ratio
	background: #000;
}

.video-player {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: none;
}

// Modal fade transition
.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	opacity: 0;
}
</style>
