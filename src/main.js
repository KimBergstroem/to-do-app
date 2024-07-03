import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue-toastification/dist/index.css";
import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Toast from "vue-toastification";
import {
  faEdit,
  faTrashAlt,
  faUser,
  faLaptopFile,
} from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faTrashAlt, faUser, faLaptopFile);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  toastClassName: "custom-toast",
  bodyClassName: "custom-body",
  containerClassName: "custom-container",
});

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
