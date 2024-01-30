import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/dashboard",
    },
    {
        path: "/dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                "../views/DashboardView.vue"
            ),
    },
    {
        path: "/details",
        name: "details",
        component: () =>
            import(
                "../views/DetailsView.vue"
            ),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
