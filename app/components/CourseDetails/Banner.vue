<template>
	<section class="relative border-b border-border text-white" :style="bannerStyle">
		<div class="absolute inset-0 bg-slate-900/70"></div>
		<div class="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
			<nav class="flex flex-wrap items-center gap-2 text-sm text-white/80">
				<NuxtLink to="/" class="transition hover:text-white">
					{{ $t("Home") }}
				</NuxtLink>
				<span class="text-white/70">/</span>
				<NuxtLink to="/courses" class="transition hover:text-white">
					{{ $t("Courses") }}
				</NuxtLink>
				<span class="text-white/70">/</span>
				<span class="font-semibold text-white">{{ course?.title }}</span>
			</nav>

			<div class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div class="max-w-3xl space-y-4">
					<h1 class="text-3xl font-bold md:text-4xl">
						{{ course?.title }}
					</h1>
					<div class="flex flex-wrap items-center gap-4 text-sm text-white/90">
						<div v-if="course?.instructor" class="flex items-center gap-2">
							<i :class="['icon', icons.instructor]" class="text-primary"></i>
							<span>
								<span class="text-white/80">{{ $t("Instructor") }}:</span>
								{{ course.instructor }}
							</span>
						</div>
						<div class="flex items-center gap-2">
							<i :class="['icon', icons.language]" class="text-primary"></i> <span>
								<span class="text-white/80">{{ $t("Language") }}:</span>
								{{ displayLanguage }}
							</span>
						</div>
						<div v-if="ratingIconClasses.length" class="flex items-center gap-1 text-warning">
							<i v-for="(iconClass, index) in ratingIconClasses" :key="`rating-star-${index}`"
								:class="['icon', iconClass]"></i>
							<span class="ml-2 text-white/90">({{ ratingCount }})</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getIconClass } from "@/constant/iconMap";

const props = defineProps<{
	course: Record<string, any> | null;
	ratingCount: string;
	displayLanguage: string;
}>();

const icons = {
	instructor: getIconClass("instructor"),
	language: getIconClass("language"),
	starFilled: getIconClass("starFilled"),
	starOutline: getIconClass("starOutline"),
	starHalf: getIconClass("starHalf"),
};

const resolveRatingIcon = (value: unknown): string => {
	if (typeof value !== "string") {
		return icons.starOutline;
	}
	if (value.startsWith("icon-")) {
		return value;
	}
	const lower = value.toLowerCase();
	if (lower.includes("half")) {
		return icons.starHalf;
	}
	if (lower.includes("regular") || lower.includes("outline") || lower.includes("empty") || lower.includes("far") || lower.includes("light")) {
		return icons.starOutline;
	}
	if (lower.includes("star")) {
		return icons.starFilled;
	}
	return icons.starFilled;
};

const ratingIconClasses = computed(() => {
	if (!props.course) {
		return [] as string[];
	}
	const source = Array.isArray(props.course.productRating) ? props.course.productRating.slice(0, 5) : [];
	if (!source.length) {
		return [] as string[];
	}
	const resolved = source.map(resolveRatingIcon);
	while (resolved.length < 5) {
		resolved.push(icons.starOutline);
	}
	return resolved;
});

const bannerStyle = computed(() => ({
	backgroundImage: props.course?.courseImage
		? `url(${props.course.courseImage})`
		: "url(/img/courses/banner.png)",
	backgroundSize: "cover",
	backgroundPosition: "center",
}));
</script>
