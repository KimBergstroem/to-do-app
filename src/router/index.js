import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import ProfileEdit from "../components/profiles/ProfileEdit.vue";
import TaskView from "../views/TaskView.vue";
import TaskDetailView from "../views/TaskDetailView.vue";
import TaskCreate from "../components/tasks/TaskCreate.vue";
import Auth from "../components/authentication/Auth.vue";
import SignIn from "../components/authentication/SignIn.vue";
import SignUp from "../components/authentication/SignUp.vue";
import PasswordUpdate from "../components/authentication/PasswordUpdate.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      {
        path: "signin",
        component: SignIn,
        meta: {
          title: "Sign In",
        },
      },
      {
        path: "signup",
        component: SignUp,
        meta: {
          title: "Sign Up",
        },
      },
      {
        path: "password-update",
        component: PasswordUpdate,
        meta: {
          title: "Update Password",
        },
      },
    ],
  },
  {
    path: "/",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/profile/edit",
    component: ProfileEdit,
    meta: {
      title: "Edit Profile",
    },
  },
  {
    path: "/tasks",
    component: TaskView,
    meta: {
      title: "Tasks",
    },
  },
  {
    path: "/create",
    name: "TaskCreate",
    component: TaskCreate,
    meta: {
      title: "Create Task",
    },
  },
  {
    path: "/view-todo/:todoId",
    name: "View-todo",
    component: TaskDetailView,
    meta: {
      title: "Task Details",
    },
  },
  {
    path: "/:catchAll(.*)", // Catch all undefined routes
    component: NotFound,
    meta: {
      title: "404 Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set browser title for each route
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Reminder To Do`;
  next();
});

export default router;
