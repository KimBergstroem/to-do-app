<template>
  <div class="container">
    <h3 class="header-title">Create an Account</h3>
    <SignUpForm />
    <p>
      Have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-in-link" />
    </p>
  </div>
</template>

<script setup>
import SignUpForm from "./formComponents/SignUpForm.vue";
import PersonalRouter from "./PersonalRouter.vue";

const route = "/auth/signin";
const buttonText = "Sign In";
</script>

<style scoped></style>
