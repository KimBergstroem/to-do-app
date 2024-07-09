<template>
  <div class="container d-flex justify-content-center">
    <div v-if="isLoggedIn" class="card-profile p-3">
      <div class="d-flex flex-column flex-md-row align-items-md-center">
        <div class="image text-center">
          <Avatar
            v-model:path="avatar_url"
            size="10"
            :showUploadButton="false" />
          {{ full_name }}
        </div>

        <div class="ml-md-3 mt-3 mt-md-0 flex-grow-1">
          <h4 class="mb-0 mt-0">{{ username }}</h4>
          <span>{{ work_title }}</span>
          <div class="p-2 mt-2 bg-primary rounded text-white stats">
            <div class="d-flex flex-column">
              <span class="articles">Pending Task</span>
              <span class="number1">{{ totalTasks }}</span>
            </div>

            <div class="d-flex flex-column">
              <span class="followers">Solved Task</span>
              <span class="number2">980</span>
            </div>

            <div class="d-flex flex-column">
              <span class="rating">Total Task</span>
              <span class="number3">8.9</span>
            </div>
          </div>

          <div class="mt-2 d-flex flex-column flex-md-row gap-2">
            <router-link
              to="/create"
              class="btn text-white btn-clr-primary w-100 ml-md-2">
              Create Task
            </router-link>
            <router-link
              to="/profile/edit"
              class="btn text-white btn-clr-primary w-100 ml-md-2">
              Edit Profile
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex flex-column align-items-center">
      <h1 class="text-2xl">
        Please log in before you can access your profile.
      </h1>
      <router-link class="btn text-white btn-clr-primary mt-3" to="/auth/signIn"
        >Sign In</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useTaskStore } from "../stores/taskStore";
import { useToast } from "vue-toastification";
import Avatar from "../components/profiles/ProfileAvatar.vue";

const userStore = useUserStore();
const taskStore = useTaskStore();
const toastMsg = useToast();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const totalTasks = computed(() => taskStore.tasks.length);

const loading = ref(false);
const username = ref(null);
const full_name = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const work_title = ref(null);

onMounted(() => {
  if (isLoggedIn.value) {
    getProfile();
  }
});

async function getProfile() {
  try {
    loading.value = true;
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    website.value = userStore.profile.website;
    full_name.value = userStore.profile.full_name;
    work_title.value = userStore.profile.work_title;
    avatar_url.value = userStore.profile.avatar_url;
    await taskStore.fetchTasks();
  } catch (error) {
    toastMsg.error(`${error.message}`);
  } finally {
    loading.value = false;
  }
}
</script>
