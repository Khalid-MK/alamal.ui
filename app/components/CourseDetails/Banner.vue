<template>
	<section class="banner relative border-b border-border text-white">

		<ul class="shape-group">
			<li class="shape-1">
				<span></span>
			</li>
			<li class="shape-2 scene"><img data-depth="2" src="/img/shape-13.png" alt="shape"></li>
			<!-- <li class="shape-3 scene"><img data-depth="-2" src="/img/shape-15.png" alt="shape"></li> -->
			<li class="shape-4">
				<span></span>
			</li>
			<li class="shape-5 scene"><img data-depth="2" src="/img/shape-07.png" alt="shape"></li>
		</ul>

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

			<div class="mt-12 md:mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div class="max-w-3xl space-y-4">
					<h1 class="text-2xl sm:text-3xl
         font-bold spartan
         leading-tight sm:leading-snug md:leading-normal
         mt-4 sm:mt-6 md:mt-8">
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
	left: 1rem;
}

nav i {
	color: var(--color-heading);
}

.banner {
	position: relative;
	background: #f5f9fa;
	min-height: 348px;
	width: 100%;
	overflow: hidden;
}

.banner>.relative {
	position: relative;
	z-index: 1;
}

.banner h1 {
	margin-bottom: 4px;
	line-height: 1.4;
	max-width: 644px;
}

.course-meta-icon {
	padding-right: 14px;
	font-size: 24px;
	color: var(--color-primary);
}

.shape-group {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: 0;
	padding: 0;
	list-style: none;
	pointer-events: none;
}

.shape-group li {
	position: absolute;
	z-index: 0;
}

.shape-group li img,
.shape-group li span {
	display: block;
}

.shape-group li img {
	max-width: none;
	height: auto;
}

.shape-group li span {
	height: 100%;
	width: 100%;
}

.shape-group li.shape-1 {
	top: -160px;
	left: -120px;
	width: 320px;
	height: 320px;
}

.shape-group li.shape-1 span {
	border: 1px solid var(--color-border);
	border-radius: 50%;
}

.shape-group li.shape-2 {
	top: 80px;
	left: 8%;
}

.shape-group li.shape-3 {
	bottom: 60px;
	right: 50%;
}

.shape-group li.shape-4 {
	top: -100px;
	right: -140px;
	width: 420px;
	height: 420px;
}

.shape-group li.shape-4 span {
	border: 1px solid var(--color-border);
	border-radius: 50%;
}

.shape-group li.shape-5 {
	top: 40px;
	right: 6%;
}

@media (max-width: 1199px) {
	.shape-group li.shape-4 {
		top: -140px;
		right: -200px;
	}
}

@media (max-width: 991px) {
	.shape-group {
		display: none;
	}
}
</style>
