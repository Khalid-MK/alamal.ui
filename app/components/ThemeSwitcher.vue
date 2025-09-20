<script setup lang="ts">
import { availableThemes } from "@/composables/useTheme"
const { theme, setTheme } = useTheme();

const selectedTheme = ref("default");
</script>

<template>
    <div class="flex">
        <select v-model="selectedTheme" @change="setTheme(selectedTheme)" class="px-3 py-2 border rounded">
            <option v-for="theme in availableThemes" :key="theme" :value="theme">
                {{ theme }}
            </option>
        </select>
    </div>

    <!-- <div class="space-y-4">
       
        <button
            class="px-4 py-2 rounded bg-primary text-secondary hover:bg-primary-700 hover:text-secondary-700 duration-300">
            Themed Button
        </button>

     
        <div class="p-4 bg-primary text-secondary rounded hover:text-secondary-700 duration-300">
            Current theme: <b>{{ theme }}</b>
        </div>
    </div> -->


</template>