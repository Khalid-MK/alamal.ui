<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
	courseItems: {
		type: Object,
		default: () => ({}),
	},
});

const defaultCurriculum = [
	{
		title: "Welcome to the Course & Overview",
		summary: "8 lectures • 47m",
		lessons: [
			{ title: "Importing the libraries", duration: "5:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "7:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "3:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "8:30", locked: true, iconClass: "flaticon-youtube" },
		],
	},
	{
		title: "Python Application Engine",
		summary: "2 lectures • 12m",
		lessons: [
			{ title: "Data Manipulation Tools", duration: "6:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "8:30", locked: true, iconClass: "flaticon-youtube" },
		],
	},
	{
		title: "Algorithm Comparison",
		summary: "3 lectures • 13m",
		lessons: [
			{ title: "Importing the libraries", duration: "3:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "5:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "7:30", locked: true, iconClass: "flaticon-youtube" },
		],
	},
	{
		title: "Data Manipulation Tools",
		summary: "7 lectures • 35m",
		lessons: [
			{ title: "Importing the libraries", duration: "2:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "4:30", locked: true, iconClass: "flaticon-youtube" },
		],
	},
	{
		title: "Sorting- the Bubble Sort Algorithm",
		summary: "10 lectures • 55m",
		lessons: [
			{ title: "Importing the libraries", duration: "6:30", locked: true, iconClass: "flaticon-youtube" },
			{ title: "Importing the libraries", duration: "8:30", locked: true, iconClass: "flaticon-youtube" },
		],
	},
];

const normalizeLessons = (lessons) => {
	if (!Array.isArray(lessons) || !lessons.length) {
		return [];
	}

	return lessons.map((lesson) => {
		if (typeof lesson === "string") {
			return { title: lesson };
		}

		return {
			title: lesson.title || "",
			duration: lesson.duration || lesson.length || "",
			locked: typeof lesson.locked === "boolean" ? lesson.locked : false,
			iconClass: lesson.iconClass || "flaticon-youtube",
		};
	});
};

const buildSummary = (section, lessons) => {
	if (section.summary) {
		return section.summary;
	}

	if (section.overview) {
		return section.overview;
	}

	const lessonCount = lessons.length;
	if (!lessonCount) {
		return "";
	}

	return `${lessonCount} ${lessonCount === 1 ? "lesson" : "lessons"}`;
};

const curriculums = computed(() => {
	const incoming = props.courseItems?.curriculums;

	if (Array.isArray(incoming) && incoming.length) {
		return incoming.map((section, idx) => {
			const lessons = normalizeLessons(section.lessons);
			return {
				title: section.title || `Section ${idx + 1}`,
				summary: buildSummary(section, lessons),
				lessons,
			};
		});
	}

	return defaultCurriculum;
});

const activeSection = ref(null);

watch(
	curriculums,
	(newSections) => {
		if (!newSections.length) {
			activeSection.value = null;
			return;
		}

		if (activeSection.value === null || activeSection.value >= newSections.length) {
			activeSection.value = 0;
		}
	},
	{ immediate: true }
);

const toggleSection = (index) => {
	activeSection.value = activeSection.value === index ? null : index;
};

const beforeEnter = (el) => {
	el.style.height = "0";
	el.style.opacity = "0";
};

const enter = (el) => {
	el.style.transition = "height 0.3s ease, opacity 0.3s ease";
	el.style.height = `${el.scrollHeight}px`;
	el.style.opacity = "1";
};

const afterEnter = (el) => {
	el.style.height = "auto";
	el.style.transition = "";
};

const beforeLeave = (el) => {
	el.style.height = `${el.scrollHeight}px`;
	el.style.opacity = "1";
};

const leave = (el) => {
	el.style.transition = "height 0.3s ease, opacity 0.3s ease";
	requestAnimationFrame(() => {
		el.style.height = "0";
		el.style.opacity = "0";
	});
};

const afterLeave = (el) => {
	el.style.transition = "";
};
</script>

<template>
	<div class="course-curriculum pt-40 pb-50">
		<div class="course-curriculam">
			<h4>Curriculum</h4>
		</div>
		<ul>
			<li>{{ props.courseItems.curriculumSummary || `${curriculums.length} section${curriculums.length === 1 ? "" :
				"s"}` }}</li>
		</ul>
		<div class="course-curriculam-accodion mt-30">
			<div class="accordion">
				<div v-for="(section, sectionIndex) in curriculums" :key="section.title"
					:class="['accordion-item', { 'is-open': activeSection === sectionIndex }]">
					<button type="button" class="accordion-button" :class="{ collapsed: activeSection !== sectionIndex }"
						@click="toggleSection(sectionIndex)">
						<span class="accordion-toggle-icon" aria-hidden="true">
							<i :class="['fa-solid', activeSection === sectionIndex ? 'fa-minus' : 'fa-plus']"></i>
						</span>
						<span class="accordion-header">
							<span class="accordion-tittle">
								<span>{{ section.title }}</span>
							</span>
							<span v-if="section.summary" class="accordion-tittle-inner">
								<span>{{ section.summary }}</span>
							</span>
						</span>
					</button>
					<Transition appear @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
						@before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
						<div v-show="activeSection === sectionIndex" class="accordion-panel">
							<div class="accordion-body">
								<div v-for="(lesson, lessonIndex) in section.lessons" :key="`${sectionIndex}-${lessonIndex}`"
									class="course-curriculum-content d-sm-flex justify-content-between align-items-center">
									<div class="course-curriculum-info">
										<i v-if="lesson.iconClass" :class="lesson.iconClass"></i>
										<h4>{{ lesson.title }}</h4>
									</div>
									<div v-if="lesson.duration || lesson.locked" class="course-curriculum-meta">
										<span v-if="lesson.duration">{{ lesson.duration }}</span>
										<span v-if="lesson.locked" class="time"> <i class="flaticon-lock"></i></span>
									</div>
								</div>
								<div v-if="!section.lessons.length" class="course-curriculum-content">
									<div class="course-curriculum-info">
										<h4>{{ props.courseItems.emptyCurriculumMessage || "Details coming soon." }}</h4>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped>
.accordion-button::after {
	display: none;
}

.accordion-button {
	width: 100%;
	padding: 20px 24px;
	background-color: transparent;
	border: none;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: left;
	transition: background-color 0.3s ease;
	gap: 16px;
}

.accordion-item {
	border: 1px solid rgba(0, 0, 0, 0.08);
	border-radius: 4px;
	background-color: #fff;
	/* box-shadow: 0 6px 18px rgba(9, 18, 44, 0.06); */
	margin-bottom: 16px;
	overflow: hidden;
}

.accordion-item.is-open .accordion-button {
	background-color: rgba(233, 240, 255, 0.6);
}

.accordion-panel {
	overflow: hidden;
}

.accordion-body {
	padding: 20px;
}

.accordion-toggle-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	width: 28px;
	height: 28px;
}

.course-curriculum-content+.course-curriculum-content {
	margin-top: 16px;
}

.course-curriculum-info h4 {
	margin-bottom: 0;
}
</style>
