<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "./supabase/supabase";
import NavbarSection from "./components/header/Nav.vue";
import FooterSection from "./components/footer/footer.vue";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
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
