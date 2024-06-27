<script setup>
import Account from "../components/authentication/Account.vue";
import Auth from "../components/authentication/Auth.vue";
</script>

<template>
  <div class="text-center mb-4">
    <h1>Profile View</h1>
  </div>

  <Account v-if="session" :session="session" />
  <Auth v-else />
</template>

<style scoped></style>
