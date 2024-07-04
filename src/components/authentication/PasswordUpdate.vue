<template>
  <div class="password-update">
    <h2>Update Your Password</h2>
    <form @submit.prevent="updatePassword">
      <label for="new-password">New Password:</label>
      <input type="password" id="new-password" v-model="newPassword" required />
      <label for="confirm-password">Confirm New Password:</label>
      <input
        type="password"
        id="confirm-password"
        v-model="confirmPassword"
        required />
      <button type="submit">Update Password</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const newPassword = ref("");
const confirmPassword = ref("");
const toast = useToast();

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    toast.error("Passwords do not match.");
    return;
  }
  try {
    await useUserStore().updatePassword(newPassword.value);
    toastMsg.success("Success: Password Updated!", {
      toastClassName: "custom-toast-success",
    });
    router.push("/auth/signIn");
  } catch (error) {
    toast.error(error.message);
  }
};
</script>
