<script setup>
import { onMounted, ref, computed } from "vue";
import { supabase } from "./supabase/supabase";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/userStore";
import NavbarSection from "./components/Nav.vue";
import FooterSec from "./components/Footer.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser();
  } catch (error) {
    console.log(error.message);
  }
});

const isTaskCreate = computed(() => {
  return router.currentRoute.value.name === "TaskCreate";
});
</script>

<template>
  <div class="app-wrapper">
    <header>
      <NavbarSection />
    </header>

    <main>
      <div class="container" style="padding: 50px 0 100px 0">
        <RouterView />
      </div>
    </main>

    <footer>
      <FooterSec />
    </footer>

    <router-link v-if="!isTaskCreate" to="/create" class="create-task-button">
      <div class="circle btn-clr-primary">
        <span class="plus-sign">+</span>
      </div>
    </router-link>
  </div>
</template>
