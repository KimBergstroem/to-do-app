<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-transparent m-4">
    <router-link class="navbar-brand" to="/">Reminder To Do</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link
            class="nav-link custom-nav-link"
            to="/"
            exact-active-class="router-link-exact-active"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link custom-nav-link"
            to="/profile"
            exact-active-class="router-link-exact-active"
            >Tasks</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link custom-nav-link"
            to="/profile"
            exact-active-class="router-link-exact-active"
            >Profile</router-link
          >
        </li>
      </ul>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="isLoggedIn" class="log-out-welcome">
            <p>Welcome, {{ username }}</p>
          </li>
          <li v-if="isLoggedIn">
            <button @click="signOut" class="nav-link btn">Sign Out</button>
          </li>
          <li v-else>
            <router-link to="/auth/signIn" class="nav-link btn">
              Sign In / Sign Up
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div v-show="errorMsg">{{ errorMsg }}</div>
</template>

<script setup></script>

<style scoped>
.custom-nav-link {
  background-color: var(--custom-color-brand);
  color: var(--custom-color);
  padding: 0.5rem 1rem;
  border-radius: var(--custom-border-radius);
  margin: 0.5rem;
  transition: background-color 0.3s, color 0.3s;
}

.custom-nav-link:hover {
  background-color: var(--custom-color-brand-secondary);
}

.custom-nav-link.router-link-exact-active {
  background-color: var(--custom-color-brand-secondary);
}
</style>