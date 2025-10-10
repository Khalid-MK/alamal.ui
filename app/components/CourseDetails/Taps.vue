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
  color: #eb9f25 !important;
  background-color: transparent !important;
  border: 2px solid transparent !important; // Default: no border
  border-radius: 8px; // Optional: rounded corners

  // Non-selected tab hover - add border
  &:not(.v-tab--selected):hover {
    border-color: #eb9f25 !important;
  }

  // Selected state - solid border
  &.v-tab--selected {
    color: #eb9f25 !important;
    background-color: transparent !important;
    border-color: #eb9f25 !important;
    border-bottom: 3px solid #eb9f25 !important; // Thicker bottom border for selected
  }

  // Selected state hover
  &.v-tab--selected:hover {
    background-color: rgba(235, 159, 37, 0.05) !important; // Optional: subtle bg
    border-color: #eb9f25 !important;
  }
}

/* .custom-tab {
  transition: all 0.2s ease;
  color: #eb9f25 !important;
  background-color: transparent !important;

  // Force remove all overlays
  &::before,
  &::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    background-color: transparent !important;
  }

  // Override all hover states
  &:hover {
    background-color: transparent !important;

    &::before,
    &::after {
      content: none !important;
      display: none !important;
      opacity: 0 !important;
      background-color: transparent !important;
    }
  }

  // Override selected state
  &.v-tab--selected {
    color: #eb9f25 !important;
    background-color: transparent !important;

    &::before,
    &::after {
      content: none !important;
      display: none !important;
      opacity: 0 !important;
      background-color: transparent !important;
    }
  }

  // Override selected hover state
  &.v-tab--selected:hover {
    background-color: transparent !important;

    &::before,
    &::after {
      content: none !important;
      display: none !important;
      opacity: 0 !important;
      background-color: transparent !important;
    }
  }

  // Override focus state
  &:focus,
  &:focus-visible {
    background-color: transparent !important;

    &::before,
    &::after {
      content: none !important;
      display: none !important;
      opacity: 0 !important;
      background-color: transparent !important;
    }
  }
}

// Deep selectors for nested elements
.custom-tab :deep(*) {

  &::before,
  &::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    background-color: transparent !important;
  }
}

.custom-tab :deep(.v-btn) {
  color: inherit !important;
  background-color: transparent !important;

  &::before,
  &::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    background-color: transparent !important;
  }

  &:hover {
    background-color: transparent !important;
  }
}

// Remove ripple effect
.custom-tab :deep(.v-ripple__container) {
  display: none !important;
}

// Nuclear option: override any background-color on any state
.custom-tab,
.custom-tab:hover,
.custom-tab:focus,
.custom-tab:active,
.custom-tab.v-tab--selected,
.custom-tab.v-tab--selected:hover {
  background-color: transparent !important;
} */
</style>