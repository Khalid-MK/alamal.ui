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

				<!-- Course Slider -->
				<div class="courses-slider-wrapper">
					<swiper-container ref="containerRef" :init="false" class="courses-swiper">
						<swiper-slide
							v-for="course in filteredCourses"
							:key="course.id"
							class="course-slide"
						>
							<QuranCourseCard :course="course" />
						</swiper-slide>
					</swiper-container>

					<!-- Navigation Controls - Only show when there are more than 3 courses -->
					<div v-if="showSliderNavigation" class="slider-navigation">
						<button class="nav-btn nav-prev" @click="slidePrev" aria-label="Previous slide">
							<i class="icon-4"></i>
						</button>
						<div class="slider-pagination"></div>
						<button class="nav-btn nav-next" @click="slideNext" aria-label="Next slide">
							<i class="icon-4"></i>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Islamic Animated Shapes -->
		<ul class="shape-group hidden lg:block">
			<li class="shape-1 scene" ref="scene1">
				<img
					data-depth="1"
					src="/img/islamic-shapes/banner/bismillah-2.png"
					alt="Islamic Decoration"
				/>
			</li>

			<li class="shape-4 scene" ref="scene4">
				<img
					data-depth="-1.5"
					src="/img/islamic-shapes/decorative/shape-74.png"
					alt="Islamic Design"
				/>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useI18n } from "vue-i18n";
import Parallax from "parallax-js";

const { locale, localeProperties } = useI18n();
const direction = computed(() => localeProperties.value.dir);

// Filter state
const activeFilter = ref("quran");

// Refs for parallax scenes
const scene1 = ref<HTMLElement | null>(null);
const scene2 = ref<HTMLElement | null>(null);
const scene3 = ref<HTMLElement | null>(null);
const scene4 = ref<HTMLElement | null>(null);

// Store parallax instances for cleanup
let parallaxInstances: Parallax[] = [];

// Swiper ref
const containerRef = ref(null);

// Filter data
interface FilterData {
	id: string;
}

const filters: FilterData[] = [
	{ id: "quran" },
	{ id: "tajweed" },
	{ id: "arabic" },
	{ id: "islamic" },
];

// Course data
interface CourseData {
	id: number;
	titleKey: string;
	descriptionKey: string;
	categoryKey: string;
	modeKey: string;
	rating: string;
	price: string;
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
		price: "$29.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["quran"],
	},
	{
		id: 2,
		titleKey: "courseArea.courses.course2.title",
		descriptionKey: "courseArea.courses.course2.description",
		categoryKey: "courseArea.courses.course2.category",
		modeKey: "courseArea.courses.course2.mode",
		rating: "(4.9 / 18 Rating)",
		price: "$35.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["tajweed"],
	},
	{
		id: 3,
		titleKey: "courseArea.courses.course3.title",
		descriptionKey: "courseArea.courses.course3.description",
		categoryKey: "courseArea.courses.course3.category",
		modeKey: "courseArea.courses.course3.mode",
		rating: "(4.8 / 15 Rating)",
		price: "$25.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["arabic"],
	},
	{
		id: 4,
		titleKey: "courseArea.courses.course4.title",
		descriptionKey: "courseArea.courses.course4.description",
		categoryKey: "courseArea.courses.course4.category",
		modeKey: "courseArea.courses.course4.mode",
		rating: "(5.0 / 20 Rating)",
		price: "$32.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["quran"],
	},
	{
		id: 5,
		titleKey: "courseArea.courses.course5.title",
		descriptionKey: "courseArea.courses.course5.description",
		categoryKey: "courseArea.courses.course5.category",
		modeKey: "courseArea.courses.course5.mode",
		rating: "(4.7 / 14 Rating)",
		price: "$30.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["tajweed"],
	},
	{
		id: 6,
		titleKey: "courseArea.courses.course6.title",
		descriptionKey: "courseArea.courses.course6.description",
		categoryKey: "courseArea.courses.course6.category",
		modeKey: "courseArea.courses.course6.mode",
		rating: "(4.9 / 16 Rating)",
		price: "$28.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["arabic"],
	},
	{
		id: 7,
		titleKey: "courseArea.courses.course7.title",
		descriptionKey: "courseArea.courses.course7.description",
		categoryKey: "courseArea.courses.course7.category",
		modeKey: "courseArea.courses.course7.mode",
		rating: "(5.0 / 25 Rating)",
		price: "$40.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["islamic"],
	},
	{
		id: 8,
		titleKey: "courseArea.courses.course8.title",
		descriptionKey: "courseArea.courses.course8.description",
		categoryKey: "courseArea.courses.course8.category",
		modeKey: "courseArea.courses.course8.mode",
		rating: "(4.8 / 22 Rating)",
		price: "$38.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["islamic"],
	},
	{
		id: 9,
		titleKey: "courseArea.courses.course9.title",
		descriptionKey: "courseArea.courses.course9.description",
		categoryKey: "courseArea.courses.course9.category",
		modeKey: "courseArea.courses.course9.mode",
		rating: "(5.0 / 30 Rating)",
		price: "$45.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["quran"],
	},
	{
		id: 10,
		titleKey: "courseArea.courses.course10.title",
		descriptionKey: "courseArea.courses.course10.description",
		categoryKey: "courseArea.courses.course10.category",
		modeKey: "courseArea.courses.course10.mode",
		rating: "(4.9 / 28 Rating)",
		price: "$42.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["quran"],
	},
	{
		id: 11,
		titleKey: "courseArea.courses.course11.title",
		descriptionKey: "courseArea.courses.course11.description",
		categoryKey: "courseArea.courses.course11.category",
		modeKey: "courseArea.courses.course11.mode",
		rating: "(4.7 / 24 Rating)",
		price: "$36.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["quran"],
	},
	{
		id: 12,
		titleKey: "courseArea.courses.course12.title",
		descriptionKey: "courseArea.courses.course12.description",
		categoryKey: "courseArea.courses.course12.category",
		modeKey: "courseArea.courses.course12.mode",
		rating: "(5.0 / 35 Rating)",
		price: "$50.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["quran"],
	},
	{
		id: 13,
		titleKey: "courseArea.courses.course13.title",
		descriptionKey: "courseArea.courses.course13.description",
		categoryKey: "courseArea.courses.course13.category",
		modeKey: "courseArea.courses.course13.mode",
		rating: "(4.8 / 26 Rating)",
		price: "$33.00",
		image: "/img/courses/programs/course-99.jpg",
		categories: ["quran"],
	},
];

// Filtered courses based on active filter
const filteredCourses = computed(() => {
	return coursesData.filter((course) =>
		course.categories.includes(activeFilter.value)
	);
});

// Check if slider navigation should be shown
const showSliderNavigation = computed(() => filteredCourses.value.length > 3);

// Swiper instance
const { instance, next, prev, to } = useSwiper(containerRef, {
	slidesPerView: 1,
	spaceBetween: 32,
	loop: true,
	pagination: {
		el: '.slider-pagination',
		clickable: true,
		type: 'bullets',
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
			spaceBetween: 32,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 32,
		},
	},
});

// Navigation methods
const slidePrev = () => {
	prev();
};

const slideNext = () => {
	next();
};

// Watch for filter changes and update slider
watch(filteredCourses, () => {
	nextTick(() => {
		if (instance.value) {
			instance.value.update();
			// Reinitialize pagination after update
			if (instance.value.pagination) {
				instance.value.pagination.init();
				instance.value.pagination.render();
				instance.value.pagination.update();
			}
			to(0);
		}
	});
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

// Courses Slider
.courses-slider-wrapper {
	position: relative;
	margin-bottom: 60px;
}

.courses-swiper {
	padding-bottom: 20px;
}

.course-slide {
	height: auto;
	display: flex;
}

// Slider Navigation
.slider-navigation {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	margin-top: 40px;

	.nav-btn {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: var(--color-secondary);
		color: var(--color-white);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;

		&:hover {
			background-color: #d43d52;
			transform: scale(1.05);
		}

		i {
			font-size: 16px;
		}

		&.nav-prev {
			i {
				transform: rotate(180deg);
			}

			[dir="rtl"] & i {
				transform: rotate(0deg);
			}
		}

		&.nav-next {
			[dir="rtl"] & i {
				transform: rotate(180deg);
			}
		}

		@media (max-width: 767px) {
			width: 40px;
			height: 40px;

			i {
				font-size: 14px;
			}
		}
	}

	.slider-pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;

		:deep(.swiper-pagination-bullet) {
			width: 10px;
			height: 10px;
			background-color: #d9d9d9;
			border-radius: 50%;
			cursor: pointer;
			transition: all 0.3s ease;
			opacity: 1;

			&.swiper-pagination-bullet-active {
				background-color: var(--color-secondary);
				width: 30px;
				border-radius: 5px;
			}
		}
	}
}

// Course card styles are now in CourseCard.vue component

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
			top: 120px;
    		right: 80px;

			[dir="rtl"] & {
				right: auto;
				left: 80px;
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

		&.shape-3 {
			top: 50%;
			right: -100px;
			transform: translateY(-50%);

			[dir="rtl"] & {
				right: auto;
				left: -100px;
			}
		}

		&.shape-4 {
			bottom: 10%;
			left: -80px;

			[dir="rtl"] & {
				left: auto;
				right: -80px;
			}
		}
	}
}
</style>
