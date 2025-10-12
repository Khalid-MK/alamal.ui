<template>
	<div class="space-y-10">
		<div class="flex flex-wrap justify-center gap-3 border-b border-slate-200">
			<button v-for="tab in tabItems" :key="tab.key" type="button" class="tab-trigger"
				:class="{ 'is-active': activeTab === tab.key }" @click="activeTab = tab.key"
				:aria-pressed="activeTab === tab.key">
				{{ $t(tab.labelKey) }}
			</button>
		</div>

		<Transition name="tab-fade" mode="out-in">
			<div :key="activeTab" class="space-y-10">
				<template v-if="activeTab === 'overview'">
					<section class="space-y-4">
						<h2 class="text-2xl font-semibold text-slate-900">
							{{ $t("CourseDescription") }}
						</h2>
						<p v-if="course?.description" class="leading-relaxed text-slate-600">
							{{ course.description }}
						</p>
						<p v-else class="leading-relaxed text-slate-500">
							{{ $t("NotAvailable") }}
						</p>
					</section>

					<section v-if="course?.infoList?.length" class="space-y-4">
						<h3 class="text-2xl font-semibold text-slate-900">
							{{ $t("WhatYouWillLearn") }}
						</h3>
						<ul class="space-y-3">
							<li v-for="(item, index) in course.infoList" :key="index" class="flex items-start gap-3 text-slate-600">
								<i class="fa-solid fa-check mt-1 text-emerald-500"></i>
								<span>{{ item.infoListTitle }}</span>
							</li>
						</ul>
					</section>
				</template>

				<template v-else-if="activeTab === 'curriculum'">
					<div v-if="curriculumSections.length" class="space-y-4">
						<div v-for="(section, index) in curriculumSections" :key="sectionKey(section, index)"
							:class="['curriculum-card', { 'is-open': isSectionActive(section, index) }]">
							<button type="button" class="curriculum-header" @click="toggleSection(section, index)"
								:aria-expanded="isSectionActive(section, index)">
								<span class="flex items-center gap-3">
									<span class="toggle-icon" :class="{ 'is-open': isSectionActive(section, index) }">
										<i :class="isSectionActive(section, index) ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"></i>
									</span>
									<span class="text-lg font-semibold text-slate-900">{{ section.title }}</span>
								</span>
								<span class="flex items-center gap-2 text-sm text-slate-500">
									<span>
										{{ getLessonCount(section) }} {{ $t("Lessons") }}
									</span>
									<span v-if="getSectionDuration(section)" class="text-slate-300">•</span>
									<span v-if="getSectionDuration(section)" class="text-slate-500">
										{{ getSectionDuration(section) }}
									</span>
								</span>
							</button>

							<Transition @enter="onAccordionEnter" @after-enter="onAccordionAfterEnter" @leave="onAccordionLeave"
								@after-leave="onAccordionAfterLeave">
								<div v-show="isSectionActive(section, index)" class="accordion-content">
									<ul v-if="Array.isArray(section.lessons) && section.lessons.length" class="lesson-list">
										<li v-for="(lesson, lessonIndex) in section.lessons"
											:key="lessonKey(section, index, lesson, lessonIndex)" class="lesson-item">
											<div class="lesson-leading">
												<i class="fa-regular fa-file-lines lesson-leading-icon"></i>
												<span class="lesson-title">
													{{ getLessonTitle(lesson, lessonIndex) }}
												</span>
											</div>
											<div class="lesson-meta">
												<span v-if="getLessonQuestions(lesson)" class="lesson-chip lesson-chip--questions">
													{{ getLessonQuestions(lesson) }}
												</span>
												<span v-if="getLessonDuration(lesson)" class="lesson-chip lesson-chip--duration">
													{{ getLessonDuration(lesson) }}
												</span>
												<i v-if="isLessonLocked(lesson)" class="fa-solid fa-lock lesson-lock"></i>
											</div>
										</li>
									</ul>
									<p v-else class="px-5 pb-5 text-sm text-slate-500">
										{{ $t("NotAvailable") }}
									</p>
								</div>
							</Transition>
						</div>
					</div>
					<p v-else class="text-slate-500">
						{{ $t("NotAvailable") }}
					</p>
				</template>

				<template v-else-if="activeTab === 'instructor'">
					<div class="flex flex-col items-start gap-6 sm:flex-row">
						<img v-if="course?.instructorImage" :src="course.instructorImage" :alt="course.instructor"
							class="h-32 w-32 rounded-2xl border border-slate-200 object-cover" />
						<div class="space-y-3">
							<h3 class="text-2xl font-semibold text-slate-900">
								{{ course?.instructor || $t("NotAvailable") }}
							</h3>
							<p class="leading-relaxed text-slate-600">
								{{ course?.instructorBio || defaultInstructorBio }}
							</p>
						</div>
					</div>
				</template>

				<template v-else>
					<p class="leading-relaxed text-slate-600">
						{{ $t("ReviewsPlaceholder") }}
					</p>
				</template>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type CurriculumLesson =
	| string
	| {
		title?: string;
		duration?: string;
		locked?: boolean;
		preview?: boolean;
		questions?: number | string;
		questionCount?: number;
		questionsLabel?: string;
	};

type CurriculumSection = {
	id?: string | number;
	title?: string;
	lessons?: CurriculumLesson[];
	duration?: string;
	totalDuration?: string;
	lectureCount?: number;
};

const props = defineProps<{
	course: Record<string, any> | null;
}>();

const course = computed(() => props.course ?? null);

const activeTab = ref<"overview" | "curriculum" | "instructor" | "reviews">("overview");

const tabItems = [
	{ key: "overview", labelKey: "Overview" },
	{ key: "curriculum", labelKey: "Curriculum" },
	{ key: "instructor", labelKey: "Instructor" },
	{ key: "reviews", labelKey: "Reviews" },
] as const;

const { t } = useI18n();

const defaultInstructorBio = computed(() => t("InstructorBioPlaceholder"));

const curriculumSections = computed<CurriculumSection[]>(() => {
	return Array.isArray(course.value?.curriculums) ? course.value!.curriculums : [];
});

const activeSectionKey = ref<string | null>(null);

const sectionKey = (section: CurriculumSection, index: number) => {
	const base = section?.id ?? section?.title ?? `section-${index}`;
	return `${String(base)}-${index}`;
};

const isSectionActive = (section: CurriculumSection, index: number) => {
	return activeSectionKey.value === sectionKey(section, index);
};

const toggleSection = (section: CurriculumSection, index: number) => {
	const key = sectionKey(section, index);
	activeSectionKey.value = activeSectionKey.value === key ? null : key;
};

watch(
	() => curriculumSections.value,
	(sections) => {
		const firstSection = sections[0];
		if (firstSection) {
			activeSectionKey.value = sectionKey(firstSection, 0);
		} else {
			activeSectionKey.value = null;
		}
	},
	{ immediate: true }
);

const lessonKey = (
	section: CurriculumSection,
	sectionIndex: number,
	lesson: CurriculumLesson,
	lessonIndex: number
) => {
	if (typeof lesson === "string") {
		return `${sectionKey(section, sectionIndex)}-${lessonIndex}-${lesson}`;
	}
	return `${sectionKey(section, sectionIndex)}-${lessonIndex}-${lesson.title ?? "lesson"}`;
};

const getLessonTitle = (lesson: CurriculumLesson, fallbackIndex: number) => {
	if (typeof lesson === "string") {
		return lesson;
	}
	return lesson?.title ?? `${t("Lesson")} ${fallbackIndex + 1}`;
};

const getLessonDuration = (lesson: CurriculumLesson) => {
	if (typeof lesson === "string") {
		return "";
	}
	return lesson?.duration ?? "";
};

const getLessonQuestions = (lesson: CurriculumLesson) => {
	if (typeof lesson !== "object" || lesson === null) {
		return "";
	}
	const value = lesson.questions ?? lesson.questionCount ?? lesson.questionsLabel;
	if (value === null || value === undefined || value === "") {
		return "";
	}
	if (typeof value === "number") {
		return `${value} ${value === 1 ? t("Question") : t("Questions")}`;
	}
	return String(value);
};

const isLessonLocked = (lesson: CurriculumLesson) => {
	if (typeof lesson === "string") {
		return false;
	}
	return Boolean(lesson?.locked);
};

const getLessonCount = (section: CurriculumSection) => {
	if (typeof section?.lectureCount === "number") {
		return section.lectureCount;
	}
	return Array.isArray(section?.lessons) ? section.lessons.length : 0;
};

const getSectionDuration = (section: CurriculumSection) => {
	return section?.duration ?? section?.totalDuration ?? "";
};

const onAccordionEnter = (element: Element) => {
	const el = element as HTMLElement;
	el.style.height = "0px";
	el.style.opacity = "0";
	el.style.overflow = "hidden";
	requestAnimationFrame(() => {
		el.style.height = `${el.scrollHeight}px`;
		el.style.opacity = "1";
	});
};

const onAccordionAfterEnter = (element: Element) => {
	const el = element as HTMLElement;
	el.style.height = "auto";
	el.style.opacity = "1";
};

const onAccordionLeave = (element: Element) => {
	const el = element as HTMLElement;
	el.style.height = `${el.scrollHeight}px`;
	el.style.opacity = "1";
	el.style.overflow = "hidden";
	requestAnimationFrame(() => {
		el.style.height = "0px";
		el.style.opacity = "0";
	});
};

const onAccordionAfterLeave = (element: Element) => {
	const el = element as HTMLElement;
	el.style.height = "";
	el.style.opacity = "";
	el.style.overflow = "";
};
</script>

<style scoped>
.tab-trigger {
	position: relative;
	padding: 0.75rem 1.25rem;
	border-radius: 0.75rem 0.75rem 0 0;
	font-size: 0.875rem;
	font-weight: 600;
	color: #64748b;
	background: transparent;
	transition: color 200ms ease;
}

.tab-trigger::after {
	content: "";
	position: absolute;
	left: 0%;
	bottom: -1px;
	height: 1px;
	width: 0;
	border-radius: 9999px;
	background: #10b981;
	transform: translateX(-50%);
	transition: width 220ms ease;
	translate: 50% 0%;
}

.tab-trigger:hover,
.tab-trigger:focus-visible {
	color: #0f766e;
}

.tab-trigger:hover::after,
.tab-trigger:focus-visible::after {
	width: 100%;
}

.tab-trigger.is-active {
	color: #0f766e;
}

.tab-trigger.is-active::after {
	width: 100%;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
	transition: opacity 220ms ease, transform 220ms ease;
}

.tab-fade-enter-from,
.tab-fade-leave-to {
	opacity: 0;
	transform: translateY(6px);
}


.curriculum-card {
	overflow: hidden;
	border-radius: 0;
	border: 0;
	background: transparent;
	box-shadow: none;
	transition: color 200ms ease;
}

.curriculum-header {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 0;
	background: transparent;
	border: 0;
	border-bottom: 1px solid #e2e8f0;
	cursor: pointer;
	text-align: left;
}

.curriculum-header:focus-visible {
	outline: 2px solid #0f766e;
	outline-offset: 4px;
}


.toggle-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	color: #0f172a;
	transition: color 200ms ease;
}

.toggle-icon.is-open {
	color: #0f766e;
}

.accordion-content {
	padding: 0 0 1.25rem;
	overflow: hidden;
	transition: height 240ms ease, opacity 200ms ease;
}

.lesson-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.lesson-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 0;
	border-bottom: 1px solid #e2e8f0;
	color: #0f172a;
}

.lesson-item:last-child {
	border-bottom: 0;
}

.lesson-leading {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.lesson-leading-icon {
	color: #64748b;
	font-size: 1rem;
}

.lesson-title {
	font-size: 0.95rem;
	font-weight: 600;
	color: #0f172a;
}

.lesson-meta {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.lesson-chip {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0.25rem 0.65rem;
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}

.lesson-chip--questions {
	background: #ecfdf5;
	color: #047857;
}

.lesson-chip--duration {
	background: #fcefee;
	color: #be123c;
}

.lesson-lock {
	color: #94a3b8;
	font-size: 0.875rem;
}
</style>
