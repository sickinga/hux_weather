import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const queryClient = new QueryClient();

// Global setup for all tests
export function setupGlobalTestEnv(): any {
    return {
        global: {
            plugins: [VueQueryPlugin, queryClient],
        },
    };
}
