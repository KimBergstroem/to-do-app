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
        class="card flex flex-col items-center p-4 rounded shadow-sm"
        :style="{ background: bgColor }">
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
            v-model="editData.todosName"
            type="text"
            class="form-control mb-2" />
          <h1 v-else class="text-center">{{ data.todosName }}</h1>
          <div class="d-flex flex-column mt-2 small">
            <p>
              Created at: <br /><span class="fw-bold">{{
                formatDateTime(data.created_at)
              }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Task Items Table -->
      <div class="mt-4 p-4 rounded bg-darken text-white shadow-sm">
        <h2 class="mb-3">Tasks</h2>
        <div class="table-responsive">
          <table class="table table-bordered table-striped custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Information</th>
                <th v-if="editData.todosType === 'personal'">What to do</th>
                <th v-if="editData.todosType === 'work'">Project</th>
                <th v-if="editData.todosType === 'work'">Deadline</th>
                <th v-if="edit">Action</th>
                <th v-else>Finished</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in editData.todosInfo"
                :key="item.id"
                :class="{ 'completed-task': item.is_completed }">
                <td>{{ index + 1 }}</td>
                <td>
                  <div v-if="edit">
                    <input
                      v-model="item.todosInfo"
                      type="text"
                      class="form-control" />
                  </div>
                  <p v-else>{{ item.todosInfo }}</p>
                </td>
                <td v-if="editData.todosType === 'personal'">
                  <div v-if="edit">
                    <input
                      v-model="item.whattodo"
                      type="text"
                      class="form-control"
                      required />
                  </div>
                  <p v-else>{{ item.whattodo }}</p>
                </td>
                <td v-if="editData.todosType === 'work'">
                  <div v-if="edit">
                    <input
                      v-model="item.project"
                      type="text"
                      class="form-control"
                      required />
                  </div>
                  <p v-else>{{ item.project }}</p>
                </td>
                <td v-if="editData.todosType === 'work'">
                  <div v-if="edit">
                    <input
                      v-model="item.deadline"
                      type="date"
                      class="form-control"
                      required />
                  </div>
                  <p v-else class="fw-bold">{{ item.deadline }}</p>
                </td>
                <td>
                  <template v-if="edit">
                    <button
                      @click="deleteTaskItem(item.id)"
                      class="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </template>
                  <template v-else>
                    <label for="checkbox" class="visually-hidden">Checkbox</label>
                    <input
                      type="checkbox"
                      v-model="item.is_completed"
                      @change="updateTask(item)" />
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Buttons -->
        <div class="mt-3">
          <button
            v-if="edit"
            @click="addTaskItem"
            class="btn btn-clr-primary text-white m-1">
            Add New Task
          </button>
          <button
            v-if="edit"
            @click="cancelEdit"
            class="btn btn-clr-primary text-white m-1">
            Cancel Edit
          </button>
          <router-link
            v-else
            to="/tasks"
            class="btn btn-clr-primary text-white m-1"
            >Go back</router-link
          >
        </div>
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
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useTaskStore } from "../stores/taskStore";
import { validateTaskData } from "../components/tasks/ValidateTaskData.js";

const route = useRoute();
const router = useRouter();
const toastMsg = useToast();
const taskStore = useTaskStore();
const data = ref(null);
const editData = ref(null);
const dataLoaded = ref(false);
const edit = ref(false);

const todoId = route.params.todoId;

onMounted(async () => {
  await fetchData();
});

// Fetching the specific Task from database
const fetchData = async () => {
  try {
    dataLoaded.value = false;
    data.value = await taskStore.fetchTaskById(todoId);
    editData.value = JSON.parse(JSON.stringify(data.value));
    dataLoaded.value = true;
  } catch (error) {
    toastMsg.error(`${error.message}`);
  }
};

// Toggle editMode for editing a particular task
const editMode = () => {
  edit.value = !edit.value;
  if (edit.value) {
    editData.value = JSON.parse(JSON.stringify(data.value));
  }
};

const cancelEdit = () => {
  edit.value = false;
  editData.value = JSON.parse(JSON.stringify(data.value));
};

const updateTask = async () => {
  const validationError = validateTaskData(editData.value);
  if (validationError) {
    toastMsg.error(validationError);
    return;
  }
  try {
    await taskStore.updateTaskById({
      id: todoId,
      todosName: editData.value.todosName,
      todosInfo: editData.value.todosInfo,
    });
    data.value = JSON.parse(JSON.stringify(editData.value));
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
  if (editData.value.todosInfo.length > 1) {
    editData.value.todosInfo = editData.value.todosInfo.filter(
      (todo) => todo.id !== id
    );
  } else {
    toastMsg.error("Cannot delete the last task item!");
  }
};

const addTaskItem = () => {
  if (editData.value.todosType === "personal") {
    editData.value.todosInfo.push({
      id: generateUID(),
      todosInfo: "",
      whattodo: "",
      is_completed: false,
    });
  } else if (editData.value.todosType === "work") {
    editData.value.todosInfo.push({
      id: generateUID(),
      todosInfo: "",
      project: "",
      deadline: "",
      is_completed: false,
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

const bgColor = computed(() => {
  return data.value ? data.value.backgroundColor : "white";
});

const isLoggedIn = computed(() => taskStore.isLoggedIn);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
