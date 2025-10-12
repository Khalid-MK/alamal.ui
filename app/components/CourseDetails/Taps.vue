<template>
  <v-card>
    <v-tabs v-model="tab" align-tabs="center" bg-color="transparent">
      <v-tab class="custom-tab" :value="1">Landscape</v-tab>
      <v-tab class="custom-tab" :value="2">City</v-tab>
      <v-tab class="custom-tab" :value="3">Abstract</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-img :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`" height="205" cover />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const tab = ref(null);
</script>

<style scoped lang="scss">
.custom-tab {
  transition: all 0.2s ease;
  color: var(--color-tertiary) !important;
  background-color: transparent !important;
  border: 2px solid transparent !important; // Default: no border
  border-radius: 8px; // Optional: rounded corners

  // Non-selected tab hover - add border
  &:not(.v-tab--selected):hover {
    border-color: var(--color-tertiary) !important;
  }

  // Selected state - solid border
  &.v-tab--selected {
    color: var(--color-tertiary) !important;
    background-color: transparent !important;
    border-color: var(--color-tertiary) !important;
    border-bottom: 3px solid var(--color-tertiary) !important; // Thicker bottom border for selected
  }

  // Selected state hover
  &.v-tab--selected:hover {
    background-color: var(--color-lighten03) !important; // Optional: subtle bg
    border-color: var(--color-tertiary) !important;
  }
}
</style>