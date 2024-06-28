<template>
  <h1>SignIn Log In</h1>

  <p class="mt-4">
    Don't have an account?
    <PersonalRouter
      :route="route"
      :buttonText="buttonText"
      class="sign-up-link" />
  </p>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";
</script>

<style scoped></style>
