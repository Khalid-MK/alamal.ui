<template>
	<div class="space-y-10">
		<div class="flex flex-wrap justify-center gap-3 border-b border-border">
			<button v-for="tab in tabItems" :key="tab.key" type="button" class="tab-trigger"
				:class="{ 'is-active': activeTab === tab.key }" @click="activeTab = tab.key"
				:aria-pressed="activeTab === tab.key">
				{{ t(tab.labelKey) }}
			</button>
		</div>

		<Transition name="tab-fade" mode="out-in">
			<div :key="activeTab" class="space-y-10">
				<component :is="currentTabComponent" :course="course" />
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import CurriculumTab from "./TabPanels/CurriculumTab.vue";
import InstructorTab from "./TabPanels/InstructorTab.vue";
import OverviewTab from "./TabPanels/OverviewTab.vue";
import ReviewsTab from "./TabPanels/ReviewsTab.vue";

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

const tabComponents = {
	overview: OverviewTab,
	curriculum: CurriculumTab,
	instructor: InstructorTab,
	reviews: ReviewsTab,
} as const;

const currentTabComponent = computed(() => tabComponents[activeTab.value]);

const { t } = useI18n();
</script>

<style scoped>
.tab-trigger {
	position: relative;
	padding: 0.75rem 1.25rem;
	border-radius: 0.75rem 0.75rem 0 0;
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--color-title);
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
	background: var(--color-primary);
	transform: translateX(-50%);
	transition: width 220ms ease;
	translate: 50% 0%;
}

.tab-trigger:hover,
.tab-trigger:focus-visible {
	color: var(--color-primary);
}

.tab-trigger:hover::after,
.tab-trigger:focus-visible::after {
	width: 100%;
}

.tab-trigger.is-active {
	color: var(--color-primary);
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
</style>
