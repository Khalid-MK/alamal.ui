<template>
	<p class="leading-relaxed text-slate-600">
		{{ t("ReviewsPlaceholder") }}
	</p>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
