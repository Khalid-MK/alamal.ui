<script setup lang="ts">
import { useTheme } from "vuetify";

const items = ["default", "green", "red", "dark"];
const value = ref("default");

const vuetifyTheme = useTheme();

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "default";
  value.value = savedTheme;
  applyTheme(savedTheme);
});

function applyTheme(themeName: string) {
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
  if (themeName in vuetifyMap) {
    vuetifyTheme.global.name.value =
      vuetifyMap[themeName as keyof typeof vuetifyMap];
  } else {
    vuetifyTheme.global.name.value = vuetifyMap.default;
  }

  // Save
  localStorage.setItem("theme", themeName);
}
function switchTheme(newValue: string) {
  applyTheme(newValue);
}
</script>

<template>
  <div class="flex">
    <v-select
      v-model="value"
      :items="items"
      label="Choose theme"
      variant="outlined"
      class="w-64"
      @update:modelValue="switchTheme"
    />
  </div>
</template>
