import { computed, reactive } from "vue";
import router from "@/router";

const { currentRoute } = router;

export const username = reactive({ value: "", error: "" });
export const password = reactive({ value: "", error: "" });

export const isLogin = computed(() => /login/.test(currentRoute.value.path));
export const isSignup = computed(() => /signup/.test(currentRoute.value.path));
export const isRecover = computed(() => /recover/.test(currentRoute.value.path));

export const pageTitle = computed(() => {
    switch (currentRoute.value.path) {
        case "/login":
            return "Login";
        case "/signup":
            return "Signup";
        case "/recover":
            return "Recover forgotten password";
        default:
            return "Reset password";
    }
});
export const changeView = (path: "login" | "signup" | "recover") => {
    router.replace({ path: `/${path}` });
};