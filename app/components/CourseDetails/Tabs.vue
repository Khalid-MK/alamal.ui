<template>
	<div class="space-y-10">
		<div class="tab-header">
			<div class="tab-nav" role="tablist" aria-label="Course details tabs">
				<button v-for="tab in tabItems" :key="tab.key" type="button" class="tab-trigger"
					:class="{ 'is-active': activeTab === tab.key }" role="tab" @click="activeTab = tab.key"
					:aria-selected="activeTab === tab.key" :aria-controls="`tab-panel-${tab.key}`" :id="`tab-${tab.key}`">
					{{ t(tab.labelKey) }}
				</button>
			</div>
		</div>

		<Transition name="tab-fade" mode="out-in">
			<div :key="activeTab" :id="`tab-panel-${activeTab}`" class="space-y-10" role="tabpanel"
				:aria-labelledby="`tab-${activeTab}`">
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
	// { key: "curriculum", labelKey: "Curriculum" },
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
.tab-header {
	margin-top: clamp(2rem, 5vw, 4.5rem);
	margin-bottom: clamp(2rem, 5vw, 4.5rem);
	border-bottom: 1px solid var(--color-border);
}

.tab-nav {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.75rem;
}

@media (min-width: 640px) {
	.tab-nav {
		margin-inline: 0;
		padding-inline: 0;
	}
}

@media (min-width: 1024px) {
	.tab-nav {
		flex-wrap: wrap;
		justify-content: center;
	}
}

.tab-trigger {
	position: relative;
	padding: 0.75rem 1.25rem;
	border-radius: 0.75rem 0.75rem 0 0;
	transition: color 200ms ease;


	font-weight: 600;
	font-size: 16px;
	line-height: 28px;
	background: transparent;
	padding: 15px 25px;
	position: relative;
	color: var(--color-body);
	font-family: var(--font-secondary);
}

.tab-trigger::after {
	content: "";
	position: absolute;
	left: 0%;
	bottom: -1px;
	height: 1px;
	width: 0;
	z-index: 10000;
	background: var(--color-primary);
	transform: translateX(0%);
	transition: width 220ms ease;
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
