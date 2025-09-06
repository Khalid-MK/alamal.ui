<template>
  <slider />
  <!-- <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Al Roshd Academy</h1>

      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-xl font-semibold mb-4">JavaScript Test</h2>
        <button
          @click="incrementCounter"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
        >
          Click Me ({{ counter }})
        </button>
        <button
          @click="toggleMessage"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Toggle Message
        </button>

        <div
          v-if="showMessage"
          class="mt-4 p-4 bg-green-100 text-green-800 rounded"
        >
          JavaScript is working! 🎉
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const counter = ref(0);
const showMessage = ref(false);

const incrementCounter = () => {
  counter.value++;
  console.log("Counter incremented to:", counter.value);
};

const toggleMessage = () => {
  showMessage.value = !showMessage.value;
  console.log("Message toggled:", showMessage.value);
};

onMounted(() => {
  console.log("Index page mounted - JavaScript is working!");
});
</script>
