import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    // Fetching user from database "Supabase" built in auth.user
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
      }
    },

    // Update profile
    async updateProfile(updates) {
      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      this.profile = { ...this.profile, ...updates };
    },

    // Sign Up functionality
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;

        const { data: profile } = await supabase.from("profiles").insert([
          {
            id: this.user.id,
            username: email,
          },
        ]);
      }
    },

    // Sign In functionality
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from("profiles")
          .select()
          .eq("id", this.user.id)
          .single();

        if (profile) this.profile = profile;
      }
    },

    // Sign Out functionality
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      this.user = null;
      this.profile = null;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
