<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form @submit.prevent="signIn" class="form-sign-in">
          <div class="card-group mb-0">
            <div class="card p-4 bg-darken">
              <div class="card-body text-white">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3 form">
                  <label for="email" class="visually-hidden">Email</label>
                  <input
                    type="email"
                    class="input-field form-control rounded-end"
                    placeholder="example@gmail.com"
                    id="email"
                    v-model="email"
                    required />
                </div>
                <div class="input-group mb-4">
                  <label for="password" class="visually-hidden">Password</label>
                  <input
                    :type="passwordVisible ? 'text' : 'password'"
                    class="input-field form-control rounded-end"
                    placeholder="**********"
                    id="password"
                    v-model="password"
                    required />
                  <span @click="togglePassword" class="password-toggle-icon">
                    <font-awesome-icon
                      :icon="passwordVisible ? 'eye-slash' : 'eye'" />
                  </span>
                </div>
                <div class="row">
                  <div class="col-12 col-md-6">
                    <button
                      class="button text-white btn btn-clr-primary mb-2 w-100"
                      type="submit">
                      Enter
                    </button>
                  </div>
                  <div class="col-12 col-md-6 text-md-right">
                    <button
                      type="button"
                      class="btn px-0 text-white small"
                      @click="forgotPasswordAlert">
                      Forgot password?
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card text-white btn-clr-primary py-5 d-md-down-none">
              <div class="card-body text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    What are you waiting for? Sign up today to create new
                    reminders and tasks, and easily manage your daily life.
                  </p>
                  <p>Don't have an account?</p>
                  <p>
                    <PersonalRouter
                      :route="route"
                      :buttonText="buttonText"
                      class="sign-up-link fw-bold" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { validateForm } from "./validateAuthData.js";
import PersonalRouter from "./PersonalRouter.vue";

const route = "/auth/signup";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");
const passwordVisible = ref(false);

const redirect = useRouter();
const toastMsg = useToast();

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
};

const signIn = async () => {
  const { areAllValid, validationResults } = validateForm({
    email: email.value,
    password: password.value,
  });

  if (!areAllValid) {
    const firstError = validationResults.find((result) => !result.meets);
    toastMsg.error(firstError.invalidMessage);
    return;
  }

  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
    toastMsg.success("Success: Signing In!", {
      toastClassName: "custom-toast-success",
    });
  } catch (error) {
    toastMsg.error(error.message);
  }
};

const forgotPasswordAlert = () => {
  const inputEmail = prompt("Enter your email address for password reset:");
  if (inputEmail) {
    forgotPassword(inputEmail.trim());
  }
};

const forgotPassword = async (email) => {
  try {
    await useUserStore().passwordReset(email);
    toastMsg.success("Password reset email sent. Check your inbox!", {
      toastClassName: "custom-toast-success",
    });
  } catch (error) {
    toastMsg.error(error.message);
  }
};
</script>
