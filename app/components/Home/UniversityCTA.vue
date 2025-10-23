<template>
	<div :dir="direction" class="university-cta-section edu-cta-banner-area">
		<!-- Main Content Container -->
		<div class="max-w-7xl mx-auto">
			<div class="edu-cta-banner">
				<!-- Centered Grid Row -->
				<div class="flex justify-center">
					<!-- Column (58.33% width on desktop) -->
					<div class="w-full lg:w-7/12">
						<!-- Section Title -->
						<div class="section-title section-center">
							<h2 class="title">
								{{ $t("ctaBanner.titlePart1") }}
								<span class="color-primary">{{
									$t("ctaBanner.titleHighlight")
								}}</span>
								{{ $t("ctaBanner.titlePart2") }}
							</h2>

							<!-- CTA Button -->
							<NuxtLink to="/contact" class="edu-btn btn-secondary group">
								{{ $t("ctaBanner.buttonText") }}
								<i class="icon-4"></i>
							</NuxtLink>
						</div>
					</div>
				</div>

				<!-- Parallax Shapes (4 shapes - hidden on mobile/tablet) -->
				<ul class="shape-group">
					<!-- Shape 1: Top-left (shape-10.png) -->
					<li class="shape-01 scene" ref="scene1">
						<img data-depth="2.5" src="/img/cta/shape-10.png" alt="Decorative Shape" loading="lazy" />
					</li>

					<!-- Shape 2: Bottom-left (shape-09.png) -->
					<li class="shape-02 scene" ref="scene2">
						<img data-depth="-2.5" src="/img/cta/shape-09.png" alt="Decorative Shape" loading="lazy" />
					</li>

					<!-- Shape 3: Top-right (shape-08.png) -->
					<li class="shape-03 scene" ref="scene3">
						<img data-depth="-2" src="/img/cta/shape-08.png" alt="Decorative Shape" loading="lazy" />
					</li>

					<!-- Shape 4: Top-right outer (shape-13.png) -->
					<li class="shape-04 scene" ref="scene4">
						<img data-depth="2" src="/img/about/shape-13.png" alt="Decorative Shape" loading="lazy" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import Parallax from "parallax-js";

const { locale, localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);

// Refs for parallax scenes
const scene1 = ref<HTMLElement | null>(null);
const scene2 = ref<HTMLElement | null>(null);
const scene3 = ref<HTMLElement | null>(null);
const scene4 = ref<HTMLElement | null>(null);

// Store parallax instances for cleanup
let parallaxInstances: Parallax[] = [];

onMounted(() => {
	// Initialize Parallax.js for mouse movement effects
	const initParallax = (element: HTMLElement | null) => {
		if (element) {
			const instance = new Parallax(element, {
				relativeInput: false, // Absolute mouse position
				hoverOnly: false, // Always active
			});
			parallaxInstances.push(instance);
		}
	};

	// Initialize parallax for each scene
	initParallax(scene1.value);
	initParallax(scene2.value);
	initParallax(scene3.value);
	initParallax(scene4.value);
});

onBeforeUnmount(() => {
	// Cleanup parallax instances
	parallaxInstances.forEach((instance) => {
		if (instance && typeof instance.destroy === "function") {
			instance.destroy();
		}
	});
	parallaxInstances = [];
});
</script>

<style lang="scss" scoped>
// University CTA Banner Section
.university-cta-section {
	position: relative;
	padding: 102px 0;
	background-color: #f7f5f2; // Warm beige/cream
	overflow: hidden;
	isolation: isolate; // Create stacking context
	z-index: 1;

	// Responsive padding
	@media (max-width: 991px) {
		padding: 80px 0 70px;
	}

	@media (max-width: 767px) {
		padding: 80px 0 70px;
	}

	// Background SVG pattern with CSS filter
	&::before {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-image: url(/img/cta/cta.svg);
		background-position: center bottom;
		background-repeat: no-repeat;
		background-size: cover;
		filter: brightness(0) saturate(100%) invert(90%) sepia(23%) saturate(5531%) hue-rotate(343deg) brightness(101%) contrast(94%);
		z-index: 0;
	}
}

// Inner banner container
.edu-cta-banner {
	position: relative;
	z-index: 1;
}

// Section Title
.section-title {
	text-align: center;
	margin: 0 auto;
	margin-bottom: 0; // Override default

	.title {
		font-family: var(--font-primary); // Spartan
		font-weight: 700;
		font-size: 36px;
		line-height: 1.25;
		color: var(--color-heading);
		margin-bottom: 28px;

		@media (max-width: 1199px) {
			font-size: 48px;
		}

		@media (max-width: 991px) {
			font-size: 42px;
		}

		@media (max-width: 767px) {
			font-size: 36px;
		}

		@media (max-width: 639px) {
			font-size: 32px;
		}

		@media (max-width: 479px) {
			font-size: 28px;
		}

		.color-primary {
			color: var(--color-primary); // Teal highlight
		}
	}
}

// CTA Button
.edu-btn {
	display: inline-block;
	font-family: var(--font-secondary); // Poppins
	font-weight: 600;
	font-size: 18px;
	padding: 0 35px;
	height: 70px;
	line-height: 70px;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	position: relative;
	overflow: hidden;
	z-index: 1;
	text-decoration: none;

	@media (max-width: 1023px) {
		font-size: 16px;
		padding: 0 30px;
		height: 60px;
		line-height: 60px;
	}

	@media (max-width: 767px) {
		font-size: 15px;
		padding: 0 25px;
		height: 55px;
		line-height: 55px;
	}

	@media (max-width: 479px) {
		font-size: 14px;
		padding: 0 20px;
		height: 50px;
		line-height: 50px;
	}

	&.btn-secondary {
		background-color: var(--color-secondary); // Coral/pink
		color: var(--color-white);

		// Slide-in background effect (::after)
		&::after {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: var(--color-heading); // Dark background
			z-index: -1;
			transform: scaleX(0);
			transform-origin: right;
			transition: transform 0.4s ease;
		}

		// Hover effects
		&:hover {
			color: var(--color-white);
			border-radius: 5px 30px; // Morph top-right corner

			&::after {
				transform: scaleX(1);
				transform-origin: left;
			}

			// Icon shift
			i {
				[dir="ltr"] & {
					transform: translateX(4px);
				}

				[dir="rtl"] & {
					transform: translateX(-4px);
				}
			}
		}
	}

	// Icon styling
	i {
		[dir="ltr"] & {
			margin-left: 8px;
		}

		[dir="rtl"] & {
			margin-right: 8px;
		}

		font-size: 14px;
		transition: transform 0.3s ease;
	}
}

// Shape Group (4 parallax shapes)
.shape-group {
	list-style: none;
	padding: 0;
	margin: 0;

	// Hide shapes on mobile and tablet
	@media (max-width: 991px) {
		display: none;
	}

	li {
		position: absolute;
		z-index: -1;

		img {
			position: initial;
			transition: transform 0.1s ease-out;
			// Hardware acceleration for smooth parallax
			transform: translate3d(0, 0, 0);
			will-change: transform;
			backface-visibility: hidden;
		}

		// Shape 1: Top-left (shape-10.png)
		&.shape-01 {
			top: 109px;

			[dir="ltr"] & {
				left: -68px;
			}

			[dir="rtl"] & {
				right: -68px;
			}
		}

		// Shape 2: Bottom-left (shape-09.png)
		&.shape-02 {
			bottom: 29px;

			[dir="ltr"] & {
				left: 11px;
			}

			[dir="rtl"] & {
				right: 11px;
			}
		}

		// Shape 3: Top-right (shape-08.png)
		&.shape-03 {
			top: -61px;
			z-index: 0; // In front of background, behind other shapes

			[dir="ltr"] & {
				right: -168px;
			}

			[dir="rtl"] & {
				left: -168px;
			}
		}

		// Shape 4: Top-right outer (shape-13.png)
		&.shape-04 {
			top: -126px;

			[dir="ltr"] & {
				right: -118px;
			}

			[dir="rtl"] & {
				left: -118px;
			}
		}
	}
}
</style>
