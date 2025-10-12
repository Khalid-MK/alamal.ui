<template>
	<section class="space-y-10">
		<div class="space-y-3">
			<h2 class="text-2xl font-semibold text-slate-900">
				{{ t("CourseRatingHeading") }}
			</h2>
			<p class="text-sm text-slate-500">
				{{ t("CourseRatingSubtitle", { average: formattedAverage, total: totalRatings }) }}
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:items-center">
			<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
				<p class="text-xs font-medium uppercase tracking-wide text-emerald-600">
					{{ t("OverallRating") }}
				</p>
				<p class="mt-3 text-5xl font-semibold text-slate-900">
					{{ formattedAverage }}
				</p>
				<div class="mt-2 flex justify-center gap-1 text-amber-400">
					<i v-for="star in 5" :key="star" class="fa-solid fa-star"></i>
				</div>
				<p class="mt-2 text-xs font-medium text-slate-500">
					{{ t("ReviewCount", { count: totalRatings }) }}
				</p>
			</div>

			<div class="space-y-3">
				<div v-for="item in ratingDistribution" :key="item.stars" class="flex items-center gap-4">
					<span class="w-5 text-sm font-semibold text-slate-700">{{ item.stars }}</span>
					<div class="h-2 flex-1 rounded-full bg-slate-200">
						<div class="h-full rounded-full bg-amber-400" :style="{ width: getDistributionWidth(item.count) }"></div>
					</div>
					<span class="w-6 text-right text-sm text-slate-600">{{ item.count }}</span>
				</div>
			</div>
		</div>

		<div class="space-y-8">
			<h3 class="text-2xl font-semibold text-slate-900">
				{{ t("Reviews") }}
			</h3>
			<article v-for="review in reviews" :key="review.id"
				class="space-y-6 border-b border-slate-200 pb-8 last:border-none last:pb-0">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div
						class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-400">
						{{ review.avatarPlaceholder }}
					</div>
					<div class="flex-1 space-y-3">
						<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p class="text-lg font-semibold text-slate-900">{{ review.name }}</p>
								<p class="text-sm text-slate-500">{{ review.date }}</p>
							</div>
							<div class="flex items-center gap-2 text-amber-400">
								<i v-for="star in review.rating" :key="star" class="fa-solid fa-star"></i>
							</div>
						</div>
						<p class="leading-relaxed text-slate-600">{{ review.comment }}</p>
					</div>
				</div>
			</article>
		</div>

		<div class="space-y-6">
			<h3 class="text-2xl font-semibold text-slate-900">
				{{ t("WriteReview") }}
			</h3>
			<form class="space-y-6" @submit.prevent="handleSubmit">
				<div class="flex flex-wrap items-center gap-3">
					<p class="text-sm font-medium text-slate-700">{{ t("RatingHere") }}</p>
					<div class="flex gap-1 text-xl">
						<button v-for="star in 5" :key="star" type="button"
							class="text-amber-400 transition-colors hover:text-amber-500" @click="form.rating = star"
							:aria-pressed="form.rating === star" :aria-label="t('StarRatingLabel', { rating: star })">
							<i :class="form.rating >= star ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
						</button>
					</div>
				</div>

				<div class="grid gap-4 md:grid-cols-2">
					<input v-model="form.title" type="text" :class="inputClasses" :placeholder="t('ReviewTitlePlaceholder')" />
					<input v-model="form.name" type="text" :class="inputClasses" :placeholder="t('ReviewerNamePlaceholder')" />
				</div>
				<div class="grid gap-4 md:grid-cols-2">
					<input v-model="form.email" type="email" :class="inputClasses" :placeholder="t('ReviewerEmailPlaceholder')" />
					<input v-model="form.summary" type="text" :class="inputClasses"
						:placeholder="t('ReviewSummaryPlaceholder')" />
				</div>
				<textarea v-model="form.details" rows="4" :class="[inputClasses, 'resize-none']"
					:placeholder="t('ReviewDetailsPlaceholder')"></textarea>

				<button type="submit"
					class="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
					{{ t("SubmitReview") }}
					<i class="fa-solid fa-arrow-right ms-2 text-xs"></i>
				</button>
			</form>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	course: Record<string, any> | null;
}>();

const { t } = useI18n();

const ratingDistribution = [
	{ stars: 5, count: 7 },
	{ stars: 4, count: 0 },
	{ stars: 3, count: 0 },
	{ stars: 2, count: 0 },
	{ stars: 1, count: 0 },
];

const reviews = [
	{
		id: 1,
		name: "Haley Bennet",
		date: "Oct 10, 2024",
		rating: 5,
		comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		avatarPlaceholder: "80X80",
	},
	{
		id: 2,
		name: "Simon Baker",
		date: "Oct 10, 2024",
		rating: 5,
		comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		avatarPlaceholder: "80X80",
	},
	{
		id: 3,
		name: "Richard Gere",
		date: "Oct 10, 2024",
		rating: 5,
		comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		avatarPlaceholder: "80X80",
	},
];

const totalRatings = computed(() => ratingDistribution.reduce((sum, item) => sum + item.count, 0));
const totalReviews = computed(() => reviews.length);
const averageRating = computed(() => {
	if (!totalRatings.value) return 0;
	const totalWeighted = ratingDistribution.reduce((sum, item) => sum + item.stars * item.count, 0);
	return totalWeighted / totalRatings.value;
});

const formattedAverage = computed(() => averageRating.value.toFixed(2));

const inputClasses =
	"w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100";

const form = reactive({
	rating: 0,
	title: "",
	name: "",
	email: "",
	summary: "",
	details: "",
});

const getDistributionWidth = (count: number) => {
	if (!totalRatings.value) return "0%";
	return `${(count / totalRatings.value) * 100}%`;
};

const handleSubmit = () => {
	// Submission handling will be wired up with backend/API integration.
};
</script>
