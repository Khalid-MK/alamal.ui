<template>
	<section class="space-y-10">
		<div class="space-y-3">
			<h2 class="text-2xl font-semibold text-heading">
				{{ t("CourseRatingHeading") }}
			</h2>
			<p class="text-sm text-body-muted">
				{{ t("CourseRatingSubtitle", { average: formattedAverage, total: totalRatings }) }}
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:items-center">
			<div class="rounded-2xl border border-border bg-surface p-6 text-center shadow-darker3">
				<p class="mt-3 text-5xl text-secondary font-semibold text-heading">
					{{ formattedAverage }}
				</p>
				<div class="mt-2 flex justify-center gap-1 text-warning">
					<i v-for="star in 5" :key="star" class="fa-solid fa-star"></i>
				</div>
				<p class="mt-2 text-xs font-medium text-body-muted">
					{{ t("ReviewCount", { count: totalRatings }) }}
				</p>
			</div>

			<div class="space-y-3">
				<div v-for="item in ratingDistribution" :key="item.stars" class="flex items-center gap-4">
					<span class="w-5 text-sm font-semibold text-heading">{{ item.stars }}</span>
					<div class="h-2 flex-1 rounded-full bg-border">
						<div class="h-full rounded-full bg-warning" :style="{ width: getDistributionWidth(item.count) }"></div>
					</div>
					<span class="w-6 text-right text-sm text-body">{{ item.count }}</span>
				</div>
			</div>
		</div>

		<div class="space-y-8">
			<h3 class="text-2xl font-semibold text-heading">
				{{ t("Reviews") }}
			</h3>
			<article v-for="review in reviews" :key="review.id"
				class="space-y-6 border-b border-border pb-8 last:border-none last:pb-0">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div
						class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-body-muted">
						{{ review.avatarPlaceholder }}
					</div>
					<div class="flex-1 space-y-3">
						<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p class="text-lg font-semibold text-heading">{{ review.name }}</p>
								<p class="text-sm text-body-muted">{{ review.date }}</p>
							</div>
							<div class="flex items-center gap-2 text-warning">
								<i v-for="star in review.rating" :key="star" class="fa-solid fa-star"></i>
							</div>
						</div>
						<p class="leading-relaxed text-body">{{ review.comment }}</p>
					</div>
				</div>
			</article>
		</div>

		<div class="space-y-6">
			<h3 class="text-2xl font-semibold text-heading">
				{{ t("WriteReview") }}
			</h3>
			<form class="space-y-6" @submit.prevent="handleSubmit">
				<div class="flex flex-wrap items-center gap-3">
					<p class="text-sm font-medium text-heading">{{ t("RatingHere") }}</p>
					<div class="flex gap-1 text-xl">
						<button v-for="star in 5" :key="star" type="button" class="text-warning transition-colors hover:opacity-90"
							@click="form.rating = star" :aria-pressed="form.rating === star"
							:aria-label="t('StarRatingLabel', { rating: star })">
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
					class="inline-flex items-center justify-center gap-2 rounded-lg bg-success px-6 py-3 text-sm font-semibold text-white shadow-darker transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
					{{ t("SubmitReview") }}
					<i class="fa-solid fa-arrow-right text-xs"></i>
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
	"w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-heading shadow-sm transition placeholder:text-placeholder focus:border-primary focus:outline-none focus:shadow-darker4";

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
