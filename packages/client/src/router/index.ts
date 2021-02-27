import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/:page(login|signup|recover|reset|auth_cb)/:token?",
        name: "Auth",
        component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
    },
    {
        path: "/:catchAll(.*)",
        component: () => import(/* webpackChunkName: "error-pages" */ "../views/e404.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.afterEach((to, from) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
});

export default router;
