<template>
    <svg :class="[
        'flex-shrink-0 w-4 h-4 ml-1 transform transition-transform duration-200',
        isOpen ? 'rotate-180' : ''
    ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
});
</script>
