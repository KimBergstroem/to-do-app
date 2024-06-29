import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import Auth from "../components/authentication/Auth.vue";
import SignIn from "../components/authentication/SignIn.vue";
import SignUp from "../components/authentication/SignUp.vue";
import EditProfile from "../components/profiles/EditProfile.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "signin", component: SignIn },
      { path: "signup", component: SignUp },
    ],
  },
  { path: "/", component: HomeView },
  { path: "/profile", component: ProfileView },
  { path: "/profile/edit", component: EditProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
