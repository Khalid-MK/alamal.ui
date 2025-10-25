<template>
	<div class="payment-page bg-surface pb-16 pt-10" :dir="direction">
		<div class="mx-auto w-full max-w-6xl px-4">
			<header class="mb-10 space-y-2">
				<p class="text-sm font-semibold uppercase tracking-wide text-primary">{{ pageLead }}</p>
				<h1 class="text-3xl font-bold text-heading md:text-4xl">{{ pageTitle }}</h1>
				<p class="text-base text-body-muted">{{ pageSubtitle }}</p>
			</header>

			<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
				<form class="space-y-8 rounded-2xl border border-border bg-background p-6 shadow-darker"
					@submit.prevent="handleSubmit">
					<section class="space-y-6">
						<div class="flex items-center justify-between">
							<div>
								<h2 class="text-xl font-semibold text-heading">{{ formTitle }}</h2>
								<p class="text-sm text-body-muted">{{ formSubtitle }}</p>
							</div>
							<button v-if="hasSavedData" type="button"
								class="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5"
								@click="loadSavedData">
								<i class="fa-solid fa-rotate"></i>
								{{ $t('LoadSavedInfo') }}
							</button>
						</div>

						<div class="grid gap-5 md:grid-cols-2">
							<div class="space-y-2">
								<label class="text-sm font-medium text-heading" for="name">{{ $t('FullName') }}</label>
								<input id="name" v-model="form.name" type="text" required class="form-input"
									:placeholder="$t('FullNamePlaceholder')" />
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-heading" for="email">{{ $t('Email') }}</label>
								<input id="email" v-model="form.email" type="email" required class="form-input"
									:placeholder="$t('EmailPlaceholder')" />
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-heading" for="telegram">{{ $t('TelegramHandle') }}</label>
								<input id="telegram" v-model="form.telegram" type="text" class="form-input"
									:placeholder="$t('TelegramPlaceholder')" />
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-heading" for="availableTime">{{ $t('AvailableTime') }}</label>
								<input id="availableTime" v-model="form.availableTime" type="text" required class="form-input"
									:placeholder="$t('AvailableTimePlaceholder')" />
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-heading" for="age">{{ $t('Age') }}</label>
								<input id="age" v-model="form.age" type="number" min="6" class="form-input"
									:placeholder="$t('AgePlaceholder')" />
							</div>

							<div class="space-y-2">
								<label class="text-sm font-medium text-heading" for="gender">{{ $t('Gender') }}</label>
								<select id="gender" v-model="form.gender" class="form-input">
									<option value="" disabled>{{ $t('SelectOption') }}</option>
									<option v-for="option in genderOptions" :key="option.value" :value="option.value">
										{{ option.label }}
									</option>
								</select>
							</div>

							<div class="space-y-2 md:col-span-2">
								<label class="text-sm font-medium text-heading" for="timezone">{{ $t('Timezone') }}</label>
								<select id="timezone" v-model="form.timezone" required class="form-input">
									<option value="" disabled>{{ $t('SelectTimezone') }}</option>
									<option v-for="zone in timezoneOptions" :key="zone" :value="zone">
										{{ zone }}
									</option>
								</select>
							</div>
						</div>
					</section>

					<section class="space-y-6">
						<div>
							<h2 class="text-xl font-semibold text-heading">{{ $t('PaymentMethodTitle') }}</h2>

							<p class="text-sm text-body-muted">{{ $t('PaymentMethodSubtitle') }}</p>
						</div>

						<div class="grid gap-4 md:grid-cols-3">
							<label v-for="method in paymentMethods" :key="method.value"
								class="group flex cursor-pointer flex-col gap-2 rounded-xl border border-border bg-background-soft p-4 transition hover:border-primary">
								<input v-model="form.paymentMethod" type="radio" name="paymentMethod" class="sr-only"
									:value="method.value" required />
								<span class="text-base font-semibold text-heading">{{ method.label }}</span>
								<span class="text-xs text-body-muted">{{ method.description }}</span>
								<span class="mt-auto text-xs font-semibold uppercase tracking-wide text-primary">{{ method.processing
								}}</span>
							</label>
						</div>

						<div class="space-y-2">
							<label class="text-sm font-medium text-heading" for="paymentNotes">{{ $t('PaymentNotes') }}</label>
							<textarea id="paymentNotes" v-model="form.paymentNotes" rows="4" class="form-input"
								:placeholder="$t('PaymentNotesPlaceholder')"></textarea>
						</div>
					</section>

					<footer
						class="flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
						<div class="flex items-start gap-3 text-sm text-body-muted">
							<input id="acceptTerms" v-model="form.acceptTerms" type="checkbox" required
								class="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
							<label class="cursor-pointer" for="acceptTerms">{{ $t('PaymentAcceptTerms') }}</label>
						</div>

						<button type="submit" :disabled="isSubmitting"
							class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60">
							<span v-if="!isSubmitting">{{ $t('CompleteEnrollment') }}</span>
							<span v-else>{{ $t('Saving') }}</span>
							<i class="fa-solid fa-lock"></i>
						</button>
					</footer>

					<p v-if="saveMessage" class="rounded-lg bg-primary/5 px-4 py-3 text-sm text-primary">
						{{ saveMessage }}
					</p>
				</form>

				<aside class="space-y-6">
					<div class="rounded-2xl border border-border bg-background p-6 shadow-darker">
						<h2 class="text-xl font-semibold text-heading">{{ $t('OrderSummary') }}</h2>
						<p class="mt-1 text-sm text-body-muted">{{ $t('OrderSummarySubtitle') }}</p>

						<div v-if="course" class="mt-6 space-y-4">
							<div class="overflow-hidden rounded-lg border border-border">
								<img :src="courseImage" :alt="course.title" class="h-40 w-full object-cover" />
							</div>
							<div class="space-y-2">
								<h3 class="text-lg font-semibold text-heading">{{ course.title }}</h3>
								<p class="text-sm text-heading">{{ course.instructor }}</p>
							</div>
							<dl class="space-y-2 text-sm">
								<div class="flex items-center justify-between">
									<dt class="text-heading">{{ $t('Level') }}</dt>
									<dd class="font-semibold text-heading">{{ course.beginer || $t('NotAvailable') }}</dd>
								</div>
								<div class="flex items-center justify-between">
									<dt class="text-heading">{{ $t('Duration') }}</dt>
									<dd class="font-semibold text-heading">{{ course.duration || $t('NotAvailable') }}</dd>
								</div>
								<div class="flex items-center justify-between">
									<dt class="text-heading">{{ $t('Lessons') }}</dt>
									<dd class="font-semibold text-heading">{{ lessonsCount }}</dd>
								</div>
							</dl>
						</div>
						<div v-else class="mt-6 rounded-lg bg-background-soft px-4 py-3 text-sm text-heading">
							{{ $t('CourseFallback') }}
						</div>

						<div class="mt-6 grid gap-2 rounded-lg bg-background-soft p-4 text-sm">
							<div class="flex items-center justify-between">
								<span class="text-heading">{{ $t('Subtotal') }}</span>
								<span class="text-lg font-semibold text-heading">{{ coursePrice }}</span>
							</div>
							<div class="flex items-center justify-between">
								<span class="text-heading">{{ $t('ProcessingFee') }}</span>
								<span class="font-semibold text-heading">{{ processingFee }}</span>
							</div>
							<div class="flex items-center justify-between border-t border-border pt-3">
								<span class="text-heading">{{ $t('TotalDue') }}</span>
								<span class="text-xl font-bold text-secondary">{{ totalAmount }}</span>
							</div>
						</div>
					</div>

					<div class="rounded-2xl border border-dashed border-border bg-background-soft p-6 text-sm text-heading">
						<h3 class="text-base font-semibold text-heading">{{ $t('SupportTitle') }}</h3>
						<p class="mt-2">{{ $t('SupportDescription') }}</p>
						<div class="mt-4 space-y-1">
							<p>{{ $t('SupportTelegram') }}</p>
							<p>{{ $t('SupportEmail') }}</p>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '#app';
import enData from '@/constant/data(en).json';
import arData from '@/constant/data(ar).json';
import ruData from '@/constant/data(ru).json';

type Dataset = {
	courses?: Array<Record<string, any>>;
};

const STORAGE_KEY = 'alamal_payment_form';
const processingFeeValue = 5;
const defaultCourseImage = '/img/courses/banner.png';

const datasets: Record<string, Dataset> = {
	en: enData as Dataset,
	ar: arData as Dataset,
	ru: ruData as Dataset,
};

const route = useRoute();
const { t, locale, localeProperties } = useI18n();

// Set page title and meta description with i18n
usePageMeta('pageTitles.payment', 'pageDescriptions.payment')

const direction = computed(() => localeProperties.value?.dir ?? 'ltr');
const pageLead = computed(() => t('PaymentLead'));
const pageTitle = computed(() => t('PaymentTitle'));
const pageSubtitle = computed(() => t('PaymentSubtitle'));
const formTitle = computed(() => t('YourDetails'));
const formSubtitle = computed(() => t('YourDetailsSubtitle'));

const courseId = computed(() => String(route.query.courseId ?? ''));

const currentCourses = computed(() => {
	const currentLocale = locale.value as keyof typeof datasets;
	const dataset = datasets[currentLocale];
	const fallback = datasets.en;
	const courses = dataset?.courses ?? fallback?.courses ?? [];
	return Array.isArray(courses) ? courses : [];
});

const course = computed(() => currentCourses.value.find((item) => String(item?.id) === courseId.value));

const lessonsCount = computed(() => {
	if (!course.value?.curriculums?.length) {
		return t('NotAvailable');
	}

	const total = course.value.curriculums.reduce((count: number, section: any) => {
		return count + (section.lessons?.length ?? 0);
	}, 0);

	return total || t('NotAvailable');
});

const coursePrice = computed(() => course.value?.price ?? t('ContactUs'));
const processingFee = computed(() => `${processingFeeValue} USD`);
const totalAmount = computed(() => {
	if (!course.value?.price) {
		return coursePrice.value;
	}

	const numericPrice = Number(String(course.value.price).replace(/[^0-9.]/g, ''));
	const total = Number.isFinite(numericPrice) ? numericPrice + processingFeeValue : null;

	if (total === null) {
		return coursePrice.value;
	}

	return `${total.toFixed(2)} USD`;
});

const courseImage = computed(() => course.value?.videoThumbnail || course.value?.courseImage || defaultCourseImage);

const genderOptions = computed(() => [
	{ value: 'female', label: t('Female') },
	{ value: 'male', label: t('Male') },
	{ value: 'other', label: t('Other') },
]);

const timezoneOptions = [
	'UTC-12:00',
	'UTC-11:00',
	'UTC-10:00',
	'UTC-09:00',
	'UTC-08:00',
	'UTC-07:00',
	'UTC-06:00',
	'UTC-05:00',
	'UTC-04:00',
	'UTC-03:00',
	'UTC-02:00',
	'UTC-01:00',
	'UTC+00:00',
	'UTC+01:00',
	'UTC+02:00',
	'UTC+03:00',
	'UTC+04:00',
	'UTC+05:00',
	'UTC+06:00',
	'UTC+07:00',
	'UTC+08:00',
	'UTC+09:00',
	'UTC+10:00',
	'UTC+11:00',
	'UTC+12:00',
	'UTC+13:00',
	'UTC+14:00',
];

const paymentMethods = computed(() => [
	{
		value: 'visa',
		label: t('PaymentVisaLabel'),
		description: t('PaymentVisaDescription'),
		processing: t('PaymentInstant'),
	},
	{
		value: 'bank-transfer',
		label: t('PaymentBankLabel'),
		description: t('PaymentBankDescription'),
		processing: t('Payment24Hours'),
	},
	{
		value: 'crypto',
		label: t('PaymentCryptoLabel'),
		description: t('PaymentCryptoDescription'),
		processing: t('PaymentInstant'),
	},
]);

const form = reactive({
	name: '',
	email: '',
	telegram: '',
	availableTime: '',
	age: '',
	gender: '',
	timezone: '',
	paymentMethod: '',
	paymentNotes: '',
	acceptTerms: false,
});

const hasSavedData = ref(false);
const saveMessage = ref('');
const isSubmitting = ref(false);

const loadSavedData = () => {
	if (typeof window === 'undefined') {
		return;
	}

	const saved = localStorage.getItem(STORAGE_KEY);
	if (!saved) {
		return;
	}

	try {
		const parsed = JSON.parse(saved);
		Object.assign(form, parsed);
		saveMessage.value = t('SavedDataLoaded');
	} catch (error) {
		console.error('Failed to load saved payment form info', error);
	}
};

const handleSubmit = async () => {
	if (isSubmitting.value) {
		return;
	}

	if (typeof window === 'undefined') {
		return;
	}

	isSubmitting.value = true;
	saveMessage.value = '';

	const payload = { ...form, courseId: courseId.value };

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		hasSavedData.value = true;
		saveMessage.value = t('SavedSuccessfully');
	} catch (error) {
		console.error('Failed to save payment form info', error);
		saveMessage.value = t('SavedError');
	} finally {
		isSubmitting.value = false;
	}
};

onMounted(() => {
	if (typeof window === 'undefined') {
		return;
	}

	const saved = localStorage.getItem(STORAGE_KEY);
	hasSavedData.value = Boolean(saved);
});
</script>

<style scoped>
.form-input {
	width: 100%;
	border-radius: 0.75rem;
	border: 1px solid var(--color-border);
	background-color: var(--color-bg-body);
	padding: 0.75rem 1rem;
	font-size: 0.95rem;
	color: var(--color-body);
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
	outline: none;
	border-color: var(--color-primary);
	box-shadow: 0 0 0 3px rgba(26, 182, 157, 0.15);
}

.bg-background-soft {
	background-color: rgba(148, 163, 184, 0.1);
}
</style>
