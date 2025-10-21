<template>
	<div :dir="direction" class="about-section edu-about-area about-style-3">
		<!-- Main Content Container -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
				<!-- Left Column: Content Area -->
				<div class="content-column" data-sal="slide-right" data-sal-delay="50" data-sal-duration="800">
					<div class="about-content">
						<!-- Section Title -->
						<div class="section-title section-left mb-6 md:mb-9">
							<span class="pre-title">{{ $t("aboutSection.preTitle") }}</span>
							<h2 class="title">
								{{ $t("aboutSection.titlePart1") }}
								<span class="color-primary">{{
									$t("aboutSection.titleHighlight")
								}}</span>
								{{ $t("aboutSection.titlePart2") }}
							</h2>
							<span class="shape-line">
								<i class="icon-19"></i>
							</span>
						</div>

						<!-- Custom Tab Navigation -->
						<div class="custom-tabs-wrapper">
							<div class="nav-tabs" role="tablist">
								<button v-for="(tabItem, index) in tabsData" :key="tabItem.value"
									:class="['nav-link', { active: activeTab === tabItem.value }]"
									:aria-selected="activeTab === tabItem.value" role="tab" @click="activeTab = tabItem.value">
									{{ $t(`aboutSection.tabs.${tabItem.value}.title`) }}
								</button>
							</div>

							<!-- Tab Content -->
							<div class="tab-content">
								<Transition name="tab-fade" mode="out-in">
									<div v-if="activeTab === 'about'" key="about" class="tab-pane" role="tabpanel">
										<p class="description">
											{{ $t("aboutSection.tabs.about.description") }}
										</p>
										<ul class="features-list">
											<li>{{ $t("aboutSection.tabs.about.feature1") }}</li>
											<li>{{ $t("aboutSection.tabs.about.feature2") }}</li>
										</ul>
									</div>
									<div v-else-if="activeTab === 'mission'" key="mission" class="tab-pane" role="tabpanel">
										<p class="description">
											{{ $t("aboutSection.tabs.mission.description") }}
										</p>
										<ul class="features-list">
											<li>{{ $t("aboutSection.tabs.mission.feature1") }}</li>
											<li>{{ $t("aboutSection.tabs.mission.feature2") }}</li>
										</ul>
									</div>
									<div v-else-if="activeTab === 'vision'" key="vision" class="tab-pane" role="tabpanel">
										<p class="description">
											{{ $t("aboutSection.tabs.vision.description") }}
										</p>
										<ul class="features-list">
											<li>{{ $t("aboutSection.tabs.vision.feature1") }}</li>
											<li>{{ $t("aboutSection.tabs.vision.feature2") }}</li>
										</ul>
									</div>
								</Transition>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column: Image Gallery -->
				<div class="image-column">
					<div class="about-image-gallery">
						<!-- Main Image 1 -->
						<img class="main-img-1" data-sal="slide-right" data-sal-delay="100" data-sal-duration="800"
							src="/img/about/about-04.webp" alt="About Al-Amal Education" loading="lazy" />

						<!-- Main Image 2 (Overlapping) -->
						<img class="main-img-2" data-sal="slide-left" data-sal-delay="100" data-sal-duration="800"
							src="/img/about/about-05.webp" alt="Islamic Education" loading="lazy" />

						<!-- Islamic Decorative Shapes -->
						<ul class="shape-group">
							<!-- Shape 1: Islamic Decorative (shape-51) -->
							<li class="shape-1 scene" ref="scene1">
								<img data-depth="1" src="/img/islamic-shapes/decorative/shape-17.png" alt="Islamic Decoration" />
							</li>

							<!-- Shape 2: Islamic Ornamental (shape-52) -->
							<li class="shape-2 scene" ref="scene2">
								<img data-depth="-1" src="/img/islamic-shapes/decorative/shape-51.png" alt="Islamic Ornament" />
							</li>

							<!-- Shape 3: Islamic Pattern (shape-17) -->
							<li class="shape-3 scene" ref="scene3">
								<img data-depth="1.5" src="/img/islamic-shapes/decorative/shape-52.png" alt="Islamic Pattern" />
							</li>

							<!-- Shape 4: Circle (Keep as decorative element) -->
							<li class="shape-4">
								<span></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Outer Islamic Decorative Shapes -->
		<ul class="shape-group outer-shapes">
			<li class="shape-5">
				<img class="rotateit" src="/img/islamic-shapes/decorative/shape-18.png" alt="Islamic Decoration" />
			</li>
			<li class="shape-6">
				<span></span>
			</li>
			<li class="shape-7">
				<img src="/img/islamic-shapes/banner/lamp-shape.png" alt="Islamic Decoration" />
			</li>
		</ul>

		<!-- Statistics Section -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 statistics-section">
			<div class="statistics-grid">
				<div class="statistic-div" v-for="statistic in animatedStats" :key="statistic.id">
					<div :style="{ color: statistic.color }" class="value-Stat">
						{{ statistic.displayValue }}
					</div>
					<div class="title-Stat">{{ $t(statistic.titleKey) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import Parallax from "parallax-js";
import "sal.js/dist/sal.css";

const { locale, localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);

// Active tab state
const activeTab = ref("about");

// Refs for parallax scenes
const scene1 = ref<HTMLElement | null>(null);
const scene2 = ref<HTMLElement | null>(null);
const scene3 = ref<HTMLElement | null>(null);

// Store parallax instances for cleanup
let parallaxInstances: Parallax[] = [];

// Tab data
interface TabData {
	value: string;
	features: string[];
}

const tabsData: TabData[] = [
	{
		value: "about",
		features: [
			"aboutSection.tabs.about.feature1",
			"aboutSection.tabs.about.feature2",
		],
	},
	{
		value: "mission",
		features: [
			"aboutSection.tabs.mission.feature1",
			"aboutSection.tabs.mission.feature2",
		],
	},
	{
		value: "vision",
		features: [
			"aboutSection.tabs.vision.feature1",
			"aboutSection.tabs.vision.feature2",
		],
	},
];

// Statistics Data
interface StatisticsData {
	id: number;
	value: number;
	suffix?: string;
	titleKey: string;
	color: string;
}

const statisticsData: StatisticsData[] = [
	{
		id: 1,
		titleKey: "statistics.studentEnrolled",
		value: 29300,
		color: "#1AB69D",
		suffix: "k",
	},
	{
		id: 2,
		titleKey: "statistics.classCompleted",
		value: 32400,
		color: "#EE4A62",
		suffix: "k",
	},
	{
		id: 3,
		titleKey: "statistics.satisfactionRate",
		value: 100,
		color: "#8E56FF",
		suffix: "%",
	},
	{
		id: 4,
		titleKey: "statistics.topInstructors",
		value: 354,
		color: "#F8941F",
		suffix: "+",
	},
];

const animatedStats = ref(
	statisticsData.map((s) => ({
		...s,
		displayValue: 0 as number | string,
	}))
);

onMounted(() => {
	// Initialize Parallax.js for mouse movement effects
	const initParallax = (element: HTMLElement | null) => {
		if (element) {
			const instance = new Parallax(element, {
				relativeInput: false,
				hoverOnly: false,
			});
			parallaxInstances.push(instance);
		}
	};

	// Initialize parallax for each scene
	initParallax(scene1.value);
	initParallax(scene2.value);
	initParallax(scene3.value);

	// Animate statistics
	animatedStats.value.forEach((stat, index) => {
		let start = 0;
		const end = stat.value;
		const duration = 1500;
		const stepTime = 20;
		const increment = end / (duration / stepTime);

		const interval = setInterval(() => {
			start += increment;
			if (start >= end) {
				start = end;
				clearInterval(interval);
			}
			const formatted =
				stat.suffix === "k"
					? (start / 1000).toFixed(1) + "k"
					: Math.floor(start) + (stat.suffix || "");
			if (animatedStats.value[index]) {
				animatedStats.value[index].displayValue = formatted;
			}
		}, stepTime);
	});
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
@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

.rotateit {
	animation: rotate 10s linear infinite;
}

// Main section
.about-section {
	position: relative;
	padding: 60px 0 80px;
	overflow: hidden;
	isolation: isolate;

	@media (min-width: 768px) {
		padding: 80px 0;
	}

	@media (min-width: 992px) {
		padding: 90px 0 120px;
	}
}

// Content column
.content-column {
	margin-top: 0;

	@media (min-width: 1024px) {
		margin-top: 30px;
	}
}

// Section Title
.section-title {
	margin-bottom: 24px;

	@media (min-width: 768px) {
		margin-bottom: 34px;
	}

	.pre-title {
		display: inline-block;
		font-weight: 700;
		font-size: 12px;
		text-transform: uppercase;
		color: var(--color-body);
		letter-spacing: 1px;
		margin-bottom: 8px;

		@media (min-width: 768px) {
			font-size: 14px;
			margin-bottom: 12px;
		}
	}

	.title {
		font-size: 24px;
		font-weight: 700;
		color: var(--color-heading);
		line-height: 1.3;
		margin: 0;

		@media (min-width: 480px) {
			font-size: 28px;
		}

		@media (min-width: 768px) {
			font-size: 32px;
		}

		@media (min-width: 1024px) {
			font-size: 36px;
		}

		.color-primary {
			color: var(--color-primary);
		}
	}

	.shape-line {
		display: inline-block;
		margin-top: 8px;
		color: var(--color-primary);
		font-size: 14px;
	}
}

// Custom Tabs
.custom-tabs-wrapper {
	.nav-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.25rem;
		border-bottom: none;
		margin-bottom: 20px;

		@media (min-width: 768px) {
			margin-bottom: 30px;
			gap: 1rem 2rem;
		}

		.nav-link {
			position: relative;
			font-size: 14px;
			font-weight: 600;
			color: var(--color-heading);
			background: transparent;
			border: none;
			padding: 0 0 6px 0;
			cursor: pointer;
			transition: color 0.3s ease;

			@media (min-width: 480px) {
				font-size: 15px;
			}

			@media (min-width: 768px) {
				font-size: 17px;
				padding: 0 0 8px 0;
			}

			// Separator between tabs
			&:not(:last-child)::after {
				content: "";
				position: absolute;
				top: 2px;
				height: 12px;
				width: 2px;
				background-color: #e5e5e5;

				@media (min-width: 768px) {
					height: 14px;
				}

				[dir="ltr"] & {
					right: -12px;

					@media (min-width: 768px) {
						right: -18px;
					}
				}

				[dir="rtl"] & {
					left: -12px;

					@media (min-width: 768px) {
						left: -18px;
					}
				}
			}

			// Animated underline
			&::before {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				height: 2px;
				width: 0;
				background-color: var(--color-secondary);
				opacity: 0;
				transition: width 0.3s ease, opacity 0.3s ease;
			}

			&:hover,
			&.active {
				color: var(--color-secondary);

				&::before {
					width: 100%;
					opacity: 1;
				}
			}
		}
	}

	.tab-content {
		padding: 15px 0;
		position: relative;
		min-height: 200px;

		@media (min-width: 768px) {
			padding: 20px 0;
			min-height: 300px;
		}
	}

	// Vue Transition classes for fade effect
	.tab-fade-enter-active,
	.tab-fade-leave-active {
		transition: opacity 300ms ease-in-out;
	}

	.tab-fade-enter-from,
	.tab-fade-leave-to {
		opacity: 0;
	}

	.tab-fade-enter-to,
	.tab-fade-leave-from {
		opacity: 1;
	}

	.description {
		font-size: 14px;
		line-height: 1.7;
		color: #666;
		margin-bottom: 16px;

		@media (min-width: 768px) {
			font-size: 16px;
			line-height: 1.8;
			margin-bottom: 20px;
		}
	}

	.features-list {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			font-weight: 500;
			color: var(--color-heading);
			position: relative;
			margin-bottom: 10px;
			font-size: 14px;

			@media (min-width: 768px) {
				font-size: 16px;
				margin-bottom: 16px;
			}

			[dir="ltr"] & {
				padding-left: 30px;

				@media (min-width: 768px) {
					padding-left: 35px;
				}
			}

			[dir="rtl"] & {
				padding-right: 30px;

				@media (min-width: 768px) {
					padding-right: 35px;
				}
			}

			// Check icon
			&::before {
				content: "\e913";
				font-family: "icomoon";
				color: var(--color-secondary);
				font-size: 17px;
				position: absolute;
				top: -2px;

				@media (min-width: 768px) {
					font-size: 19px;
					top: -3px;
				}

				[dir="ltr"] & {
					left: 0;
				}

				[dir="rtl"] & {
					right: 0;
				}
			}
		}
	}
}

// Image Gallery
.about-image-gallery {
	position: relative;
	padding: 20px 0 40px;

	@media (min-width: 576px) {
		padding: 40px 0 50px;
	}

	@media (min-width: 992px) {
		padding: 80px 0 65px;
	}

	[dir="ltr"] & {
		padding-left: 0;

		@media (min-width: 992px) {
			padding-left: 30px;
		}
	}

	[dir="rtl"] & {
		padding-right: 0;

		@media (min-width: 992px) {
			padding-right: 30px;
		}
	}

	img {
		border-radius: 10px;
	}

	.main-img-1 {
		width: 100%;
		max-width: 390px;
		height: auto;
		display: block;
	}

	.main-img-2 {
		position: absolute;
		bottom: 0;
		width: 45%;
		max-width: 230px;
		display: none;

		@media (min-width: 576px) {
			display: block;
		}

		[dir="ltr"] & {
			right: 0;

			@media (min-width: 768px) and (max-width: 991px) {
				right: 20%;
			}
		}

		[dir="rtl"] & {
			left: 0;

			@media (min-width: 768px) and (max-width: 991px) {
				left: 20%;
			}
		}
	}

	// Inner decorative shapes
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
				max-width: 50px;

				@media (min-width: 768px) {
					max-width: 70px;
				}

				@media (min-width: 1024px) {
					max-width: none;
				}
			}

			&.shape-1 {
				top: -10px;

				@media (min-width: 768px) {
					top: -15px;
				}

				[dir="ltr"] & {
					right: 60px;

					@media (min-width: 768px) {
						right: 80px;
					}

					@media (min-width: 1024px) {
						right: 95px;
					}
				}

				[dir="rtl"] & {
					left: 60px;

					@media (min-width: 768px) {
						left: 80px;
					}

					@media (min-width: 1024px) {
						left: 95px;
					}
				}
			}

			&.shape-2 {
				top: 10px;
				z-index: -2;

				@media (min-width: 768px) {
					top: 13px;
				}

				[dir="ltr"] & {
					right: 30px;

					@media (min-width: 768px) {
						right: 35px;
					}

					@media (min-width: 1024px) {
						right: 39px;
					}
				}

				[dir="rtl"] & {
					left: 30px;

					@media (min-width: 768px) {
						left: 35px;
					}

					@media (min-width: 1024px) {
						left: 39px;
					}
				}
			}

			&.shape-3 {
				bottom: 25px;

				@media (min-width: 768px) {
					bottom: 33px;
				}

				[dir="ltr"] & {
					left: -2px;
				}

				[dir="rtl"] & {
					right: -2px;
				}
			}

			&.shape-4 {
				bottom: -20px;
				z-index: -1;
				display: none;

				@media (min-width: 768px) {
					display: block;
					bottom: -25px;
				}

				[dir="ltr"] & {
					right: 30px;

					@media (min-width: 1024px) {
						right: 40px;
					}
				}

				[dir="rtl"] & {
					left: 30px;

					@media (min-width: 1024px) {
						left: 40px;
					}
				}

				span {
					display: block;
					height: 200px;
					width: 200px;
					border: 1px solid var(--color-border);
					border-radius: 50%;

					@media (min-width: 768px) {
						height: 250px;
						width: 250px;
					}

					@media (min-width: 1024px) {
						height: 320px;
						width: 320px;
					}
				}
			}
		}
	}
}

// Outer decorative shapes
.outer-shapes {
	list-style: none;
	padding: 0;
	margin: 0;
	display: none;

	@media (min-width: 768px) {
		display: block;
	}

	li {
		position: absolute;
		z-index: 1;

		img {
			max-width: 50px;

			@media (min-width: 1024px) {
				max-width: 70px;
			}

			@media (min-width: 1200px) {
				max-width: none;
			}
		}

		&.shape-5 {
			top: 10px;

			@media (min-width: 1024px) {
				top: 15px;
			}

			@media (min-width: 1200px) {
				top: 20px;
			}

			[dir="ltr"] & {
				left: 20px;

				@media (min-width: 1024px) {
					left: 50px;
				}

				@media (min-width: 1200px) {
					left: 110px;
				}
			}

			[dir="rtl"] & {
				right: 20px;

				@media (min-width: 1024px) {
					right: 50px;
				}

				@media (min-width: 1200px) {
					right: 110px;
				}
			}
		}

		&.shape-7 {
			top: 14px;

			@media (min-width: 1024px) {
				top: 19px;
			}

			@media (min-width: 1200px) {
				top: 24px;
			}

			[dir="ltr"] & {
				right: 20px;

				@media (min-width: 1024px) {
					right: 60px;
				}

				@media (min-width: 1200px) {
					right: 120px;
				}
			}

			[dir="rtl"] & {
				left: 20px;

				@media (min-width: 1024px) {
					left: 60px;
				}

				@media (min-width: 1200px) {
					left: 120px;
				}
			}
		}

		&.shape-6 {
			top: -250px;

			@media (min-width: 1200px) {
				top: -350px;
			}

			[dir="ltr"] & {
				left: 40px;

				@media (min-width: 1200px) {
					left: 80px;
				}
			}

			[dir="rtl"] & {
				right: 40px;

				@media (min-width: 1200px) {
					right: 80px;
				}
			}

			span {
				display: block;
				height: 300px;
				width: 300px;
				border: 1px solid var(--color-border);
				border-radius: 50%;

				@media (min-width: 1024px) {
					height: 400px;
					width: 400px;
				}

				@media (min-width: 1200px) {
					height: 470px;
					width: 470px;
				}
			}
		}
	}
}

// Statistics Section
.statistics-section {
	margin-top: 3rem;

	@media (min-width: 768px) {
		margin-top: 4rem;
	}

	.statistics-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		justify-items: center;

		@media (min-width: 480px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(4, 1fr);
			gap: 1.5rem;
		}

		@media (min-width: 1280px) {
			gap: 2rem;
		}
	}

	.statistic-div {
		width: 100%;
		max-width: 280px;
		height: 110px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		transition: transform 0.3s ease, box-shadow 0.3s ease;

		@media (min-width: 640px) {
			height: 130px;
		}

		@media (min-width: 768px) {
			height: 140px;
		}

		@media (min-width: 1024px) {
			max-width: none;
			height: 150px;
		}

		&:hover {
			transform: translateY(-5px);
			box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 16px;
		}

		.value-Stat {
			font-size: 1.5rem;
			font-weight: 700;

			@media (min-width: 640px) {
				font-size: 1.75rem;
			}

			@media (min-width: 768px) {
				font-size: 2rem;
			}
		}

		.title-Stat {
			font-size: 0.8rem;
			color: #666;
			text-align: center;
			margin-top: 0.5rem;
			padding: 0 0.5rem;

			@media (min-width: 640px) {
				font-size: 0.85rem;
			}

			@media (min-width: 768px) {
				font-size: 0.9rem;
			}
		}
	}
}
</style>
