<template>
	<div class="space-y-10">
		<div class="flex flex-wrap gap-3 border-b border-slate-200">
			<button v-for="tab in tabItems" :key="tab.key" type="button"
				class="rounded-t-md px-4 py-2 text-sm font-medium transition" :class="activeTab === tab.key
						? 'border border-slate-200 border-b-white bg-white text-primary shadow-sm'
						: 'text-slate-500 hover:text-primary'
					" @click="activeTab = tab.key">
				{{ $t(tab.labelKey) }}
			</button>
		</div>

		<div class="space-y-10">
			<div v-if="activeTab === 'overview'" class="space-y-8">
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

				<section v-if="course?.requirements" class="space-y-4">
					<h3 class="text-2xl font-semibold text-slate-900">
						{{ $t("Requirements") }}
					</h3>
					<p class="leading-relaxed text-slate-600">
						{{ course.requirements }}
					</p>
				</section>
			</div>

			<div v-else-if="activeTab === 'curriculum'" class="space-y-6">
				<div v-for="(section, index) in course?.curriculums" :key="`${section.title}-${index}`"
					class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="flex items-start justify-between gap-4">
						<h3 class="text-lg font-semibold text-slate-900">
							{{ section.title }}
						</h3>
						<span class="text-sm text-slate-500">
							{{ section.lessons?.length ?? 0 }} {{ $t("Lessons") }}
						</span>
					</div>
					<ul class="mt-3 space-y-2 text-slate-600">
						<li v-for="(lesson, lessonIndex) in section.lessons" :key="`${lessonIndex}-${lesson}`" class="flex gap-3">
							<span class="font-semibold text-primary">{{ lessonIndex + 1 }}.</span>
							<span>{{ lesson }}</span>
						</li>
					</ul>
				</div>
				<p v-if="!course?.curriculums?.length" class="text-slate-500">
					{{ $t("NotAvailable") }}
				</p>
			</div>

			<div v-else-if="activeTab === 'instructor'" class="space-y-6">
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
			</div>

			<div v-else-if="activeTab === 'reviews'" class="space-y-4">
				<p class="leading-relaxed text-slate-600">
					{{ $t("ReviewsPlaceholder") }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	course: Record<string, any> | null;
}>();

const activeTab = ref<"overview" | "curriculum" | "instructor" | "reviews">("overview");

const tabItems = [
	{ key: "overview", labelKey: "Overview" },
	{ key: "curriculum", labelKey: "Curriculum" },
	{ key: "instructor", labelKey: "Instructor" },
	{ key: "reviews", labelKey: "Reviews" },
] as const;

const { t } = useI18n();

const defaultInstructorBio = computed(() => t("InstructorBioPlaceholder"));
</script>
