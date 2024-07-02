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
                  <span class="input-group-addon">
                    <i class="fa fa-user"></i>
                  </span>
                  <input
                    type="email"
                    class="input-field form-control"
                    placeholder="example@gmail.com"
                    id="email"
                    v-model="email"
                    required />
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    class="input-field form-control"
                    placeholder="**********"
                    id="password"
                    v-model="password"
                    required />
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3 text-danger" v-show="errorMsg">
                      {{ errorMsg }}
                    </div>
                    <button
                      class="button text-white btn btn-clr-primary mb-2"
                      type="submit">
                      Enter
                    </button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0 text-muted">
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
import { useRouter } from "vue-router";
import { supabase } from "../../supabase/supabase";
import { useUserStore } from "../../stores/userStore";
import PersonalRouter from "./PersonalRouter.vue";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const redirect = useRouter();

const route = "/auth/signup";
const buttonText = "Sign Up";

const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
    alert("Logged in successfully");
  } catch (error) {
    errorMsg.value = error.message;
    console.log(error);
    setTimeout(() => {
      errorMsg.value = "";
    }, 5000);
  }
};
</script>
