import { computed, reactive, watch } from "vue";
import { constants } from "@fakelook/common";
import router from "@/router";
import { openModal } from "./modal";
import { ErrorModal } from "@/components/Modal";
import { TabUtils } from "@/utils/TabUtils";
import { authService } from "@/services";

export const POPUP_NAME = "auth_pop";

const { currentRoute } = router;
const { validators } = constants;

export const username = reactive({ value: "", error: "" });
export const password = reactive({ value: "", error: "" });
export const repeatPassword = reactive({ value: "", error: "" });
export const email = reactive({ value: "", error: "" });

export const isCallback = computed(() =>
    /auth_cb/.test(currentRoute.value.path)
);
export const isLogin = computed(() => /login/.test(currentRoute.value.path));
export const isSignup = computed(() => /signup/.test(currentRoute.value.path));
export const isRecover = computed(() =>
    /recover/.test(currentRoute.value.path)
);

export const isValid = computed(() => {
    if (isLogin.value) {
        return (
            !username.error &&
            username.value &&
            !password.error &&
            password.value
        );
    } else if (isRecover.value) {
        return !email.error && email.value;
    } else if (isSignup.value) {
        return (
            !username.error &&
            username.value &&
            !password.error &&
            !repeatPassword.error &&
            !email.error &&
            email.value
        );
    } else if (!isCallback.value) {
        return !password.error && !repeatPassword.error;
    } else {
        return true;
    }
});

export const sendForm = async () => {
    const formUser = {
        username: username.value,
        password: password.value,
        email: email.value,
    };
    //console.log("Form is being sent!", formUser);
    if (isLogin.value) {
        await authService.login(formUser);
        //store jwts on local storage and cookies
    } else if (isSignup.value) {
        await authService.signup(formUser);
        //is succesfull redirect to login
    } else if (isRecover.value) {
        await authService.requestPasswordReset(formUser);
        //if successful redirect to reset
    }
};

watch(
    () => username.value,
    (val) => {
        if (isLogin.value) {
            if (!validators.username.test(val) && !validators.email.test(val))
                username.error = "This is not a valid username/email!";
            else username.error = "";
        } else {
            if (!validators.username.test(val))
                username.error = "username is not valid!";
            else username.error = "";
        }
    }
);

watch(
    () => password.value,
    (val) => {
        if (!validators.password.test(val))
            password.error = "password is not valid!";
        else password.error = "";
    }
);

watch(
    [() => repeatPassword.value, () => password.value],
    ([repVal, pasVal]) => {
        if (repVal !== pasVal) repeatPassword.error = "passwords do not match!";
        else repeatPassword.error = "";
    }
);

watch(
    () => email.value,
    (val) => {
        if (!validators.email.test(val)) email.error = "email is not valid!";
        else email.error = "";
    }
);

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

let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;
export const openPopup = (url: string) => {
    if (
        !windowObjectReference ||
        windowObjectReference.closed ||
        previousUrl !== url
    ) {
        /* if no window, or window was closed */
        const strWindowFeatures =
            "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";
        windowObjectReference = window.open(url, POPUP_NAME, strWindowFeatures);
        if (previousUrl !== url) {
            /* URL changed, focus window */
            windowObjectReference?.focus();
        }
    } else {
        /* window already exists. */
        windowObjectReference.focus();
    }
    // assign the previous URL
    previousUrl = url;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
TabUtils.onBroadcastMessage<"ERR" | any>(POPUP_NAME, payload => {
    if (payload === "ERR" || !payload.jwt) {
        openModal(ErrorModal, {
            title: "Error!",
            message:
            "We were unable to log you in to the system using a 3rd party auth provider!\nPlease try again!",
        });
    } else {
        // Got the JWT - do something
        // eslint-disable-next-line no-console
        console.log(payload);
    }
});
