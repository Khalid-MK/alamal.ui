<template>
	<section class="space-y-10">
		<div class="space-y-4">
			<h2 class="text-2xl font-semibold text-slate-900">
				{{ t("CourseDescription") }}
			</h2>
			<p v-if="course?.description" class="leading-relaxed text-slate-600">
				{{ course.description }}
			</p>
			<p v-else class="leading-relaxed text-slate-500">
				{{ t("NotAvailable") }}
			</p>
		</div>

		<div v-if="course?.infoList?.length" class="space-y-4">
			<h3 class="text-2xl font-semibold text-slate-900">
				{{ t("WhatYouWillLearn") }}
			</h3>
			<ul class="space-y-3">
				<li v-for="(item, index) in course.infoList" :key="index" class="flex items-start gap-3 text-slate-600">
					<i class="fa-solid fa-check mt-1 text-emerald-500"></i>
					<span>{{ item.infoListTitle }}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	course: Record<string, any> | null;
}>();

const { t } = useI18n();

const course = computed(() => props.course ?? null);
</script>
