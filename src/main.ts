import { createApp, watch } from "vue";
import BootstrapVue3 from "bootstrap-vue-3";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import { createPinia } from 'pinia';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


const queryClient = new QueryClient();
const pinia = createPinia()

watch(pinia.state, (state) => {
    if (state["saved-cities"]) {
        localStorage.setItem("cities", JSON.stringify(state["saved-cities"].cities));
    }
}, { deep: true });

const app = createApp(App);
app.use(BootstrapVue3);
app.use(VueQueryPlugin, { queryClient });
app.use(pinia)
app.use(router);
app.mount("#app");
