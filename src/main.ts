import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

const queryClient = new QueryClient();

const app = createApp(App).use(router).use(VueQueryPlugin, { queryClient });

if (import.meta.env.MODE === "test") {
    const enableMocking = async () => {
        const { worker } = await import("./mocks/browser");
        return worker.start();
    };

    enableMocking().then(() => {
        app.mount("#app");
    });
} else {
    app.mount("#app");
}
