<template>
	<div class="flex flex-col items-start gap-6 sm:flex-row">
		<img v-if="course?.instructorImage" :src="course.instructorImage" :alt="course.instructor"
			class="h-32 w-32 rounded-2xl border border-slate-200 object-cover" />
		<div class="space-y-3">
			<h3 class="text-2xl font-semibold text-slate-900">
				{{ course?.instructor || t("NotAvailable") }}
			</h3>
			<p class="leading-relaxed text-slate-600">
				{{ course?.instructorBio || defaultInstructorBio }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	course: Record<string, any> | null;
}>();

const { t } = useI18n();

const defaultInstructorBio = computed(() => t("InstructorBioPlaceholder"));

const course = computed(() => props.course ?? null);
</script>
