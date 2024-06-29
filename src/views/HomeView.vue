<template>
  <div>
    <div v-if="isLoggedIn">
      <section class="welcome-section">
        <div class="container">
          <h2 class="text-center mb-4">Welcome to Your Dashboard!</h2>

          <div class="row justify-content-center">
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">Create New Task</h3>
                  <p class="card-text">
                    Start organizing your tasks efficiently.
                  </p>
                  <button class="btn text-white btn-clr-primary btn-block">
                    Create Task
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">Go to Your Profile</h3>
                  <p class="card-text">
                    View and edit your profile information.
                  </p>
                  <router-link
                    to="/profile"
                    class="btn text-white btn-clr-primary btn-block"
                    >Go to Profile</router-link
                  >
                </div>
              </div>
            </div>

            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">More Information</h3>
                  <p class="card-text">Learn more about our capabilities.</p>
                  <button class="btn text-white btn-clr-primary btn-block">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section v-else class="animatedText">
      <div class="animatedText-container">
        <p class="animatedText-heading logo-text">Welcome to&hellip;</p>

        <h2 class="animatedText-keyword">focused</h2>
        <h2 class="animatedText-keyword">organized</h2>
        <h2 class="animatedText-keyword">perfect 👌</h2>

        <p class="animatedText-description">
          Organize tasks like a champ, because time is too precious to remember
          everything!
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
import { computed } from "vue";

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
</script>

<style scoped></style>
