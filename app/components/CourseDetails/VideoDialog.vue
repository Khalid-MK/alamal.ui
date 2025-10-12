<template>
	<Teleport to="body">
		<Transition name="dialog-fade">
			<div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 px-4">
				<div class="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl">
					<button type="button"
						class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 transition hover:bg-primary hover:text-white"
						@click="emit('update:show', false)">
						<i class="fa-solid fa-xmark text-lg"></i>
						<span class="sr-only">{{ $t("Close") }}</span>
					</button>
					<iframe :src="computedVideoUrl" title="Course preview" class="aspect-video w-full" frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen></iframe>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	show: boolean;
	videoUrl: string;
}>();

const emit = defineEmits<{ (event: "update:show", value: boolean): void }>();

const computedVideoUrl = computed(() => {
	if (!props.videoUrl) {
		return "https://www.youtube.com/embed/dQw4w9WgXcQ";
	}

	return props.videoUrl;
});
</script>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
	transition: opacity 0.2s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
	opacity: 0;
}

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
</style>
