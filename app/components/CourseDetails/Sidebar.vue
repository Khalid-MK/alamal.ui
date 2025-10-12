<template>
	<aside class="lg:sticky lg:top-24">
		<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition lg:-mt-16 xl:-mt-20">
			<button type="button" class="group relative flex aspect-video w-full items-center justify-center overflow-hidden"
				@click="emit('open-video')">
				<img :src="videoThumbnail" :alt="course?.title" class="h-full w-full object-cover" />
				<div class="absolute inset-0 bg-slate-900/40 transition group-hover:bg-slate-900/50"></div>
				<div
					class="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg transition group-hover:bg-primary group-hover:text-white">
					<i class="fa-solid fa-play text-xl"></i>
				</div>
				<span class="sr-only">{{ $t("WatchPreview") }}</span>
			</button>

			<div class="space-y-6 p-6">
				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-slate-500">{{ $t("Price") }}</span>
					<span class="text-2xl font-bold text-primary">{{ course?.price || "—" }}</span>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-slate-900">
						{{ $t("CourseIncludes") }}
					</h3>
					<ul class="mt-4 space-y-3">
						<li v-for="fact in courseFacts" :key="fact.key"
							class="flex items-center justify-between text-sm text-slate-600">
							<span class="flex items-center gap-2 font-medium text-slate-500">
								<i :class="[fact.icon, 'text-primary']"></i>
								{{ fact.label }}
							</span>
							<span class="text-slate-900">{{ fact.value }}</span>
						</li>
					</ul>
				</div>

				<NuxtLink to="/auth/sign-up"
					class="block rounded-lg bg-primary px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-primary-hover">
					{{ $t("StartNow") }}
				</NuxtLink>
			</div>

			<div class="border-t border-slate-200 px-6 py-4">
				<span class="text-sm font-semibold text-slate-900">{{ $t("ShareOn") }}</span>
				<div class="mt-3 flex items-center gap-3">
					<a v-for="item in shareLinks" :key="item.icon" :href="item.href" target="_blank" rel="noopener"
						class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-primary hover:text-white">
						<i :class="item.icon"></i>
						<span class="sr-only">{{ item.label }}</span>
					</a>
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	course: Record<string, any> | null;
	courseFacts: Array<{ key: string; label: string; value: string; icon: string }>;
	shareLinks: Array<{ icon: string; label: string; href: string }>;
}>();

const emit = defineEmits<{ (event: "open-video"): void }>();

const videoThumbnail = computed(() => {
	return props.course?.videoThumbnail || props.course?.courseImage || "/img/courses/banner.png";
});
</script>

<style scoped>
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}
</style>
