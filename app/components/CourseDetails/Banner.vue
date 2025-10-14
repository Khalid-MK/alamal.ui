<template>
	<section class="banner relative border-b border-border text-white">
		<!-- <div class="absolute inset-0 bg-slate-900/70"></div> -->
		<div class="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
			<nav class="flex flex-wrap items-center gap-2 text-sm spartan">
				<NuxtLink to="/" class="transition hover:text-primary">
					{{ $t("Home") }}
				</NuxtLink>
				<span class="text-black">/</span>
				<NuxtLink to="/courses" class="transition hover:text-primary">
					{{ $t("Courses") }}
				</NuxtLink>
				<span class="text-black">/</span>
				<span class="font-bold">{{ course?.title }}</span>
			</nav>

			<div class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div class="max-w-3xl space-y-4">
					<h1 class="text-3xl font-bold md:text-4xl spartan">
						{{ course?.title }}
					</h1>
					<div class="flex flex-wrap items-center gap-4 text-sm text-primary">
						<div v-if="course?.instructor" class="flex items-center pr-4 border-r-2">
							<i class="icon icon-58 text-primary course-meta-icon"></i>
							<span class="text-heading font-semibold">{{ course.instructor }}</span>
						</div>

						<div class="flex items-center pr-4 border-r-2">
							<i class="icon icon-59 text-primary course-meta-icon"></i>
							<span class="text-heading font-semibold">{{ displayLanguage }}</span>
						</div>

						<div v-if="ratingIconClasses.length" class="flex items-center gap-1 text-warning">
							<i v-for="(iconClass, index) in ratingIconClasses" :key="`rating-star-${index}`" class="icon icon-23"></i>
							<span class="ml-2 text-heading font-semibold">({{ ratingCount }} Rating)</span>
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
</script>

<style scoped>
nav {
	color: var(--color-heading);
	position: absolute;
	top: 1rem;
	left: 0;
}

nav i {
	color: var(--color-heading);
}

.banner {
	background: #f5f9fa;
	height: 348px;
}

.banner h1 {
	font-size: 36px;
	margin-bottom: 4px;
	line-height: 1.4;
	max-width: 644px;
}

.course-meta-icon {
	padding-right: 14px;
	font-size: 24px;
	color: var(--color-primary);
}
</style>
