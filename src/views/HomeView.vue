<template>
  <div>
    <div v-if="isLoggedIn">
      <section class="welcome-section">
        <div class="container">
          <h2 class="text-center mb-4">Welcome to Your Dashboard!</h2>

          <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center align-items-stretch">
            <div class="col mb-4 d-flex">
              <div class="card flex-fill">
                <div class="card-body d-flex flex-column">
                  <h3 class="card-title">Create New Task</h3>
                  <p class="card-text flex-grow-1">
                    Start organizing your tasks efficiently.
                  </p>
                  <router-link
                    to="/create"
                    class="btn text-white btn-clr-primary btn-block mt-auto"
                    >Create Task</router-link
                  >
                </div>
              </div>
            </div>

            <div class="col mb-4 d-flex">
              <div class="card flex-fill">
                <div class="card-body d-flex flex-column">
                  <h3 class="card-title">Go to Your Profile</h3>
                  <p class="card-text flex-grow-1">
                    View and edit your profile information.
                  </p>
                  <router-link
                    to="/profile"
                    class="btn text-white btn-clr-primary btn-block mt-auto"
                    >Go to Profile</router-link
                  >
                </div>
              </div>
            </div>

            <div class="col mb-4 d-flex">
              <div class="card flex-fill">
                <div class="card-body d-flex flex-column">
                  <h3 class="card-title">More Information</h3>
                  <p class="card-text flex-grow-1">Learn more about our capabilities.👍</p>
                  <button class="btn text-white btn-clr-primary btn-block mt-auto">
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
        <h1 class="animatedText-heading logo-text">Welcome to&hellip;</h1>

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
