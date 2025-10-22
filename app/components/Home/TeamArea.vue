<template>
	<div class="team-area relative py-20 md:py-16 sm:py-12 overflow-hidden">
		<!-- Quran Calligraphy (Floating) -->
		<div class="team-area_quran" style="
				background-image: url('/img/islamic-shapes/decorative/vector-9.png');
				filter: drop-shadow(2px 4px 6px black);
			"></div>

		<!-- Container -->
		<div class="container mx-auto py-16 px-4 max-w-[1185px] relative z-10">
			<!-- Section Title -->
			<div ref="sectionTitleRef" class="text-center mb-16 opacity-0 transition-all duration-800"
				:class="{ 'animate-fade-up': isTitleVisible }">
				<span class="inline-block text-[var(--color-secondary)] font-medium mb-3 text-sm md:text-base">
					{{ $t("teamArea.preTitle") }}
				</span>
				<h2 class="font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--color-heading)] mb-4">
					{{ $t("teamArea.title") }}
				</h2>
				<span class="inline-block text-lg md:text-xl lg:text-2xl text-[var(--color-primary)]">
					<i class="icon-19"></i>
				</span>
			</div>

			<!-- Team Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
				<div v-for="(member, index) in teamMembers" :key="member.id" ref="teamCardsRef"
					class="opacity-0 transition-all duration-800" :class="{ 'animate-fade-up': areCardsVisible[index] }"
					:style="{ transitionDelay: `${index * 100}ms` }">
					<TeamCard :member="member" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

interface TeamMember {
	id: string | number;
	nameKey: string;
	designationKey: string;
	image: string;
	socialLinks: SocialLink[];
}

// Refs for Intersection Observer
const sectionTitleRef = ref<HTMLElement | null>(null);
const teamCardsRef = ref<HTMLElement[]>([]);
const isTitleVisible = ref(false);
const areCardsVisible = ref<boolean[]>([false, false, false]);

// Team members data - store translation keys only
const teamMembers: TeamMember[] = [
	{
		id: 1,
		nameKey: "teamArea.members.member1.name",
		designationKey: "teamArea.members.member1.designation",
		image: "/img/team/team-22.webp",
		socialLinks: [
			{ platform: "Facebook", url: "#", icon: "icon-facebook" },
			{ platform: "Twitter", url: "#", icon: "icon-twitter" },
			{ platform: "LinkedIn", url: "#", icon: "icon-linkedin2" },
		],
	},
	{
		id: 2,
		nameKey: "teamArea.members.member2.name",
		designationKey: "teamArea.members.member2.designation",
		image: "/img/team/team-23.webp",
		socialLinks: [
			{ platform: "Facebook", url: "#", icon: "icon-facebook" },
			{ platform: "Twitter", url: "#", icon: "icon-twitter" },
			{ platform: "LinkedIn", url: "#", icon: "icon-linkedin2" },
		],
	},
	{
		id: 3,
		nameKey: "teamArea.members.member3.name",
		designationKey: "teamArea.members.member3.designation",
		image: "/img/team/team-24.webp",
		socialLinks: [
			{ platform: "Facebook", url: "#", icon: "icon-facebook" },
			{ platform: "Twitter", url: "#", icon: "icon-twitter" },
			{ platform: "LinkedIn", url: "#", icon: "icon-linkedin2" },
		],
	},
];

// Intersection Observer for scroll animations
if (typeof window !== 'undefined') {
	let observer: IntersectionObserver | null = null;

	onMounted(() => {
		const observerOptions = {
			threshold: 0.01,
			rootMargin: "0px 0px -50px 0px",
		};

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (entry.target === sectionTitleRef.value) {
						isTitleVisible.value = true;
					} else {
						const index = teamCardsRef.value.indexOf(entry.target as HTMLElement);
						if (index !== -1) {
							areCardsVisible.value[index] = true;
						}
					}
					observer?.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// Observe section title
		if (sectionTitleRef.value) {
			observer.observe(sectionTitleRef.value);
		}

		// Observe team cards
		teamCardsRef.value.forEach((card) => {
			if (card) {
				observer?.observe(card);
			}
		});
	});

	// Cleanup on unmount
	onBeforeUnmount(() => {
		observer?.disconnect();
	});
}
</script>

<style scoped>
.team-area {
	background-image: url("/img/bg/scholar-bg.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	/* mask-image: url(/img/bg/mask-061.png); */
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	isolation: isolate;
	z-index: 1;
}

@keyframes moveUpDown {

	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-20px);
	}
}


.team-area_quran {
	position: absolute;
	z-index: 1;
	right: 8%;
	top: 15%;
	width: 110px;
	height: 110px;
	background-repeat: no-repeat;
	background-size: contain;
	animation: moveUpDown 4s infinite;

	[dir="rtl"] & {
		right: auto;
		left: 8%;
	}

	@media (max-width: 1023px) {
		right: 60px;
		top: 70px;
		width: 85px;
		height: 85px;

		[dir="rtl"] & {
			right: auto;
			left: 60px;
		}
	}

	@media (max-width: 767px) {
		right: 30px;
		top: 50px;
		width: 60px;
		height: 60px;

		[dir="rtl"] & {
			right: auto;
			left: 30px;
		}
	}
}

/* Fade up animation */
@keyframes fadeUp {
	0% {
		opacity: 0;
		transform: translateY(30px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-up {
	animation: fadeUp 0.8s ease-out forwards;
	opacity: 1 !important;
}

/* Grid gap utilities */
.gap-12 {
	gap: 3rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
	.gap-12 {
		gap: 2rem;
	}
}

@media (max-width: 640px) {
	.gap-12 {
		gap: 2.5rem;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.animate-fade-up {
		animation: none !important;
		opacity: 1 !important;
		transform: none !important;
	}

	* {
		transition-duration: 0.01ms !important;
	}
}

/* RTL support */
html[dir="rtl"] .animate-fade-up {
	animation: fadeUp 0.8s ease-out forwards;
}
</style>
