<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div v-if="isLoggedIn">
          <div class="text-center card-box">
            <div class="member-card pt-2 pb-2">
              <div class="thumb-lg member-thumb mx-auto">
                <Avatar
                  v-model:path="avatar_url"
                  @upload="updateProfile"
                  size="10" />
              </div>
              <div>
                <h4>{{ username }}</h4>
                <p class="text-muted">
                  {{ work_title }} <span>| </span
                  ><a href="#" class="text-pink">{{ website }}</a>
                </p>
              </div>
              <div class="mt-3">
                <button type="button" class="btn btn-clr-primary m-1">
                  Create Task
                </button>
                <button type="button" class="btn btn-clr-primary m-1">
                  Edit Profile
                </button>
              </div>
              <div class="mt-4">
                <div class="row">
                  <div class="col-4">
                    <div class="mt-3">
                      <h4>2563</h4>
                      <p class="mb-0 text-muted">Pending</p>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mt-3">
                      <h4>6952</h4>
                      <p class="mb-0 text-muted">Done</p>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mt-3">
                      <h4>1125</h4>
                      <p class="mb-0 text-muted">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h2 class="text-center">Please log in to view your profile.</h2>
        </div>
        <div v-show="errorMsg" class="text-center mt-3">{{ errorMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import Avatar from "../components/profiles/ProfileAvatar.vue";

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const work_title = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    website.value = userStore.profile.website;
    work_title.value = userStore.profile.work_title;
    avatar_url.value = userStore.profile.avatar_url;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const updates = {
      id: userStore.user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      work_title: work_title.value,
      updated_at: new Date(),
    };

    console.log("Update Payload:", updates);

    await userStore.updateProfile(updates);

    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 50px;
}

.member-thumb {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .member-card {
    padding: 20px;
  }
}
</style>
