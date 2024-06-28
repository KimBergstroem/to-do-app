<template>
  <h1>SignUp Register</h1>

  <p class="mt-4">
    Already having an Account?
    <PersonalRouter
      :route="route"
      :buttonText="buttonText"
      class="sign-up-link" />
  </p>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";

// Route Variables
const route = "/auth/signin";
const buttonText = "Sign In";
</script>

<style scoped></style>
