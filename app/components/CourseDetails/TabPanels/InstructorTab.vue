<template>
	<div
		class="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 shadow-darker3 sm:flex-row sm:items-start">
		<div class="flex flex-none justify-center">
			<img v-if="course?.instructorImage" src="" :alt="course?.instructor"
				class="h-[170px] w-[170px] rounded-xl border border-border object-cover" />
			<div v-else
				class="flex h-[170px] w-[170px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted text-sm font-semibold tracking-wide text-body-muted">
				170X170
			</div>
		</div>
		<div class="flex-1 space-y-5">
			<div class="space-y-1">
				<h3 class="text-2xl font-semibold text-heading">
					{{ instructorName }}
				</h3>
				<p class="text-base font-medium text-body-muted">
					<!-- {{ instructorRole }} -->
					Instructor
				</p>
			</div>
			<p class="leading-relaxed text-body">
				<!-- {{ instructorBio }} -->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis dolores temporibus qui veniam vitae porro
				sunt aut nobis maxime similique, provident rem, ipsam voluptates cum eaque natus ipsa a. Voluptas!
			</p>
			<div v-if="socialLinks.length" class="flex items-center gap-3">
				<a v-for="link in socialLinks" :key="link.icon" :href="link.href" target="_blank" rel="noopener"
					class="social-link flex h-10 w-10 items-center justify-center rounded-full border border-border text-body-muted"
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
		brandColor: "var(--color-facebook)",
	},
	{
		icon: "fa-brands fa-x-twitter",
		label: "X",
		href: "#",
		brandColor: "var(--color-twitter)",
	},
	{
		icon: "fa-brands fa-linkedin-in",
		label: "LinkedIn",
		href: "#",
		brandColor: "var(--color-linkedin)",
	},
	{
		icon: "fa-brands fa-youtube",
		label: "YouTube",
		href: "#",
		brandColor: "var(--color-youtube)",
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
			brandColor: link.brandColor || "var(--color-primary)",
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
	color: var(--color-white);
}
</style>
