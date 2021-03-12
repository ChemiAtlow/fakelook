import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { activeUser } from "@/compositions/authState";
import { openModal } from "@/compositions/modal";
import { MessageModal } from "@/components/Modal";
import { refresh } from "@/services/auth.service";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        meta: {
            requiresAuth: true,
        },
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

const handler = (error: any) => { 
    console.log(error);
    refresh();
};
router.onError(handler);

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !activeUser.isConnected) {
        openModal(MessageModal, {
            title: "You are not logged in",
            message:
                "The page you attempted to reach requires authentication.\nPlease log in to continue!",
            okText: "OK",
        });
        next({ path: "/login", replace: true, query: { redirect: to.fullPath } });
    } else if (to.name === "Auth" && activeUser.isConnected) {
        next({ name: "Home" });
    } else {
        next();
    }
});
router.afterEach((to, from) => {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
});

export default router;
