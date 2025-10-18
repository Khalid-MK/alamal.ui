<template>
    <div class="overflow-hidden whitespace-nowrap w-[70%]">
        <div ref="ticker" class="inline-block animate-marquee py-2" :style="{ animationDuration: duration + 's' }">
            <span v-for="n in 2" :key="n">
                <a v-for="(item, index) in news" :key="index + '-' + n" class="mx-8 gap-2">
                    <span class="news-dot"></span>
                    {{ item }}
                </a>
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
    news: { type: Array, required: true },
    duration: { type: Number, default: 20 }
});

const ticker = ref(null);
</script>

<style scoped lang="scss">
.shadow {
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 22px 70px 4px;
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

@keyframes marquee {
    0% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(-50%);
    }
}

a {
    cursor: pointer;
    transition: 200ms;
    color: var(--color-body, #808080);
    font-weight: 500;

    &:hover {
        color: var(--color-primary, #1ab69d);
    }
}

.news-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: var(--color-primary, #1ab69d);
    border-radius: 50%;
    flex-shrink: 0;
    margin-inline-end: 4px;
}

.animate-marquee {
    display: inline-block;
    animation: marquee linear infinite;
    animation-play-state: running;

    &:hover {
        animation-play-state: paused;
    }
}
</style>
