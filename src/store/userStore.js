import { defineStore } from "pinia";
import { supabase } from "./supabase/supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    async fetchUser() {
      const user = supabase.auth.user();
      if (user) {
        this.user = user;
        const { data: profile, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", this.user.id)
          .single();

        if (error) throw error;

        if (profile) this.profile = profile;
        console.log("user in store: ", this.user);
        console.log("profile in store: ", this.profile);
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
