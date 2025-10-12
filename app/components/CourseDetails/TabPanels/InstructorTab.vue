<template>
	<div
		class="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start">
		<div class="flex flex-none justify-center">
			<img v-if="course?.instructorImage" src="" :alt="course?.instructor"
				class="h-[170px] w-[170px] rounded-xl border border-slate-200 object-cover" />
			<div v-else
				class="flex h-[170px] w-[170px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm font-semibold tracking-wide text-slate-400">
				170X170
			</div>
		</div>
		<div class="flex-1 space-y-5">
			<div class="space-y-1">
				<h3 class="text-2xl font-semibold text-slate-900">
					{{ instructorName }}
				</h3>
				<p class="text-base font-medium text-slate-500">
					<!-- {{ instructorRole }} -->
					Instructor
				</p>
			</div>
			<p class="leading-relaxed text-slate-600">
				<!-- {{ instructorBio }} -->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis dolores temporibus qui veniam vitae porro
				sunt aut nobis maxime similique, provident rem, ipsam voluptates cum eaque natus ipsa a. Voluptas!
			</p>
			<div v-if="socialLinks.length" class="flex items-center gap-3">
				<a v-for="link in socialLinks" :key="link.icon" :href="link.href" target="_blank" rel="noopener"
					class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500"
					:style="{ '--brand-color': link.brandColor }">
					<i :class="link.icon"></i>
					<span class="sr-only">{{ link.label }}</span>
				</a>
			</div>
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

const course = computed(() => props.course ?? null);

const defaultInstructorBio = computed(() => t("InstructorBioPlaceholder"));

const instructorName = computed(() => course.value?.instructor || t("NotAvailable"));

const instructorRole = computed(() => {
	return course.value?.instructorRole || course.value?.instructorTitle || "";
});

const instructorBio = computed(() => course.value?.instructorBio || defaultInstructorBio.value);

type SocialLink = { icon: string; label: string; href: string; brandColor: string };

const defaultSocialLinks: SocialLink[] = [
	{
		icon: "fa-brands fa-facebook-f",
		label: "Facebook",
		href: "#",
		brandColor: "#1877F2",
	},
	{
		icon: "fa-brands fa-x-twitter",
		label: "X",
		href: "#",
		brandColor: "#17191C",
	},
	{
		icon: "fa-brands fa-linkedin-in",
		label: "LinkedIn",
		href: "#",
		brandColor: "#0A66C2",
	},
	{
		icon: "fa-brands fa-youtube",
		label: "YouTube",
		href: "#",
		brandColor: "#FF0000",
	},
];

const socialLinks = computed(() => {
	const rawLinks = course.value?.instructorSocialLinks;
	if (!Array.isArray(rawLinks) || rawLinks.length === 0) {
		return defaultSocialLinks;
	}

	const normalized: SocialLink[] = rawLinks
		.filter((link: any) => link && link.icon && link.href)
		.map((link: any) => ({
			icon: link.icon,
			label: link.label || "",
			href: link.href,
			brandColor: link.brandColor || "#2563EB",
		}));

	return normalized.length ? normalized : defaultSocialLinks;
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

.social-link {
	transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.social-link:hover {
	background-color: var(--brand-color);
	border-color: var(--brand-color);
	color: #fff;
}
</style>
