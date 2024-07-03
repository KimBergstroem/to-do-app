<template>
  <div v-if="isLoggedIn" class="container max-w-screen-sm mx-auto px-4 py-10">
    <!-- App Msg -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-4 p-3 rounded shadow-sm bg-light">
      <p class="text-success">{{ statusMsg }}</p>
      <p class="text-danger">{{ errorMsg }}</p>
    </div>

    <div v-if="dataLoaded">
      <div
        class="card flex flex-col items-center p-4 rounded shadow-sm bg-light">
        <!-- Edit and Delete buttons -->
        <div
          class="d-flex justify-content-center justify-content-sm-start w-100 mt-2">
          <font-awesome-icon
            @click="editMode"
            icon="edit"
            class="fa-solid fa-2x cursor-pointer m-2" />
          <font-awesome-icon
            @click="deleteTask"
            icon="trash-alt"
            class="fa-solid fa-2x cursor-pointer m-2" />
        </div>

        <!-- Task Details -->
        <div class="w-full mt-4">
          <input
            v-if="edit"
            v-model="data.todosName"
            type="text"
            class="form-control mb-2" />
          <h1 v-else class="custom-color-text-green text-center">
            {{ data.todosName }}
          </h1>
          <p class="fw-bold">
            Created at: {{ formatDateTime(data.created_at) }}
          </p>
        </div>
      </div>

      <!-- Task Info -->
      <div class="mt-4 p-4 rounded text-black bg-light">
        <div v-for="(item, index) in data.todosInfo" :key="index" class="mb-3">
          <div class="border rounded p-3 d-flex flex-column">
            <div class="mb-3">
              <h2>Task #{{ index + 1 }}</h2>
              <label
                for="todoInfo"
                class="form-label text-black text-at-light-green"
                >Information</label
              >
              <input
                v-if="edit"
                v-model="item.todosInfo"
                type="text"
                class="form-control"
                id="todoInfo" />
              <p v-else>{{ item.todosInfo }}</p>
            </div>
            <div class="mb-3" v-if="data.todosType === 'personal'">
              <label
                for="whattodo"
                class="form-label text-black text-at-light-green"
                >What to do</label
              >
              <input
                v-if="edit"
                v-model="item.whattodo"
                type="text"
                class="form-control"
                id="whattodo" />
              <p v-else>{{ item.whattodo }}</p>
            </div>
            <div v-if="data.todosType === 'work'" class="mb-3">
              <label
                for="project"
                class="form-label text-black text-at-light-green"
                >Project</label
              >
              <input
                v-if="edit"
                v-model="item.project"
                type="text"
                class="form-control"
                id="project" />
              <p v-else>{{ item.project }}</p>
            </div>
            <div v-if="data.todosType === 'work'" class="mb-3">
              <label
                for="deadline"
                class="form-label text-black text-at-light-green"
                >Deadline</label
              >
              <input
                v-if="edit"
                v-model="item.deadline"
                type="date"
                class="form-control"
                id="deadline" />
              <p v-else class="fw-bold">{{ item.deadline }}</p>
            </div>
            <button
              v-if="edit"
              @click="deleteTaskItem(item.id)"
              class="btn btn-sm btn-danger mt-auto">
              Delete
            </button>
          </div>
        </div>
        <button
          v-if="edit"
          type="button"
          @click="addTaskItem"
          class="btn btn-clr-primary text-white mt-3">
          Add New Task
        </button>
        <router-link v-else to="/tasks" class="btn btn-clr-primary text-white"
          >Go back</router-link
        >
      </div>
      <!-- Update Button -->
      <button
        v-if="edit"
        @click="updateTask"
        class="btn btn-clr-primary text-white mt-4">
        Update Reminder
      </button>
    </div>

    <div v-else>
      <p>Loading data...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const taskStore = useTaskStore();
const route = useRoute();
const router = useRouter();
const toastMsg = useToast();
const data = ref(null);
const dataLoaded = ref(false);
const edit = ref(false);

const todoId = route.params.todoId;

onMounted(async () => {
  await fetchData();
});

// Toggle editMode for editing a particular task
const editMode = () => {
  edit.value = !edit.value;
};

// Fetching the specific Task from database
const fetchData = async () => {
  try {
    dataLoaded.value = false;
    data.value = await taskStore.fetchTaskById(todoId);
    dataLoaded.value = true;
  } catch (error) {
    toastMsg.error(`${error.message}`);
  }
};

const updateTask = async () => {
  try {
    await taskStore.updateTaskById({
      id: todoId,
      todosName: data.value.todosName,
      todosInfo: data.value.todosInfo,
    });
    edit.value = false;
    toastMsg.success("Success: Updated Reminder!", {
      toastClassName: "custom-toast-success",
    });
  } catch (error) {
    toastMsg.error(`${error.message}`);
  }
};

const deleteTask = async () => {
  try {
    await taskStore.deleteTaskById(todoId);
    router.push("/tasks");
    toastMsg.success("Success: Deleted Reminder!", {
      toastClassName: "custom-toast-success",
    });
  } catch (error) {
    toastMsg.error(`${error.message}`);
  }
};

const deleteTaskItem = (id) => {
  if (data.value.todosInfo.length > 1) {
    data.value.todosInfo = data.value.todosInfo.filter(
      (todo) => todo.id !== id
    );
    return;
  } else {
    toastMsg.error("Cannot delete the last task item!");
    return;
  }
};

const addTaskItem = () => {
  if (data.value.todosType === "personal") {
    data.value.todosInfo.push({
      id: generateUID(),
      todosInfo: "",
      whattodo: "",
    });
  } else if (data.value.todosType === "work") {
    data.value.todosInfo.push({
      id: generateUID(),
      todosInfo: "",
      project: "",
      deadline: "",
    });
  }
};

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

function generateUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const isLoggedIn = computed(() => taskStore.isLoggedIn);
</script>
