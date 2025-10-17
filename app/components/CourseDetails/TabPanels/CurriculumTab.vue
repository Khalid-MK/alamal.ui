<template>
	<div class="space-y-4">
		<div v-for="(section, index) in curriculumSections" :key="sectionKey(section, index)"
			:class="['curriculum-card', { 'is-open': isSectionActive(section, index) }]">
			<button type="button" class="curriculum-header" @click="toggleSection(section, index)"
				:aria-expanded="isSectionActive(section, index)">
				<span class="flex items-center gap-3">
					<span class="toggle-icon" :class="{ 'is-open': isSectionActive(section, index) }">
						<i :class="['icon', isSectionActive(section, index) ? icons.minus : icons.plus]"></i>
					</span>
					<span class="text-lg font-semibold text-heading">{{ section.title }}</span>
				</span>
				<span class="flex items-center gap-2 text-sm text-body-muted">
					<span>
						{{ getLessonCount(section) }} {{ t("Lessons") }}
					</span>
					<span v-if="getSectionDuration(section)" class="text-body-muted opacity-60">•</span>
					<span v-if="getSectionDuration(section)" class="text-body-muted">
						{{ getSectionDuration(section) }}
					</span>
				</span>
			</button>

			<Transition @enter="onAccordionEnter" @after-enter="onAccordionAfterEnter" @leave="onAccordionLeave"
				@after-leave="onAccordionAfterLeave">
				<div v-show="isSectionActive(section, index)" class="accordion-content">
					<ul v-if="Array.isArray(section.lessons) && section.lessons.length" class="lesson-list">
						<li v-for="(lesson, lessonIndex) in section.lessons" :key="lessonKey(section, index, lesson, lessonIndex)"
							class="lesson-item">
							<div class="lesson-leading">
								<i :class="['icon', icons.lesson, 'lesson-leading-icon']"></i>
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
								<i v-if="isLessonLocked(lesson)" :class="['icon', icons.lock, 'lesson-lock']"></i>
							</div>
						</li>
					</ul>
					<p v-else class="px-5 pb-5 text-sm text-body-muted">
						{{ t("NotAvailable") }}
					</p>
				</div>
			</Transition>
		</div>
	</div>
	<p v-if="!curriculumSections.length" class="text-body-muted">
		{{ t("NotAvailable") }}
	</p>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { getIconClass } from "@/constant/iconMap";

const props = defineProps<{
	course: Record<string, any> | null;
}>();

const { t } = useI18n();

const icons = {
	plus: getIconClass("plus"),
	minus: getIconClass("minus"),
	lesson: getIconClass("lesson"),
	lock: getIconClass("lock"),
};

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

const curriculumSections = computed<CurriculumSection[]>(() => {
	return Array.isArray(props.course?.curriculums) ? props.course!.curriculums : [];
});

const activeSectionKey = ref<string | null>(null);

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

interface CurriculumLessonObject {
	title?: string;
	duration?: string;
	locked?: boolean;
	preview?: boolean;
	questions?: number | string;
	questionCount?: number;
	questionsLabel?: string;
}

type CurriculumLesson = string | CurriculumLessonObject;

type CurriculumSection = {
	id?: string | number;
	title?: string;
	lessons?: CurriculumLesson[];
	duration?: string;
	totalDuration?: string;
	lectureCount?: number;
};
</script>

<style scoped>
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
	border-bottom: 1px solid var(--color-border);
	cursor: pointer;
	text-align: left;
}

.curriculum-header:focus-visible {
	outline: 2px solid var(--color-primary);
	outline-offset: 4px;
}

.toggle-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	color: var(--color-heading);
	transition: color 200ms ease;
}

.toggle-icon.is-open {
	color: var(--color-primary);
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
	border-bottom: 1px solid var(--color-border);
	color: var(--color-heading);
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
	color: var(--color-title);
	font-size: 1rem;
}

.lesson-title {
	font-size: 0.95rem;
	font-weight: 600;
	color: var(--color-heading);
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
	background: var(--color-lighten02);
	color: var(--color-primary);
}

.lesson-chip--duration {
	background: var(--color-lighten04);
	color: var(--color-secondary);
}

.lesson-lock {
	color: var(--color-title);
	font-size: 0.875rem;
}
</style>
