<template>
	<section class="space-y-10">
		<div class="space-y-4">
			<h2 class="text-2xl font-semibold text-heading">
				{{ t("CourseDescription") }}
			</h2>
			<p v-if="course?.description" class="leading-relaxed text-body">
				{{ course.description }}
			</p>
			<p v-else class="leading-relaxed text-body-muted">
				{{ t("NotAvailable") }}
			</p>
		</div>

		<div v-if="course?.infoList?.length" class="space-y-4">
			<h3 class="text-2xl font-semibold text-heading">
				{{ t("WhatYouWillLearn") }}
			</h3>
			<ul class="space-y-3">
				<li v-for="(item, index) in course.infoList" :key="index" class="flex items-start gap-3 text-body">
					<i :class="['icon', checkIcon, 'mt-1', 'text-success']"></i>
					<span>{{ item.infoListTitle }}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { getIconClass } from "@/constant/iconMap";

const props = defineProps<{
	course: Record<string, any> | null;
}>();

const { t } = useI18n();

const course = computed(() => props.course ?? null);

const checkIcon = getIconClass("check");
</script>
