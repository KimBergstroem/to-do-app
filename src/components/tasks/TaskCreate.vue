<template>
  <div class="container">
    <div v-if="isLoggedIn">
      <div class="card shadow-sm bg-darken text-white">
        <div class="card-body">
          <!-- Form -->
          <form @submit.prevent="createTask">
            <h1 class="card-title">Create a Reminder</h1>

            <!-- Task Name -->
            <div class="mb-3">
              <label for="todo-name" class="form-label">Title</label>
              <input
                type="text"
                required
                class="form-control"
                id="todo-name"
                placeholder="example: Make dinner... or Plan a project"
                v-model="todosName" />
            </div>

            <!-- Task Type -->
            <div class="mb-3">
  <label for="todo-type" class="form-label">Type / Category</label>
  <select
    id="todo-type"
    class="form-select"
    required
    v-model="todosType"
    @change="todoTypeChange">
    <option value="" disabled selected hidden>Select Type</option>
    <option value="select-todo" hidden>Select Type</option>
    <option value="personal">Personal</option>
    <option value="work">Work</option>
  </select>
</div>

            <!-- Personal Task Inputs -->
            <div v-if="todosType === 'personal'">
              <div
                v-for="item in todosInfo"
                :key="item.id"
                class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="personal-info" class="form-label"
                    >Information</label
                  >
                  <input
                    type="text"
                    required
                    id="personal-info"
                    class="form-control"
                    placeholder="What is the task about..."
                    v-model="item.todosInfo" />
                </div>
                <div class="col-md-6">
                  <label for="personal-whattodo" class="form-label"
                    >What to do</label
                  >
                  <input
                    type="text"
                    required
                    id="personal-whattodo"
                    class="form-control"
                    placeholder="Required for completing the task..."
                    v-model="item.whattodo" />
                </div>
              </div>
              <button
                @click="addTaskItem('personal')"
                type="button"
                class="btn btn-clr-primary text-white">
                Add More Info
              </button>
            </div>

            <!-- Work Task Inputs -->
            <div v-if="todosType === 'work'">
              <div
                v-for="item in todosInfo"
                :key="item.id"
                class="row g-3 mb-3">
                <div class="col-md-4">
                  <label for="work-info" class="form-label">Work Info</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    placeholder="Info about the task..."
                    v-model="item.todosInfo" />
                </div>
                <div class="col-md-4">
                  <label for="work-project" class="form-label">Project</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    placeholder="Name of the project..."
                    v-model="item.project" />
                </div>
                <div class="col-md-4">
                  <label for="work-deadline" class="form-label">Deadline</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="item.deadline" />
                </div>
              </div>
              <button
                @click="addTaskItem('work')"
                type="button"
                class="btn btn-clr-primary text-white">
                Add More Info
              </button>
            </div>

            <!-- Submit button for adding Task -->
            <button type="submit" class="btn text-white btn-clr-primary mt-3">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="d-flex flex-column align-items-center">
      <h1 class="text-2xl">What are you waiting for?</h1>
      <h2>Sign in to start creating some magic.</h2>
      <router-link class="btn text-white btn-clr-primary mt-3" to="/auth/signIn"
        >Sign In</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../../stores/taskStore";
import { useToast } from "vue-toastification";
import { validateTaskData } from "./ValidateTaskData.js";

const todosName = ref("");
const todosType = ref("select-todo");
const todosInfo = ref([]);

const taskStore = useTaskStore();
const toastMsg = useToast();

const isLoggedIn = computed(() => taskStore.isLoggedIn);

const addTaskItem = (type) => {
  if (type === "personal") {
    todosInfo.value.push({
      id: generateUID(),
      todosInfo: "",
      whattodo: "",
    });
  } else if (type === "work") {
    todosInfo.value.push({
      id: generateUID(),
      todosInfo: "",
      project: "",
      deadline: "",
    });
  }
};

const createTask = async () => {
  try {
    const validationError = validateTaskData({
      todosName: todosName.value,
      todosType: todosType.value,
      todosInfo: todosInfo.value,
    });

    if (validationError) {
      toastMsg.error(validationError);
      return;
    }

    await taskStore.createTask({
      todosName: todosName.value,
      todosType: todosType.value,
      todosInfo: todosInfo.value,
    });
    toastMsg.success("Success: Created Reminder!", {
      toastClassName: "custom-toast-success",
    });
    todosName.value = "";
    todosType.value = "select-todo";
    todosInfo.value = [];
  } catch (error) {
    toastMsg.error(`${error.message}`);
  }
};

// Clears Task Item and adds new items based on Task Type "Personal" or "Work"
const todoTypeChange = () => {
  todosInfo.value = [];
  addTaskItem(todosType.value);
};

function generateUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
