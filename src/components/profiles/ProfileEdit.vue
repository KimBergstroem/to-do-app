<template>
  <div class="container d-flex justify-content-center">
    <div v-if="isLoggedIn" class="card-profile p-3">
      <div class="d-flex flex-column flex-md-row align-items-md-center">
        <div class="image text-center">
          <Avatar
            v-model:path="form.avatar_url"
            size="10"
            :showUploadButton="true" />
        </div>
        <form @submit.prevent="updateProfile" class="profile-form">
          <div class="ml-md-3 mt-3 mt-md-0 flex-grow-1">
            <h4 class="mb-0 mt-0">{{ username }}</h4>
            <span>{{ work_title }}</span>

            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                type="text"
                v-model="form.username"
                class="form-control"
                placeholder="Enter your username"
                required />
            </div>
            <div class="form-group">
              <label for="full_name">Full Name</label>
              <input
                id="full_name"
                type="text"
                v-model="form.full_name"
                class="form-control"
                placeholder="Enter your full name"
                required />
            </div>
            <div class="form-group">
              <label for="work_title">Work Title</label>
              <input
                id="work_title"
                type="text"
                v-model="form.work_title"
                class="form-control"
                placeholder="Enter your work title" />
            </div>

            <div class="form-group">
              <label for="website">Website</label>
              <input
                id="website"
                type="url"
                v-model="form.website"
                class="form-control"
                placeholder="Enter your website URL" />
            </div>

            <button
              type="submit"
              class="btn text-white btn-clr-primary"
              :disabled="loading">
              {{ loading ? "Updating..." : "Update" }}
            </button>
            <button @click="cancelEdit" class="btn btn-danger m-3">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      <h2 class="text-center">Please log in to view your profile.</h2>
    </div>
    <div v-show="errorMsg" class="text-center mt-3">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "vue-router";
import Avatar from "./ProfileAvatar.vue";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toastMsg = useToast();

const isLoggedIn = computed(() => userStore.isLoggedIn);

const form = ref({
  username: "",
  full_name: "",
  website: "",
  work_title: "",
  avatar_url: "",
});

const loading = ref(false);
const errorMsg = ref("");

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push("/");
  } else {
    getProfile();
  }
});

async function getProfile() {
  try {
    loading.value = true;
    await userStore.fetchUser();
    form.value.username = userStore.profile.username;
    form.value.full_name = userStore.profile.full_name;
    form.value.website = userStore.profile.website;
    form.value.work_title = userStore.profile.work_title;
    form.value.avatar_url = userStore.profile.avatar_url;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  loading.value = true;
  try {
    const updates = {
      id: userStore.user.id,
      username: form.value.username,
      full_name: form.value.full_name,
      website: form.value.website,
      work_title: form.value.work_title,
      avatar_url: form.value.avatar_url,
      updated_at: new Date(),
    };
    await userStore.updateProfile(updates);
    toastMsg.success("Success: Updated Profile!", {
      toastClassName: "custom-toast-success",
    });
    router.push("/profile");
  } catch (error) {
    toastMsg.error(error.message);
  } finally {
    loading.value = false;
  }
}

function cancelEdit() {
  router.push("/profile");
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.image {
  flex: 0 0 auto;
}

@media (min-width: 768px) {
  .image {
    margin-right: 1rem;
  }
}
</style>
