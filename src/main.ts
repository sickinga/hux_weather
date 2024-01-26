import { createApp } from "vue";
import BootstrapVue3 from "bootstrap-vue-3";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const queryClient = new QueryClient();

const app = createApp(App);
app.use(BootstrapVue3);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.mount("#app");
