<template>
  <div class="container">
    <h1>Edit Profile</h1>

    <div v-if="isLoggedIn" class="form-group text-center">
      <label for="avatar">Profile Picture</label>
      <Avatar
        v-model:path="form.avatar_url"
        @upload="uploadAvatar"
        size="10"
        :showUploadButton="true" />
    </div>

    <form v-if="isLoggedIn" @submit.prevent="updateProfile">
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
      <button @click="cancelEdit" class="btn btn-danger">Cancel</button>
    </form>
    <div class="mb-3 text-danger" v-show="errorMsg">
      {{ errorMsg }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "vue-router";
import Avatar from "../profiles/ProfileAvatar.vue";

const router = useRouter();

const userStore = useUserStore();
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
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = "";
    }, 5000);
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
    alert("Profile updated successfully");
    router.push("/profile");
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = "";
    }, 5000);
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
</style>
