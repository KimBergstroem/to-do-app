<template>
  <div
    class="filter-container d-flex flex-row gap-2 justify-content-end small m-1">
    <p class="fw-bold small">Filter:</p>
    <div
      @click="filterTasks(null)"
      :class="{ 'custom-color-text-green': currentType === null }"
      class="fw-bold small cursor-pointer">
      All
    </div>
    <div
      @click="filterTasks('work')"
      :class="{ 'custom-color-text-green': currentType === 'work' }"
      class="fw-bold small cursor-pointer">
      Work
    </div>
    <div
      @click="filterTasks('personal')"
      :class="{ 'custom-color-text-green': currentType === 'personal' }"
      class="fw-bold small cursor-pointer">
      Personal
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["currentType"]);
const emit = defineEmits(["filterByType"]);

const filterTasks = (selectedType) => {
  emit("filterByType", selectedType);
};
</script>
