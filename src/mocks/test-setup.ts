import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { createTestingPinia } from "@pinia/testing";

const queryClient = new QueryClient();
const pinia = createTestingPinia();

// Global setup for all tests
export function setupGlobalTestEnv() {
    return {
        global: {
            plugins: [VueQueryPlugin, queryClient, pinia],
        },
    };
}
