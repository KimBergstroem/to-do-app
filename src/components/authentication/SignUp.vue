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
                    <div class="mb-3 text-danger" v-show="errorMsg">
                      {{ errorMsg }}
                    </div>
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
                  If you encounter any issues logging in or have forgotten your
                  credentials, please contact support.
                </p>
                <p>Already own an account?</p>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../../supabase/supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import PersonalRouter from "./PersonalRouter.vue";
import { useToast } from "vue-toastification";

const route = "/auth/signIn";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMsg = ref("");
const redirect = useRouter();
const toastMsg = useToast();

const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      toastMsg.success("An confirmation email has been sent to you!", {
        toastClassName: "custom-toast-success",
      });
      redirect.push({ path: "/auth/signIn" });
    } catch (error) {
      toastMsg.error(error.message);
    }
    return;
  } else {
    toastMsg.error("Password does not match");
  }
  errorMsg.value = "";
};
</script>
