<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/userStore";
import NavbarSection from "./components/Nav.vue";
import FooterSection from "./components/footer.vue";

const router = useRouter();
const userStore = useUserStore();

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

const isAuthRoute = computed(() => {
  const currentPath = router.currentRoute.value.path;
  return currentPath.startsWith("/auth");
});
</script>

<template>
  <div class="app-wrapper">
    <header>
      <NavbarSection />
    </header>

    <main>
      <div
        class="container d-flex justify-content-center"
        style="padding: 50px 0 100px 0">
        <transition name="fade" v-if="!isAuthRoute">
          <RouterView />
        </transition>
        <RouterView v-else />
      </div>
    </main>

    <footer>
      <FooterSection />
    </footer>

    <router-link v-if="!isTaskCreate" to="/create" class="create-task-button">
      <div class="circle btn-clr-primary">
        <span class="plus-sign">+</span>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
