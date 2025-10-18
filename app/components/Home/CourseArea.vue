<template>
	<div :dir="direction" class="course-area-section edu-course-area course-area-3 section-gap-large bg-lighten04">
		<div class="max-w-7xl mx-auto">
			<!-- Section Title -->
			<div class="section-title section-center mb-12">
				<span class="pre-title">{{ $t("courseArea.preTitle") }}</span>
				<h2 class="title">{{ $t("courseArea.title") }}</h2>
				<span class="shape-line">
					<i class="icon-19"></i>
				</span>
			</div>

			<!-- Isotope Wrapper -->
			<div class="isotope-wrapper">
				<!-- Filter Buttons -->
				<div class="isotop-filter flex flex-wrap items-center justify-center gap-2 mb-12">
					<button
						v-for="filter in filters"
						:key="filter.id"
						:class="['filter-btn', { 'is-checked': activeFilter === filter.id }]"
						@click="activeFilter = filter.id"
					>
						<span class="filter-text">{{ $t(`courseArea.filters.${filter.id}`) }}</span>
						<span class="filter-arrow"></span>
					</button>
				</div>

				<!-- Course Grid -->
				<TransitionGroup
					name="course-fade"
					tag="div"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 isotope-list"
				>
					<div
						v-for="course in filteredCourses"
						:key="course.id"
						class="isotope-item"
					>
						<div class="edu-course course-style-3 group">
							<div class="course-inner">
								<!-- Bottom Shadow Effect -->
								<div class="course-shadow"></div>

								<!-- Thumbnail -->
								<div class="thumbnail">
									<NuxtLink :to="`/course-details/${course.id}`">
										<img
											:src="course.image"
											:alt="$t(course.titleKey)"
											loading="lazy"
											class="course-image"
										/>
										<div class="image-overlay"></div>
									</NuxtLink>
									<div class="time-top">
										<span class="duration">
											<i class="icon-61"></i>
											{{ $t(course.modeKey) }}
										</span>
									</div>
								</div>

								<!-- Content -->
								<div class="content">
									<span class="course-level">{{ $t(course.categoryKey) }}</span>
									<h5 class="course-title">
										<NuxtLink :to="`/course-details/${course.id}`">
											{{ $t(course.titleKey) }}
										</NuxtLink>
									</h5>
									<p class="course-description">
										{{ $t(course.descriptionKey) }}
									</p>

									<!-- Rating -->
									<div class="course-rating">
										<div class="rating">
											<i
												v-for="star in 5"
												:key="star"
												class="icon-23"
											></i>
										</div>
										<span class="rating-count">{{ course.rating }}</span>
									</div>

									<!-- Learn More Button (Hidden by default, shown on hover) -->
									<div class="read-more-btn">
										<NuxtLink
											:to="`/course-details/${course.id}`"
											class="edu-btn btn-small btn-secondary"
										>
											{{ $t("courseArea.learnMore") }}
											<i class="icon-4"></i>
										</NuxtLink>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TransitionGroup>
			</div>
		</div>

		<!-- Animated Shapes -->
		<ul class="shape-group hidden lg:block">
			<li class="shape-1 scene" ref="scene1">
				<img
					data-depth="2"
					src="/img/about/map-shape-3.png"
					alt="Shape"
					class="block dark:hidden"
				/>
				<img
					data-depth="2"
					src="/img/about/map-shape-3.png"
					alt="Shape"
					class="hidden dark:block"
				/>
			</li>
			<li class="shape-2 scene" ref="scene2">
				<img
					data-depth="2"
					src="/img/about/map-shape-3.png"
					alt="Shape"
					class="block dark:hidden"
				/>
				<img
					data-depth="2"
					src="/img/about/map-shape-3.png"
					alt="Shape"
					class="hidden dark:block"
				/>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import Parallax from "parallax-js";

const { locale, localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);

// Filter state
const activeFilter = ref("all");

// Refs for parallax scenes
const scene1 = ref<HTMLElement | null>(null);
const scene2 = ref<HTMLElement | null>(null);

// Store parallax instances for cleanup
let parallaxInstances: Parallax[] = [];

// Filter data
interface FilterData {
	id: string;
}

const filters: FilterData[] = [
	{ id: "all" },
	{ id: "quran" },
	{ id: "tajweed" },
	{ id: "arabic" },
];

// Course data
interface CourseData {
	id: number;
	titleKey: string;
	descriptionKey: string;
	categoryKey: string;
	modeKey: string;
	rating: string;
	image: string;
	categories: string[];
}

const coursesData: CourseData[] = [
	{
		id: 1,
		titleKey: "courseArea.courses.course1.title",
		descriptionKey: "courseArea.courses.course1.description",
		categoryKey: "courseArea.courses.course1.category",
		modeKey: "courseArea.courses.course1.mode",
		rating: "(5.0 / 12 Rating)",
		image: "/img/courses/programs/course-01.jpg",
		categories: ["all", "quran"],
	},
	{
		id: 2,
		titleKey: "courseArea.courses.course2.title",
		descriptionKey: "courseArea.courses.course2.description",
		categoryKey: "courseArea.courses.course2.category",
		modeKey: "courseArea.courses.course2.mode",
		rating: "(4.9 / 18 Rating)",
		image: "/img/courses/programs/course-01.jpg",
		categories: ["all", "tajweed"],
	},
	{
		id: 3,
		titleKey: "courseArea.courses.course3.title",
		descriptionKey: "courseArea.courses.course3.description",
		categoryKey: "courseArea.courses.course3.category",
		modeKey: "courseArea.courses.course3.mode",
		rating: "(4.8 / 15 Rating)",
		image: "/img/courses/programs/course-01.jpg",
		categories: ["all", "arabic"],
	},
	{
		id: 4,
		titleKey: "courseArea.courses.course4.title",
		descriptionKey: "courseArea.courses.course4.description",
		categoryKey: "courseArea.courses.course4.category",
		modeKey: "courseArea.courses.course4.mode",
		rating: "(5.0 / 20 Rating)",
		image: "/img/courses/programs/course-01.jpg",
		categories: ["all", "quran"],
	},
	{
		id: 5,
		titleKey: "courseArea.courses.course5.title",
		descriptionKey: "courseArea.courses.course5.description",
		categoryKey: "courseArea.courses.course5.category",
		modeKey: "courseArea.courses.course5.mode",
		rating: "(4.7 / 14 Rating)",
		image: "/img/courses/programs/course-01.jpg",
		categories: ["all", "tajweed"],
	},
	{
		id: 6,
		titleKey: "courseArea.courses.course6.title",
		descriptionKey: "courseArea.courses.course6.description",
		categoryKey: "courseArea.courses.course6.category",
		modeKey: "courseArea.courses.course6.mode",
		rating: "(4.9 / 16 Rating)",
		image: "/img/courses/programs/course-01.jpg",
		categories: ["all", "arabic"],
	},
];

// Filtered courses based on active filter
const filteredCourses = computed(() => {
	if (activeFilter.value === "all") {
		return coursesData;
	}
	return coursesData.filter((course) =>
		course.categories.includes(activeFilter.value)
	);
});

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
// Main section
.course-area-section {
	position: relative;
	overflow: hidden;
	isolation: isolate;
	background: url(/img/bg/bg-image-53.webp) center center;
}

.section-gap-large {
	padding: 120px 0;

	@media (max-width: 991px) {
		padding: 90px 0;
	}

	@media (max-width: 767px) {
		padding: 70px 0;
	}
}

.bg-lighten04 {
	background-color: #f9f9f9;
}

// Section Title
.section-title {
	&.section-center {
		text-align: center;
	}

	.pre-title {
		display: inline-block;
		font-weight: 500;
		font-size: 14px;
		text-transform: uppercase;
		color: var(--color-secondary);
		letter-spacing: 1px;
		margin-bottom: 12px;
	}

	.title {
		font-size: 40px;
		font-weight: 700;
		color: var(--color-heading);
		line-height: 1.3;
		margin: 0;

		@media (max-width: 1023px) {
			font-size: 32px;
		}

		@media (max-width: 767px) {
			font-size: 28px;
		}
	}

	.shape-line {
		display: inline-block;
		margin-top: 8px;
		color: var(--color-secondary);
		font-size: 14px;
	}
}

// Filter Buttons
.isotop-filter {
	.filter-btn {
		position: relative;
		text-align: center;
		font-size: 14px;
		font-weight: 500;
		text-transform: uppercase;
		color: var(--color-heading);
		background-color: #ede8e1;
		border-radius: 5px;
		border: none;
		padding: 0 30px;
		height: 60px;
		margin: 5px;
		transition: all 0.3s ease;
		cursor: pointer;
		z-index: 1;

		@media (max-width: 767px) {
			padding: 0 25px;
			height: 50px;
			font-size: 12px;
		}

		// Arrow indicator
		.filter-arrow {
			content: "";
			width: 0;
			height: 0;
			border-left: 7px solid transparent;
			border-right: 7px solid transparent;
			border-top: 10px solid var(--color-secondary);
			position: absolute;
			bottom: -5px;
			left: 0;
			right: 0;
			margin: 0 auto;
			visibility: hidden;
			opacity: 0;
			transition: all 0.3s ease;
			z-index: -1;

			@media (max-width: 767px) {
				display: none;
			}
		}

		&:hover,
		&.is-checked {
			background-color: var(--color-secondary);
			color: var(--color-white);

			.filter-arrow {
				bottom: -10px;
				visibility: visible;
				opacity: 1;
			}
		}
	}
}

// Isotope Item - Equal Heights
.isotope-item {
	display: flex;
	flex-direction: column;
	height: 100%;
}

// Course Card - Style 3
.course-style-3 {
	background-color: transparent;
	padding-bottom: 5px;
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	height: 100%;

	.course-inner {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	// Bottom shadow effect
	.course-shadow {
		content: "";
		height: 10px;
		width: 100%;
		background-color: var(--color-white);
		border-radius: 0 0 4px 4px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
		transition: background-color 0.3s ease;
	}

	.thumbnail {
		position: relative;
		overflow: hidden;
		border-radius: 10px 10px 0 0;
		transition: margin-bottom 0.3s ease;
		aspect-ratio: 16 / 10;

		.course-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			border-radius: 10px 10px 0 0;
			transition: transform 0.4s ease;
		}

		.image-overlay {
			position: absolute;
			inset: 0;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 10px 10px 0 0;
			transition: background-color 0.3s ease;
		}

		.time-top {
			position: absolute;
			top: 10px;
			left: 10px;
			z-index: 2;

			[dir="rtl"] & {
				left: auto;
				right: 10px;
			}

			.duration {
				display: inline-flex;
				align-items: center;
				gap: 6px;
				padding: 4px 8px;
				background-color: #f8b81f;
				color: var(--color-white);
				font-size: 12px;
				font-weight: 500;
				border-radius: 3px;

				i {
					font-size: 14px;
				}
			}
		}
	}

	.content {
		padding: 30px;
		background-color: var(--color-white);
		border-radius: 0 0 4px 4px;
		position: relative;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		flex-grow: 1;

		.course-level {
			display: inline-block;
			padding: 4px 12px;
			color: var(--color-secondary);
			background-color: rgba(238, 74, 98, 0.15);
			font-size: 12px;
			font-weight: 500;
			border-radius: 3px;
			margin-bottom: 17px;
			width: fit-content;
		}

		.course-title {
			font-size: 20px;
			font-weight: 700;
			margin-bottom: 14px;
			line-height: 1.4;

			a {
				color: var(--color-heading);
				transition: color 0.3s ease;
				text-decoration: none;

				&:hover {
					color: var(--color-primary);
				}
			}
		}

		.course-description {
			font-size: 14px;
			line-height: 1.8;
			color: #666;
			margin-bottom: 20px;
			flex-grow: 1;
		}

		.course-rating {
			display: flex;
			align-items: center;
			gap: 12px;
			margin-bottom: 0;

			.rating {
				display: flex;
				color: #f8b81f;

				i {
					font-size: 14px;
				}
			}

			.rating-count {
				font-size: 14px;
				font-weight: 500;
				color: var(--color-heading);
			}
		}

		// Hidden button by default
		.read-more-btn {
			visibility: hidden;
			opacity: 0;
			margin-bottom: -50px;
			transition: all 0.3s ease;

			.edu-btn {
				display: inline-flex;
				align-items: center;
				gap: 8px;
				padding: 12px 24px;
				background-color: var(--color-secondary);
				color: var(--color-white);
				font-size: 14px;
				font-weight: 500;
				border-radius: 4px;
				text-decoration: none;
				transition: background-color 0.3s ease;

				&:hover {
					background-color: #d43d52;
				}

				i {
					font-size: 12px;
				}
			}
		}
	}

	// Hover Effects
	&:hover {
		.course-shadow {
			background-color: rgba(255, 91, 92, 0.3);
		}

		.thumbnail {
			margin-bottom: -75px;

			.course-image {
				transform: scale(1.1);
			}

			.image-overlay {
				background-color: rgba(0, 0, 0, 0.5);
			}
		}

		.content {
			.read-more-btn {
				margin-top: 24px;
				margin-bottom: 0;
				visibility: visible;
				opacity: 1;
			}
		}
	}
}

// Animated Shapes
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

		&.shape-1 {
			top: -75px;
			right: -50px;

			[dir="rtl"] & {
				right: auto;
				left: -50px;
			}
		}

		&.shape-2 {
			bottom: -65px;
			left: -155px;

			[dir="rtl"] & {
				left: auto;
				right: -155px;
			}
		}
	}
}

// Transition animations for course cards
.course-fade-enter-active,
.course-fade-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.course-fade-enter-from,
.course-fade-leave-to {
	opacity: 0;
	transform: scale(0.95);
}

.course-fade-enter-to,
.course-fade-leave-from {
	opacity: 1;
	transform: scale(1);
}

// Move animation for TransitionGroup
.course-fade-move {
	transition: transform 0.3s ease;
}
</style>
