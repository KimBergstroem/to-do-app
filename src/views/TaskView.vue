<template>
  <div class="container">
    <div v-if="isLoggedIn">
      <!-- Search -->
      <div class="search-container">
        <div class="search-icon">
          <font-awesome-icon icon="fas fa-search" />
        </div>
        <input
          v-model.trim="search"
          class="input-search"
          type="text"
          placeholder="Search..." />
      </div>

      <div v-if="taskStore.dataLoaded">
        <!-- No Data -->
        <div
          v-if="displayedTasks.length === 0"
          class="w-100 d-flex flex-column align-items-center">
          <h1 class="text-2xl">Looks empty here...</h1>
          <router-link class="btn text-white btn-clr-primary mt-3" to="/create"
            >Create Task</router-link
          >
        </div>

        <!-- Data cards -->
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div class="col" v-for="todo in displayedTasks" :key="todo.id">
            <router-link
              :to="{ name: 'View-todo', params: { todoId: todo.id } }"
              class="card shadow-sm text-decoration-none text-dark"
              :style="{ backgroundColor: todo.backgroundColor }">
              <!-- Logo based on Task type -->
              <h1 class="card-img-top text-center py-3">
                <font-awesome-icon
                  v-if="todo.todosType === 'personal'"
                  icon="user"
                  class="fa-solid fa-user fa-2x" />
                <font-awesome-icon
                  v-if="todo.todosType === 'work'"
                  icon="laptop-file"
                  class="fa-2x" />
              </h1>
              <div class="card-body d-flex flex-column align-items-center">
                <p
                  class="badge bg-white text-black px-3 py-2 rounded-pill mb-3">
                  {{ todo.todosType }}
                </p>
                <h5 class="card-title text-at-light-green">
                  {{ todo.todosName }}
                </h5>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="container mt-10">
        <p>Loading data...</p>
      </div>
    </div>
    <div v-else class="d-flex flex-column align-items-center">
      <h1 class="text-2xl">Please log in before you can manage your tasks.</h1>
      <router-link class="btn text-white btn-clr-primary mt-3" to="/auth/signIn"
        >Sign In</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";
import { ref, watch } from "vue";

const taskStore = useTaskStore();
const userStore = useUserStore();
const search = ref("");
const isLoggedIn = userStore.isLoggedIn;
const displayedTasks = ref([]);

onMounted(() => {
  if (isLoggedIn) {
    fetchAndDisplayTasks();
  }
});

const fetchAndDisplayTasks = async () => {
  try {
    await taskStore.fetchTasks();
    displayedTasks.value = taskStore.tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
  }
};

watch(search, (newValue) => {
  if (newValue === "") {
    displayedTasks.value = taskStore.tasks;
  } else {
    displayedTasks.value = taskStore.tasks.filter((task) =>
      task.todosName.toLowerCase().includes(newValue.toLowerCase())
    );
  }
});
</script>
