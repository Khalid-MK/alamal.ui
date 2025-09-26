<template>
  <NuxtLayout>
    <v-app>
      <!-- <v-container>
        <v-select v-model="value" :items="items" label="Choose theme" variant="outlined" class="w-64"
          @update:modelValue="switchTheme" />
        </v-container> -->
        <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup>
import NuxtLayout from "@/layouts/default.vue";
import { useTheme } from "vuetify";

const items = ["default", "green", "red", "dark"];
const value = ref("default");

const vuetifyTheme = useTheme();

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "default";
  value.value = savedTheme;
  applyTheme(savedTheme);
});

function applyTheme(themeName) {
  const vuetifyMap = {
    default: "myDefault",
    green: "green",
    red: "red",
    dark: "dark",
  };

  // Tailwind
  document.documentElement.classList.remove(
    "theme-default",
    "theme-green",
    "theme-red",
    "theme-dark"
  );
  document.documentElement.classList.add(`theme-${themeName}`);

  // Vuetify
  vuetifyTheme.global.name.value = vuetifyMap[themeName];

  // Save
  localStorage.setItem("theme", themeName);
}

function switchTheme(newValue) {
  applyTheme(newValue);
}
</script>
