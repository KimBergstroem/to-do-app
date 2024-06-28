<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4 bg-darken">
            <div class="card-body text-white">
              <h1>Create</h1>
              <p class="text-muted">Sign Up a new account</p>
              <form @submit.prevent="signUp" class="form-sign-in">
                <div class="row mb-3">
                  <label for="email" class="col-12 mb-2">Email</label>
                  <div class="col-12">
                    <div class="input-group">
                      <span class="input-group-addon"
                        ><i class="fa fa-user"></i
                      ></span>
                      <input
                        type="email"
                        class="input-field form-control"
                        id="email"
                        placeholder="example@gmail.com"
                        v-model="email"
                        required />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="password" class="col-12 mb-2">Password</label>
                  <div class="col-12">
                    <div class="input-group">
                      <span class="input-group-addon"
                        ><i class="fa fa-lock"></i
                      ></span>
                      <input
                        type="password"
                        class="input-field form-control"
                        id="password"
                        placeholder="**********"
                        v-model="password"
                        required />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="confirmPassword" class="col-12 mb-2"
                    >Confirm Password</label
                  >
                  <div class="col-12">
                    <div class="input-group">
                      <span class="input-group-addon"
                        ><i class="fa fa-lock"></i
                      ></span>
                      <input
                        type="password"
                        class="input-field form-control"
                        id="confirmPassword"
                        placeholder="**********"
                        v-model="confirmPassword"
                        required />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <button
                      class="button btn text-white btn-clr-primary mb-2"
                      type="submit">
                      Submit
                    </button>
                  </div>
                  <div class="col-6 text-right"></div>
                </div>
              </form>
            </div>
          </div>
          <div class="card text-white btn-clr-primary py-5 d-md-down-none">
            <div class="card-body text-center">
              <div>
                <h2>Sign In</h2>
                <p>
                  If you have any problem with the log in or don't remember your
                  credentials contact support.
                </p>
                <p>Already own an account?</p>
                <p>
                  <PersonalRouter
                    :route="route"
                    :buttonText="buttonText"
                    class="sign-up-link" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../../supabase/supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import PersonalRouter from "./PersonalRouter.vue";

const route = "/auth/signIn";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMsg = ref("");

const redirect = useRouter();

const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      alert("An confirmation email has been sent to you!");
      redirect.push({ path: "/auth/signIn" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = "";
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style scoped></style>
