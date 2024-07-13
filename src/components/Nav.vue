<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-transparent m-4">
    <router-link class="navbar-brand" to="/"
      ><span class="logo-text">Reminder To Do</span></router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      @click="isCollapsed = !isCollapsed"
      :aria-expanded="!isCollapsed"
      aria-controls="navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      :class="['collapse', 'navbar-collapse', { show: !isCollapsed }]"
      id="navbarNav">
      <ul class="navbar-nav me-auto mt-2 mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link
            class="nav-link custom-nav-link"
            to="/"
            active-class="router-link-exact-active"
            @click="isCollapsed = true"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link custom-nav-link"
            to="/tasks"
            active-class="router-link-exact-active"
            @click="isCollapsed = true"
            >Tasks</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link custom-nav-link"
            to="/create"
            active-class="router-link-exact-active"
            @click="isCollapsed = true"
            >Create</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link custom-nav-link"
            to="/profile"
            active-class="router-link-exact-active"
            @click="isCollapsed = true"
            >Profile</router-link
          >
        </li>
      </ul>
      <div>
        <ul class="navbar-nav mx-auto text-center mb-2 mb-lg-0">
  <li v-if="isLoggedIn" class="nav-item d-flex align-items-center justify-content-center">
    <p class="nav-link mb-0">Welcome, {{ username }}</p>
  </li>
  <li v-if="isLoggedIn" class="nav-item d-flex align-items-center justify-content-center">
    <button @click="signOut" class="nav-link btn btn-link text-center">
      SIGN OUT
    </button>
  </li>
  <li v-else class="nav-item d-flex align-items-center justify-content-center">
    <router-link
      to="/auth/signIn"
      class="nav-link btn text-center"
      @click="isCollapsed = true">
      Sign In / Sign Up
    </router-link>
  </li>
</ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toastMsg = useToast();

let isCollapsed = ref(true);

const isLoggedIn = computed(() => userStore.isLoggedIn);

const username = computed(() =>
  userStore.profile ? userStore.profile.username : null
);

const signOut = async () => {
  try {
    await userStore.signOut();
    router.push({ path: "/" });
    toastMsg.success("Success: Signing Out!", {
      toastClassName: "custom-toast-success",
    });
  } catch (error) {
    toastMsg.error(error.message);
  }
};

</script>
