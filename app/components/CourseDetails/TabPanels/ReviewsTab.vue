<template>
	<section class="space-y-10">
		<div class="space-y-3">
			<h2 class="text-3xl font-semibold text-heading spartan">
				{{ t("CourseRatingHeading") }}
			</h2>
			<p class="text-sm text-body-muted">
				{{ t("CourseRatingSubtitle", { average: formattedAverage, total: totalRatings }) }}
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:items-center">
			<div class="rate-box text-center">
				<p class="rating-number mb-3 text-secondary font-semibold spartan">
					{{ formattedAverage }}
				</p>
				<div class="mb-3 flex justify-center gap-1 text-[#f8b81f]">
					<i v-for="star in 5" :key="star" class="fa-solid fa-star"></i>
				</div>
				<p class="text-xs font-medium text-[#808080]">
					{{ t("ReviewCount", { count: totalRatings }) }}
				</p>
			</div>

			<div class="space-y-3">
				<div v-for="item in ratingDistribution" :key="item.stars" class="flex items-center gap-4">
					<span class="w-5 text-sm font-semibold text-heading">{{ item.stars }}</span>
					<i class="fa-solid fa-star text-[#f8b81f]"></i>
					<div class="h-2 flex-1 rounded-full bg-border">
						<div class="h-full rounded-full bg-[#f8b81f]" :style="{ width: getDistributionWidth(item.count) }"></div>
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
							<div class="flex items-center gap-2 text-[#f8b81f]">
								<i v-for="star in 5" :key="star"
									:class="review.rating >= star ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
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
					<div class="flex gap-1 text-xl text-[#f8b81f]">
						<button v-for="star in 5" :key="star" type="button"
							class="transition-colors hover:opacity-90 text-[#f8b81f]" @click="form.rating = star"
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

				<button type="submit" class="send-btn edu-btn">
					{{ t("SubmitReview") }}
					<i :class="['icon', icons.arrowRight, 'text-xs']"></i>
				</button>
			</form>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { getIconClass } from "@/constant/iconMap";

defineProps<{
	course: Record<string, any> | null;
}>();

const { t } = useI18n();

const icons = {
	arrowRight: getIconClass("arrowRight"),
};

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

const formattedAverage = computed(() => averageRating.value.toFixed(1));

const inputClasses =
	"form-control w-full rounded-sm px-4 py-3 text-sm text-heading transition placeholder:text-placeholder focus:border-primary focus:outline-none focus:shadow-darker";

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

<style scoped>
.rate-box {
	width: 170px;
	padding: 40px 10px;
	box-shadow: 0px 0px 40px 0 rgba(0, 0, 0, 0.07);
}

.rating-number {
	font-weight: 700;
	font-size: 28px;
	line-height: 1;
	font-family: var(--font-secondary);
	color: var(--color-secondary);
}

.form-control {
	box-shadow: var(--shadow-darker);
}



.send-btn {
	font-size: 15px;
	line-height: 32px;
	font-weight: 400;
}

.send-btn i {
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
