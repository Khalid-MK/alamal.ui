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

</script>
