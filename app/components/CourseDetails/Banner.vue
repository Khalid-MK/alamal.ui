<template>
	<section class="relative border-b border-slate-200 text-white" :style="bannerStyle">
		<div class="absolute inset-0 bg-slate-900/70"></div>
		<div class="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
			<nav class="flex flex-wrap items-center gap-2 text-sm text-slate-200/80">
				<NuxtLink to="/" class="transition hover:text-white">
					{{ $t("Home") }}
				</NuxtLink>
				<span class="text-slate-200/70">/</span>
				<NuxtLink to="/courses" class="transition hover:text-white">
					{{ $t("Courses") }}
				</NuxtLink>
				<span class="text-slate-200/70">/</span>
				<span class="font-semibold text-white">{{ course?.title }}</span>
			</nav>

			<div class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div class="max-w-3xl space-y-4">
					<h1 class="text-3xl font-bold md:text-4xl">
						{{ course?.title }}
					</h1>
					<div class="flex flex-wrap items-center gap-4 text-sm text-slate-100/90">
						<div v-if="course?.instructor" class="flex items-center gap-2">
							<i class="fa-regular fa-circle-user text-primary"></i>
							<span>
								<span class="text-slate-200/80">{{ $t("Instructor") }}:</span>
								{{ course.instructor }}
							</span>
						</div>
						<div class="flex items-center gap-2">
							<i class="fa-solid fa-globe text-primary"></i> <span>
								<span class="text-slate-200/80">{{ $t("Language") }}:</span>
								{{ displayLanguage }}
							</span>
						</div>
						<div v-if="course?.productRating?.length" class="flex items-center gap-1 text-yellow-300">
							<i v-for="(icon, index) in course.productRating" :key="`${icon}-${index}`"
								:class="icon || 'fa-regular fa-star'"></i>
							<span class="ml-2 text-slate-100">({{ ratingCount }})</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	course: Record<string, any> | null;
	ratingCount: string;
	displayLanguage: string;
}>();

const bannerStyle = computed(() => ({
	backgroundImage: props.course?.courseImage
		? `url(${props.course.courseImage})`
		: "url(/img/courses/banner.png)",
	backgroundSize: "cover",
	backgroundPosition: "center",
}));
</script>
