<template>
	<div :dir="direction" class="about-section edu-about-area about-style-3">
		<!-- Main Content Container -->
		<div class="max-w-7xl mx-auto">
			<div
				class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
			>
				<!-- Left Column: Content Area -->
				<div
					class="content-column"
					data-sal="slide-right"
					data-sal-delay="50"
					data-sal-duration="800"
				>
					<div class="about-content">
						<!-- Section Title -->
						<div class="section-title section-left mb-9">
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
								<button
									v-for="(tabItem, index) in tabsData"
									:key="tabItem.value"
									:class="['nav-link', { active: activeTab === tabItem.value }]"
									:aria-selected="activeTab === tabItem.value"
									role="tab"
									@click="activeTab = tabItem.value"
								>
									{{ $t(`aboutSection.tabs.${tabItem.value}.title`) }}
								</button>
							</div>

							<!-- Tab Content -->
							<div class="tab-content">
								<Transition name="tab-fade" mode="out-in">
									<div
										v-if="activeTab === 'about'"
										key="about"
										class="tab-pane"
										role="tabpanel"
									>
										<p class="description">
											{{ $t("aboutSection.tabs.about.description") }}
										</p>
										<ul class="features-list">
											<li>{{ $t("aboutSection.tabs.about.feature1") }}</li>
											<li>{{ $t("aboutSection.tabs.about.feature2") }}</li>
										</ul>
									</div>
									<div
										v-else-if="activeTab === 'mission'"
										key="mission"
										class="tab-pane"
										role="tabpanel"
									>
										<p class="description">
											{{ $t("aboutSection.tabs.mission.description") }}
										</p>
										<ul class="features-list">
											<li>{{ $t("aboutSection.tabs.mission.feature1") }}</li>
											<li>{{ $t("aboutSection.tabs.mission.feature2") }}</li>
										</ul>
									</div>
									<div
										v-else-if="activeTab === 'vision'"
										key="vision"
										class="tab-pane"
										role="tabpanel"
									>
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
						<img
							class="main-img-1"
							data-sal="slide-right"
							data-sal-delay="100"
							data-sal-duration="800"
							src="/img/about/about-04.webp"
							alt="About Al-Amal Education"
							loading="lazy"
						/>

						<!-- Main Image 2 (Overlapping) -->
						<img
							class="main-img-2"
							data-sal="slide-left"
							data-sal-delay="100"
							data-sal-duration="800"
							src="/img/about/about-05.webp"
							alt="Islamic Education"
							loading="lazy"
						/>

						<!-- Decorative Shapes -->
						<ul class="shape-group">
							<!-- Shape 1: Parallax -->
							<li
								class="shape-1 scene"
								ref="scene1"
							>
								<img data-depth="2" src="/img/about/shape-13.png" alt="Shape" />
							</li>

							<!-- Shape 2: Parallax -->
							<li
								class="shape-2 scene"
								ref="scene2"
							>
								<img
									data-depth="-2"
									src="/img/about/shape-39.png"
									alt="Shape"
								/>
							</li>

							<!-- Shape 3: Parallax -->
							<li
								class="shape-3 scene"
								ref="scene3"
							>
								<img data-depth="2" src="/img/about/shape-07.png" alt="Shape" />
							</li>

							<!-- Shape 4: Circle -->
							<li
								class="shape-4"
							>
								<span></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Outer Decorative Shapes -->
		<ul class="shape-group outer-shapes">
			<li class="shape-5">
				<img
					class="rotateit"
					src="/img/about/shape-13.png"
					alt="Decorative Shape"
				/>
			</li>
			<li class="shape-6">
				<span></span>
			</li>
		</ul>

		<!-- Statistics Section -->
		<div class="max-w-7xl mx-auto statistics-section">
			<div
				class="statistic-div"
				v-for="statistic in animatedStats"
				:key="statistic.id"
			>
				<div :style="{ color: statistic.color }" class="value-Stat">
					{{ statistic.displayValue }}
				</div>
				<div class="title-Stat">{{ $t(statistic.titleKey) }}</div>
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
	// Expand to full page by using document.body as the container
	const initParallax = (element: HTMLElement | null) => {
		if (element) {
			// Initialize with relativeInput: true for full-page parallax
			const instance = new Parallax(element, {
				relativeInput: false, // Parallax relative to entire page
				hoverOnly: false, // Always active, not just on hover
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
// Keep only the rotate animation (Sal.js handles the rest)
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
	padding: 90px 0 120px;
	overflow: hidden;
	isolation: isolate; // Create stacking context

	@media (max-width: 991px) {
		padding: 90px 0 100px;
	}

	@media (max-width: 767px) {
		padding: 80px 0;
	}
}

// Content column - removed custom opacity/transform, Sal.js handles it
.content-column {
	margin-top: 30px;
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
		font-size: 36px;
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
		gap: 1rem 2rem;
		border-bottom: none;
		margin-bottom: 30px;

		@media (max-width: 767px) {
			margin-bottom: 20px;
			gap: 0.75rem 1.5rem;
		}

		.nav-link {
			position: relative;
			font-size: 17px;
			font-weight: 600;
			color: var(--color-heading);
			background: transparent;
			border: none;
			padding: 0 0 8px 0;
			cursor: pointer;
			transition: color 0.3s ease;

			@media (max-width: 767px) {
				font-size: 15px;
			}

			// Separator between tabs
			&:not(:last-child)::after {
				content: "";
				position: absolute;
				top: 2px;
				height: 14px;
				width: 2px;
				background-color: #e5e5e5;

				[dir="ltr"] & {
					right: -18px;
				}

				[dir="rtl"] & {
					left: -18px;
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
		padding: 20px 0;
		position: relative;
		min-height: 300px; // Prevent layout shift during transitions

		.tab-pane {
			// All tab panes are in the DOM for v-show to work
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
		font-size: 16px;
		line-height: 1.8;
		color: #666;
		margin-bottom: 20px;

		@media (max-width: 767px) {
			font-size: 14px;
			line-height: 1.7;
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
			margin-bottom: 16px;
			font-size: 16px;

			[dir="ltr"] & {
				padding-left: 35px;
			}

			[dir="rtl"] & {
				padding-right: 35px;
			}

			@media (max-width: 767px) {
				font-size: 15px;
				margin-bottom: 12px;
			}

			// Check icon
			&::before {
				content: "\e913";
				font-family: "icomoon";
				color: var(--color-secondary);
				font-size: 19px;
				position: absolute;
				top: -3px;

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
	padding: 80px 0 65px;

	[dir="ltr"] & {
		padding-left: 30px;
	}

	[dir="rtl"] & {
		padding-right: 30px;
	}

	@media (max-width: 991px) {
		padding: 20px 0 65px;
	}

	@media (max-width: 575px) {
		padding: 0;
	}

	img {
		border-radius: 10px;
	}

	.main-img-1 {
		width: 390px;
		height: auto;
		display: block;
		// Sal.js will handle opacity
	}

	.main-img-2 {
		position: absolute;
		bottom: 0;
		width: 230px;
		// Sal.js will handle opacity

		[dir="ltr"] & {
			right: 0;
		}

		[dir="rtl"] & {
			left: 0;
		}

		@media (max-width: 991px) {
			[dir="ltr"] & {
				right: 115px;
			}

			[dir="rtl"] & {
				left: 115px;
			}
		}

		@media (max-width: 575px) {
			display: none;
		}
	}

	// Inner decorative shapes
	.shape-group {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			position: absolute;
			z-index: -1; // Changed from -1 to positive to be visible

			img {
				position: initial;
				transition: transform 0.1s ease-out;
			}

			&.shape-1 {
				top: -15px;

				[dir="ltr"] & {
					right: 95px;
				}

				[dir="rtl"] & {
					left: 95px;
				}
			}

			&.shape-2 {
				top: 13px;
				z-index: -2; // Even lower z-index but still positive

				[dir="ltr"] & {
					right: 39px;
				}

				[dir="rtl"] & {
					left: 39px;
				}
			}

			&.shape-3 {
				bottom: 33px;

				[dir="ltr"] & {
					left: -2px;
				}

				[dir="rtl"] & {
					right: -2px;
				}
			}

			&.shape-4 {
				bottom: -25px;
				z-index: -1;

				[dir="ltr"] & {
					right: 40px;
				}

				[dir="rtl"] & {
					left: 40px;
				}

				span {
					display: block;
					height: 320px;
					width: 320px;
					border: 1px solid var(--color-border);
					border-radius: 50%;
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

	@media (max-width: 767px) {
		display: none;
	}

	li {
		position: absolute;
		z-index: 1; // Changed from -1 to positive

		&.shape-5 {
			top: 20px;

			[dir="ltr"] & {
				left: 110px;
			}

			[dir="rtl"] & {
				right: 110px;
			}

			@media (max-width: 1199px) {
				[dir="ltr"] & {
					left: 0;
				}

				[dir="rtl"] & {
					right: 0;
				}

				top: 0;
			}
		}

		&.shape-6 {
			top: -350px;

			[dir="ltr"] & {
				left: 80px;
			}

			[dir="rtl"] & {
				right: 80px;
			}

			span {
				display: block;
				height: 470px;
				width: 470px;
				border: 1px solid var(--color-border);
				border-radius: 50%;
			}
		}
	}
}

// Statistics Section
.statistics-section {
	margin-top: 4rem;
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 767px) {
		margin-top: 3rem;
		gap: 1.5rem;
	}

	.statistic-div {
		width: 250px;
		height: 150px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		transition: transform 0.3s ease, box-shadow 0.3s ease;

		@media (max-width: 767px) {
			width: 200px;
			height: 120px;
		}

		@media (max-width: 479px) {
			width: 150px;
			height: 100px;
		}

		&:hover {
			transform: translateY(-5px);
			box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 16px;
		}

		.value-Stat {
			font-size: 2rem;
			font-weight: 700;

			@media (max-width: 767px) {
				font-size: 1.5rem;
			}

			@media (max-width: 479px) {
				font-size: 1.25rem;
			}
		}

		.title-Stat {
			font-size: 0.9rem;
			color: #666;
			text-align: center;
			margin-top: 0.5rem;

			@media (max-width: 479px) {
				font-size: 0.8rem;
			}
		}
	}
}
</style>
