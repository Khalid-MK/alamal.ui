<template>
	<VideoModal v-if="props.isOpen" :video-url="props.videoUrl" @close="handleClose" />
</template>

<script setup lang="ts">
import VideoModal from "~/components/common/VideoModal.vue";

const props = defineProps<{
	isOpen: boolean;
	videoUrl: string;
}>();

const emit = defineEmits<{ close: [] }>();

const handleClose = () => {
	emit("close");
};
</script>
