<template>
	<section :id="id" class="showcase-section">
		<div class="section-header">
			<h2 class="section-title">{{ title }}</h2>
			<p v-if="description" class="section-description">{{ description }}</p>
		</div>
		<div class="section-content">
			<slot></slot>
		</div>
	</section>
</template>

<script setup lang="ts">
export interface ShowcaseSectionProps {
	/** Section ID for anchor links */
	id: string;
	/** Section title */
	title: string;
	/** Optional description */
	description?: string;
}

defineProps<ShowcaseSectionProps>();
</script>

<style lang="scss" scoped>
.showcase-section {
	margin-bottom: 64px;
	scroll-margin-top: 80px; /* For anchor link offset */
}

.section-header {
	margin-bottom: 24px;
	padding-bottom: 16px;
	border-bottom: 2px solid var(--color-primary, #1ab69d);
}

.section-title {
	font-size: 32px;
	font-weight: bold;
	color: var(--color-heading, #181818);
	margin-bottom: 8px;

	@media (max-width: 767px) {
		font-size: 24px;
	}
}

.section-description {
	font-size: 16px;
	color: var(--color-body, #808080);
	margin: 0;
}

.dark-mode {
	.section-header {
		border-bottom-color: var(--color-primary, #1ab69d);
	}

	.section-title {
		color: var(--dark-color-heading, #ffffff);
	}

	.section-description {
		color: var(--dark-footer-text, #808080);
	}
}
</style>
