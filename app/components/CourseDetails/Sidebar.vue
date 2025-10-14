<template>
	<aside class="lg:sticky lg:top-24 lg:-mt-72">
		<div class="sidebar-content overflow-hidden shadow-darker transition">


			<button type="button" class="group relative block aspect-[16/9] w-full overflow-hidden"
				@click="emit('open-video')">
				<img :src="videoThumbnail" :alt="course?.title" class="absolute inset-0 h-full w-full object-cover" />
				<div class="absolute inset-0 bg-slate-900/20 transition group-hover:bg-slate-900/30"></div>
				<div class="absolute inset-0 flex items-center justify-center">
					<span
						class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-secondary shadow-lg transition group-hover:bg-primary-hover">
						<i class="icon-18"></i>
					</span>
				</div>
				<span class="sr-only">{{ $t("WatchPreview") }}</span>
			</button>

			<div class="sidebar-body">
				<div class="">
					<div>
						<h4 class="text-xl font-semibold spartan">
							{{ $t("CourseIncludes") }}
						</h4>
						<ul class="mt-5 overflow-hidden">
							<li v-for="fact in courseFacts" :key="fact.key" class="flex items-center justify-between gap-4 px-1 py-4"
								:class="{ 'border-b border-border': fact.key !== lastFactKey }">
								<div class="fact flex items-center gap-3">
									<i :class="['icon', fact.icon]"></i>
									<span>{{ fact.label }}</span>
								</div>
								<span :class="fact.key === 'price' ? 'font-bold text-xl text-secondary' : 'fact'">{{
									fact.value }}</span>
							</li>
						</ul>
					</div>

					<NuxtLink :to="{
						path: '/payment',
						query: { courseId: course?.id ?? '' },
					}" class="start-course edu-btn w-full my-4">
						{{ $t("StartNow") }}
						<i class="icon-4"></i>
					</NuxtLink>
				</div>

				<div class="mt-1">
					<span class="text-xl font-semibold mb-2">{{ $t("ShareOn") }}:</span>
					<div class="mt-3 flex items-center gap-3">
						<a v-for="item in shareLinks" :key="item.icon" :href="item.href" target="_blank" rel="noopener"
							class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-border text-body-muted"
							:style="{ '--brand-color': item.brandColor }">
							<i :class="['fa-brands', item.icon]"></i>
							<span class="sr-only">{{ item.label }}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getIconClass } from "@/constant/iconMap";

const props = defineProps<{
	course: Record<string, any> | null;
	courseFacts: Array<{ key: string; label: string; value: string; icon: string }>;
	shareLinks: Array<{ icon: string; label: string; href: string; brandColor: string }>;
}>();

const emit = defineEmits<{ (event: "open-video"): void }>();

const playIcon = getIconClass("play");

const videoThumbnail = computed(() => {
	return props.course?.videoThumbnail || props.course?.courseImage || "/img/courses/banner.png";
});

const lastFactKey = computed(() => {
	const facts = props.courseFacts ?? [];
	const last = facts[facts.length - 1];
	return last?.key ?? null;
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

.fact {
	font-size: var(--font-size-b1);
	line-height: var(--line-height-b1);
	font-weight: 500;
	color: var(--color-heading);
	font-size: 15px !important;
}

.fact span {
	font-weight: 400;
	color: var(--color-heading);
}

.social-link {
	color: var(--color-body);
	transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.social-link:hover {
	background-color: var(--brand-color);
	border-color: var(--brand-color);
	color: var(--color-white);
}

.sidebar-content {
	border: none;
	padding: 15px;
	background: #fff;
	border-radius: 5px;
}

.group {
	width: 100%;
	height: 235px;
}

.sidebar-body {
	padding: 30px 25px 25px;
}

.start-course {
	font-size: 15px;
	line-height: 32px;
	font-weight: 400;
}

.start-course i {
	font-size: 11px;
}

.edu-btn,
button.edu-btn {
	text-align: center;
	border-radius: 5px;
	display: inline-block;
	height: 60px;
	line-height: 62px;
	color: var(--edu-btn-color);
	background: var(--color-primary);
	padding: 0 30px;
	font-size: 15px;
	font-weight: 500;
	-webkit-transition: 0.4s;
	transition: 0.4s;
	font-family: var(--font-secondary);
	border: 0 none;
	overflow: hidden;
	position: relative;
	z-index: 1;
}

@media only screen and (max-width: 767px) {

	.edu-btn,
	button.edu-btn {
		padding: 0 20px;
		font-size: 14px;
		height: 50px;
		line-height: 52px;
	}
}

.edu-btn:after,
button.edu-btn:after {
	content: "";
	height: 100%;
	width: 0;
	background: -webkit-linear-gradient(right, #31b978 0%, #1ab69d 100%);
	background: linear-gradient(-90deg, #31b978 0%, #1ab69d 100%);
	border-radius: 5px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.edu-btn i,
button.edu-btn i {
	padding-left: 6px;
	position: relative;
	font-size: 11px;
}

@media only screen and (max-width: 767px) {

	.edu-btn i,
	button.edu-btn i {
		font-size: 9px;
	}
}

.edu-btn:hover:after,
button.edu-btn:hover:after {
	left: 0;
	width: 100%;
}
</style>
