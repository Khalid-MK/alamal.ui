<script setup>
import { computed, ref } from "vue";
import ContentOverview from "./ContentOverview.vue";
import ContentCurriculum from "./ContentCurriculum.vue";
import ContentInstructor from "./ContentInstructor.vue";
import ContentReviews from "./ContentReviews.vue";

const props = defineProps({
	courseItems: {
		type: Object,
		default: () => ({}),
	},
	courseInstructorsImage: {
		type: String,
		default: "",
	},
	courseReviewsImageOne: {
		type: String,
		default: "",
	},
	courseReviewsImageTwo: {
		type: String,
		default: "",
	},
	courseReviewsImageThree: {
		type: String,
		default: "",
	},
	showComments: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["toggle-comments"]);

const tabs = [
	{ id: "overview", label: "Overview" },
	{ id: "curriculum", label: "Curriculum" },
	{ id: "instructor", label: "Instructor" },
	{ id: "reviews", label: "Reviews" },
];

const defaultInstructorBio = "Professionally, I come from the Data Science consulting space with experience in finance, retail, transport and other industries. I was trained by the best analytics mentors at Deloitte Australia and since starting on Udemy I have passed on my knowledge to spread around the world.";

const activeTab = ref(tabs[0].id);

const selectTab = (tabId) => {
	activeTab.value = tabId;
};

const isActiveTab = (tabId) => activeTab.value === tabId;

const ratingIcons = computed(() => {
	if (!props.courseItems) {
		return [];
	}

	return [
		props.courseItems.productRating1,
		props.courseItems.productRating2,
		props.courseItems.productRating3,
		props.courseItems.productRating4,
		props.courseItems.productRating5,
	].filter(Boolean);
});

const ratingSummary = computed(() => props.courseItems?.rating || "(254 reviews)");

const overviewParagraphs = computed(() => {
	const paragraphs = Array.isArray(props.courseItems?.overviewParagraphs)
		? props.courseItems.overviewParagraphs.filter(Boolean)
		: [];

	if (paragraphs.length) {
		return paragraphs;
	}

	return [
		"This course has been designed by two professional Data Scientists so that we can share our knowledge and help you learn complex theory, algorithms, and coding libraries in a simple way. We will walk you step-by-step into the World of Machine Learning. With every tutorial, you will develop new skills and improve your understanding of this challenging yet lucrative sub-field of Data Science.",
		"Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.",
	];
});

const defaultLearningOutcomes = [
	"Handle advanced techniques like Dimensionality Reduction",
	"Handle specific topics like Reinforcement Learning best",
	"Know which Machine Learning model to choose for each type of problem",
	"Reinforcement learning upper confidence bound Thompson sampling",
	"Model Selection & Boosting fold cross validation parameter",
	"Use Machine Learning for personal purpose of machine",
];

const learningItems = computed(() => {
	const items = Array.isArray(props.courseItems?.infoList)
		? props.courseItems.infoList
			.map((info) => (typeof info === "string" ? info : info?.infoListTitle))
			.filter(Boolean)
		: [];

	return items.length ? items : defaultLearningOutcomes;
});
</script>

<template>
	<div class="course-detalis-wrapper mb-30">
		<div class="course-heading mb-20">
			<h2>{{ props.courseItems.title }}</h2>
			<div class="course-star">
				<ul>
					<li v-for="(iconClass, index) in ratingIcons" :key="`rating-${index}`"><i :class="iconClass"></i></li>
				</ul>
				<span>{{ ratingSummary }}</span>
			</div>
		</div>
		<div class="course-detelis-meta">
			<div class="course-meta-wrapper border-line-meta">
				<div class="course-meta-img">
					<NuxtLink to="/instructor"><img :src="props.courseItems.instructorImage" alt="course-meta"></NuxtLink>
				</div>
				<div class="course-meta-text">
					<span>Created by</span>
					<h6>
						<NuxtLink to="/instructor">{{ props.courseItems.instructor }}</NuxtLink>
					</h6>
				</div>
			</div>
			<div class="course-Enroll border-line-meta">
				<p>Total Enrolled</p>
				<span>{{ props.courseItems.totalEnrolled || "5,420" }}</span>
			</div>
			<div class="course-update border-line-meta">
				<p>Last Update</p>
				<span>{{ props.courseItems.lastUpdate || "01 January 2022" }}</span>
			</div>
			<div class="course-category">
				<p>Category</p>
				<span>
					<NuxtLink to="/course">{{ props.courseItems.badge }}</NuxtLink>
				</span>
			</div>
		</div>
		<div class="course-body-tabs">
			<div class="course-tab-header">
				<button v-for="tab in tabs" :key="tab.id" type="button"
					:class="['course-tab-button', { active: isActiveTab(tab.id) }]" @click="selectTab(tab.id)">
					<span class="course-tab-label">{{ tab.label }}</span>
				</button>
			</div>
			<div class="course-tab-panels">
				<Transition name="course-tab-fade" mode="out-in">
					<section v-if="activeTab === 'overview'" key="overview" class="course-tab-panel">
						<ContentOverview :overview-paragraphs="overviewParagraphs" :learning-items="learningItems" />
					</section>
					<section v-else-if="activeTab === 'curriculum'" key="curriculum" class="course-tab-panel">
						<ContentCurriculum :course-items="props.courseItems" />
					</section>
					<section v-else-if="activeTab === 'instructor'" key="instructor" class="course-tab-panel">
						<ContentInstructor :course-items="props.courseItems"
							:course-instructors-image="props.courseInstructorsImage" :default-instructor-bio="defaultInstructorBio" />
					</section>
					<section v-else key="reviews" class="course-tab-panel">
						<ContentReviews :course-items="props.courseItems" :course-reviews-image-one="props.courseReviewsImageOne"
							:course-reviews-image-two="props.courseReviewsImageTwo"
							:course-reviews-image-three="props.courseReviewsImageThree" :show-comments="props.showComments"
							@toggle-comments="emit('toggle-comments')" />
					</section>
				</Transition>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.course-body-tabs {
	margin-top: 40px;
}

.course-tab-header {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 32px;
	border-bottom: 1px solid #e6e6e6;
}

.course-tab-button {
	position: relative;
	padding: 8px 0;
	background: transparent;
	border: none;
	color: #6b6b6b;
	font-weight: 600;
	font-size: 16px;
	cursor: pointer;
	transition: color 0.2s ease;
}

.course-tab-button::after {
	content: "";
	position: absolute;
	left: 0;
	bottom: -1px;
	height: 1px;
	width: 100%;
	background-color: #2467ec;
	opacity: 0;
	transform: scaleX(0.3);
	transform-origin: center;
	transition: opacity 0.25s ease, transform 0.25s ease;
}

.course-tab-button:hover {
	color: #2467ec;
}

.course-tab-button:hover::after {
	opacity: 0.5;
	transform: scaleX(0.6);
}

.course-tab-button.active {
	color: #2467ec;
}

.course-tab-button.active::after {
	opacity: 1;
	transform: scaleX(1);
}

.course-tab-button:focus-visible {
	outline: 2px solid rgba(36, 103, 236, 0.35);
	outline-offset: 2px;
}

.course-tab-panels {
	margin-top: 32px;
}

.course-tab-panel {
	display: block;
}

.course-tab-fade-enter-active,
.course-tab-fade-leave-active {
	transition: opacity 0.25s ease, transform 0.25s ease;
}

.course-tab-fade-enter-from,
.course-tab-fade-leave-to {
	opacity: 0;
	transform: translateY(12px);
}
</style>
