<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "./supabase/supabase";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/userStore";
import NavbarSection from "./components/Nav.vue";
import FooterSection from "./components/footer.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser();
    if (!user.value) {
      appReady.value = true;
      router.push({ path: "/auth/SignIn" });
    } else {
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <header>
    <NavbarSection />
  </header>

  <main>
    <div class="container" style="padding: 50px 0 100px 0">
      <RouterView />
    </div>
  </main>

  <footer>
    <FooterSection />
  </footer>
</template>
