<template>
	<div :dir="direction" class="campus-section edu-campus-area">
		<!-- Main Content Container -->
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 xl:grid-cols-12 gap-12">
				<!-- Left Column: Campus Image Gallery (7/12 = 58.33%) -->
				<div
					class="xl:col-span-7"
					data-sal="slide-right"
					data-sal-delay="50"
					data-sal-duration="800"
				>
					<div class="campus-image-gallery">
						<!-- Main Campus Image -->
						<div class="campus-thumbnail">
							<div class="thumbnail">
								<img
									src="/img/about/campus-01.webp"
									alt="Campus"
					loading="lazy"
								/>
							</div>

							<!-- Book Trial Session Button -->
							<div class="campus-button-wrapper">
								<button class="btn-trial-session">
									{{ $t("campusSection.bookTrialSession") }}
								</button>
							</div>
						</div>

						<!-- Islamic Parallax Shapes Group (Image Side - 3 shapes) -->
						<ul class="shape-group">
							<!-- Shape 1: Large Circle (CSS - Keep for visual balance) -->
							<li class="shape-1 scene" ref="scene1">
								<span data-depth=".8"></span>
							</li>

							<!-- Shape 2: Islamic Decorative (shape-51) -->
							<li class="shape-2 scene" ref="scene2">
								<img
									data-depth="1.5"
									src="/img/islamic-shapes/decorative/shape-51.png"
									alt="Islamic Decoration"
								/>
							</li>

							<!-- Shape 3: Islamic Ornamental (shape-52) -->
							<li class="shape-3 scene" ref="scene3">
								<img
									data-depth="-1.5"
									src="/img/islamic-shapes/decorative/shape-52.png"
									alt="Islamic Ornament"
								/>
							</li>
						</ul>
					</div>
				</div>

				<!-- Right Column: Campus Content (5/12 = 41.67%) -->
				<div
					class="xl:col-span-5"
					data-sal="slide-left"
					data-sal-delay="50"
					data-sal-duration="800"
				>
					<div class="campus-content">
						<div class="inner">
							<!-- Section Title -->
							<div class="section-title section-left mb-9">
								<span class="pre-title">{{ $t("campusSection.preTitle") }}</span>
								<h2 class="title">{{ $t("campusSection.title") }}</h2>
								<span class="shape-line">
									<i class="icon-19"></i>
								</span>
							</div>

							<!-- Features List -->
							<div class="features-list">
								<!-- Feature Box 1: Student Life (Secondary Color) -->
								<div class="features-box color-secondary-style">
									<div class="icon">
										<i class="icon-37"></i>
									</div>
									<div class="content">
										<h5 class="title">
											{{ $t("campusSection.features.studentLife.title") }}
										</h5>
										<p>
											{{
												$t("campusSection.features.studentLife.description")
											}}
										</p>
									</div>
								</div>

								<!-- Feature Box 2: Arts & Clubs (Primary Color) -->
								<div class="features-box color-primary-style">
									<div class="icon">
										<i class="icon-38"></i>
									</div>
									<div class="content">
										<h5 class="title">
											{{ $t("campusSection.features.artsClubs.title") }}
										</h5>
										<p>
											{{ $t("campusSection.features.artsClubs.description") }}
										</p>
									</div>
								</div>

								<!-- Feature Box 3: Sports & Fitness (Extra05 Color) -->
								<div class="features-box color-extra05-style">
									<div class="icon">
										<i class="icon-39 fitness-icon"></i>
									</div>
									<div class="content">
										<h5 class="title">
											{{ $t("campusSection.features.sportsFitness.title") }}
										</h5>
										<p>
											{{
												$t("campusSection.features.sportsFitness.description")
											}}
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Islamic Parallax Shapes Group (Content Side - 3 shapes) -->
						<ul class="shape-group">
							<!-- Shape 4: Circle (CSS - Keep for visual balance) -->
							<li class="shape-4 scene" ref="scene4">
								<span data-depth=".8"></span>
							</li>

							<!-- Shape 5: Filled Circle (CSS - Keep for visual balance) -->
							<li class="shape-5 scene" ref="scene5">
								<span data-depth="2"></span>
							</li>

							<!-- Shape 6: Islamic Pattern (shape-18) -->
							<li class="shape-6 scene" ref="scene6">
								<img data-depth="-2" src="/img/islamic-shapes/decorative/shape-18.png" alt="Islamic Pattern" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

const { locale, localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);

// Refs for parallax scenes
const scene1 = ref<HTMLElement | null>(null);
const scene2 = ref<HTMLElement | null>(null);
const scene3 = ref<HTMLElement | null>(null);
const scene4 = ref<HTMLElement | null>(null);
const scene5 = ref<HTMLElement | null>(null);
const scene6 = ref<HTMLElement | null>(null);

// Parallax effect implementation (no external library)
let parallaxCleanup: (() => void)[] = [];

const initParallax = (element: HTMLElement | null) => {
	if (!element) return;

	const handleMouseMove = (e: MouseEvent) => {
		const child = element.querySelector("[data-depth]") as HTMLElement;
		if (!child) return;

		const depth = parseFloat(child.getAttribute("data-depth") || "0");
		const rect = element.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		const moveX = (mouseX / window.innerWidth) * depth * 20;
		const moveY = (mouseY / window.innerHeight) * depth * 20;

		child.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
	};

	document.addEventListener("mousemove", handleMouseMove);
	parallaxCleanup.push(() => {
		document.removeEventListener("mousemove", handleMouseMove);
	});
};

// Intersection Observer for scroll animations
const initScrollAnimations = () => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const element = entry.target as HTMLElement;
					const animation = element.getAttribute("data-sal");
					const delay = element.getAttribute("data-sal-delay") || "0";
					const duration = element.getAttribute("data-sal-duration") || "800";

					element.style.transitionDelay = `${delay}ms`;
					element.style.transitionDuration = `${duration}ms`;

					if (animation === "slide-right") {
						element.style.opacity = "1";
						element.style.transform = "translateX(0)";
					} else if (animation === "slide-left") {
						element.style.opacity = "1";
						element.style.transform = "translateX(0)";
					}

					observer.unobserve(element);
				}
			});
		},
		{ threshold: 0.1 }
	);

	// Observe all elements with data-sal attribute
	document.querySelectorAll("[data-sal]").forEach((el) => {
		const element = el as HTMLElement;
		const animation = element.getAttribute("data-sal");

		// Set initial state
		element.style.opacity = "0";
		element.style.transition = "opacity 800ms ease, transform 800ms ease";

		if (animation === "slide-right") {
			element.style.transform = "translateX(-50px)";
		} else if (animation === "slide-left") {
			element.style.transform = "translateX(50px)";
		}

		observer.observe(element);
	});

	return () => observer.disconnect();
};

onMounted(() => {
	// Initialize scroll animations
	const cleanupScrollAnimations = initScrollAnimations();
	parallaxCleanup.push(cleanupScrollAnimations);

	// Initialize parallax for each scene
	initParallax(scene1.value);
	initParallax(scene2.value);
	initParallax(scene3.value);
	initParallax(scene4.value);
	initParallax(scene5.value);
	initParallax(scene6.value);
});

onBeforeUnmount(() => {
	// Cleanup all event listeners and observers
	parallaxCleanup.forEach((cleanup) => cleanup());
	parallaxCleanup = [];
});
</script>

<style lang="scss" scoped>
// Main section
.campus-section {
	position: relative;
	padding: 90px 0;
	overflow: hidden;

	@media (max-width: 991px) {
		padding: 70px 0;
	}

	@media (max-width: 767px) {
		padding: 60px 0;
	}
}

// Campus Image Gallery
.campus-image-gallery {
	position: relative;

	.campus-thumbnail {
		.thumbnail {
			img {
				border-radius: 5px;
				width: 100%;
				height: auto;

				@media (max-width: 1024px) {
					width: 100%;
				}
			}
		}
	}

	// Image Gallery Shapes (3 shapes)
	.shape-group {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			position: absolute;
			z-index: -1;

			img {
				position: initial;
				transition: transform 0.1s ease-out;
			}

			// Shape 1: Large Circle (470×470px border-only)
			&.shape-1 {
				z-index: -1;
				bottom: -220px;

				[dir="ltr"] & {
					left: -235px;
				}

				[dir="rtl"] & {
					right: -235px;
				}

				span {
					display: block;
					height: 470px;
					width: 470px;
					border: 1px solid var(--color-border);
					border-radius: 50%;
				}
			}

			// Shape 2: PNG Image (shape-21.png)
			&.shape-2 {
				bottom: -84px;

				[dir="ltr"] & {
					left: -144px;
				}

				[dir="rtl"] & {
					right: -144px;
				}
			}

			// Shape 3: PNG Image (shape-13.png)
			&.shape-3 {
				bottom: -118px;

				[dir="ltr"] & {
					left: -85px;
				}

				[dir="rtl"] & {
					right: -85px;
				}
			}
		}
	}
}

// Campus Content Box (Overlapping Design)
.campus-content {
	position: relative;
	box-shadow: var(--shadow-darker);
	background-color: var(--color-white);
	margin-top: 90px;
	padding: 60px 50px 60px 70px;

	// Asymmetric border radius (no top-left corner)
	[dir="ltr"] & {
		border-radius: 0 5px 5px 5px;
	}

	[dir="rtl"] & {
		border-radius: 5px 0 5px 5px;
	}

	// Overlapping effect
	@media (min-width: 1280px) {
		[dir="ltr"] & {
			margin-left: -120px;
		}

		[dir="rtl"] & {
			margin-right: -120px;
		}
	}

	@media (max-width: 1279px) {
		margin-top: 20px;
		padding: 50px 40px;
	}

	@media (max-width: 575px) {
		box-shadow: none;
		padding: 0;
		margin-top: 20px;
	}

	// Content Side Shapes (3 shapes)
	.shape-group {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			position: absolute;

			img {
				position: initial;
				transition: transform 0.1s ease-out;
			}

			// Shape 4: Circle (320×320px border)
			&.shape-4 {
				z-index: -1;
				top: -140px;

				[dir="ltr"] & {
					right: -158px;
				}

				[dir="rtl"] & {
					left: -158px;
				}

				span {
					display: block;
					height: 320px;
					width: 320px;
					border: 1px solid var(--color-border);
					border-radius: 50%;
				}
			}

			// Shape 5: Filled Circle (150×150px)
			&.shape-5 {
				top: -33px;
				z-index: -1;

				[dir="ltr"] & {
					right: -64px;
				}

				[dir="rtl"] & {
					left: -64px;
				}

				span {
					display: block;
					height: 150px;
					width: 150px;
					border-radius: 100%;
					background: #f3f8fa;
				}
			}

			// Shape 6: PNG Image (shape-25.png)
			&.shape-6 {
				top: -80px;
				z-index: 0;

				[dir="ltr"] & {
					right: -28px;
				}

				[dir="rtl"] & {
					left: -28px;
				}
			}
		}
	}
}

// Section Title
.section-title {
	margin-bottom: 34px;

	.pre-title {
		display: inline-block;
		font-weight: 700;
		font-size: 14px;
		text-transform: uppercase;
		color: var(--color-body);
		letter-spacing: 1px;
		margin-bottom: 12px;
	}

	.title {
		font-size: 40px;
		font-weight: 700;
		color: var(--color-heading);
		line-height: 1.3;
		margin: 0;

		@media (max-width: 1279px) {
			font-size: 36px;
		}

		@media (max-width: 1023px) {
			font-size: 32px;
		}

		@media (max-width: 767px) {
			font-size: 28px;
		}

		@media (max-width: 479px) {
			font-size: 24px;
		}
	}

	.shape-line {
		display: inline-block;
		margin-top: 8px;
		color: var(--color-primary);
		font-size: 14px;
	}
}

// Features List
.features-list {
	.features-box {
		background-color: transparent;
		box-shadow: none;
		padding: 0;
		display: flex;
		align-items: flex-start;
		text-align: left;
		margin-bottom: 24px;

		&:last-child {
			margin-bottom: 0;
		}

		.icon {
			font-size: 48px;
			height: 80px;
			width: 80px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			transition: var(--transition);

			[dir="ltr"] & {
				margin-right: 20px;
			}

			[dir="rtl"] & {
				margin-left: 20px;
			}

			.fitness-icon {
				font-size: 32px;
			}
		}

		.content {
			flex: 1;

			.title {
				font-size: 20px;
				font-weight: 600;
				color: var(--color-heading);
				margin-bottom: 12px;
				transition: var(--transition);
			}

			p {
				color: var(--color-body);
				margin-bottom: 0;
				line-height: 1.7;
				font-size: 15px;
				transition: var(--transition);
			}
		}

		// Secondary Color Style (Pink/Red)
		&.color-secondary-style {
			.icon {
				background-color: rgba(238, 74, 98, 0.1);
				color: var(--color-secondary);

				&:after {
					background-color: var(--color-secondary);
				}
			}

			&:hover {
				.icon {
					background-color: var(--color-secondary);
					color: var(--color-white);
				}
			}
		}

		// Primary Color Style (Teal/Green)
		&.color-primary-style {
			.icon {
				background-color: rgba(26, 182, 157, 0.1);
				color: var(--color-primary);

				&:after {
					background-color: var(--color-primary);
				}
			}

			&:hover {
				.icon {
					background-color: var(--color-primary);
					color: var(--color-white);
				}
			}
		}

		// Extra05 Color Style (Orange)
		&.color-extra05-style {
			.icon {
				background-color: rgba(248, 148, 31, 0.1);
				color: var(--color-extra05);

				&:after {
					background-color: var(--color-extra05);
				}
			}

			&:hover {
				.icon {
					background-color: var(--color-extra05);
					color: var(--color-white);
				}
			}
		}
	}
}

// Campus Button Wrapper
.campus-button-wrapper {
	margin-top: 24px;
	display: flex;
	justify-content: center;

	@media (max-width: 767px) {
		margin-top: 20px;
	}

	.btn-trial-session {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 16px 32px;
		font-size: 16px;
		font-weight: 600;
		color: var(--color-white);
		background-color: var(--color-primary);
		border: 2px solid var(--color-primary);
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: capitalize;
		letter-spacing: 0.5px;
		box-shadow: 0 4px 12px rgba(26, 182, 157, 0.2);

		&:hover {
			background-color: transparent;
			color: var(--color-primary);
			transform: translateY(-2px);
			box-shadow: 0 6px 16px rgba(26, 182, 157, 0.3);
		}

		&:active {
			transform: translateY(0);
			box-shadow: 0 2px 8px rgba(26, 182, 157, 0.2);
		}

		@media (max-width: 767px) {
			padding: 14px 28px;
			font-size: 15px;
		}

		@media (max-width: 479px) {
			padding: 12px 24px;
			font-size: 14px;
			width: 100%;
		}
	}
}
</style>
