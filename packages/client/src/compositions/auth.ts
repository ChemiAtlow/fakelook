import { computed, reactive, watch } from 'vue';
import { constants } from '@fakelook/common';
import router from '@/router';

const { currentRoute } = router;
const { validators } = constants;

export const username = reactive({ value: '', error: '' });
export const password = reactive({ value: '', error: '' });
export const repeatPassword = reactive({ value: '', error: '' });
export const email = reactive({ value: '', error: '' });

export const isCallback = computed(() => /auth_cb/.test(currentRoute.value.path));
export const isLogin = computed(() => /login/.test(currentRoute.value.path));
export const isSignup = computed(() => /signup/.test(currentRoute.value.path));
export const isRecover = computed(() => /recover/.test(currentRoute.value.path));

watch(
    () => username.value,
    (val) => {
        if (isLogin.value) {
            if (!validators.username.test(val) && !validators.email.test(val))
                username.error = 'This is not a valid username/email!';
            else username.error = '';
        } else {
            if (!validators.username.test(val)) username.error = 'username is not valid!';
            else username.error = '';
        }
    }
);

watch(
    () => password.value,
    (val) => {
        if (!validators.password.test(val)) password.error = 'password is not valid!';
        else password.error = '';
    }
);

watch([() => repeatPassword.value, () => password.value], ([repVal, pasVal]) => {
    if (repVal !== pasVal) repeatPassword.error = 'passwords do not match!';
    else repeatPassword.error = '';
});

watch(
    () => email.value,
    (val) => {
        if (!validators.email.test(val)) email.error = 'email is not valid!';
        else email.error = '';
    }
);

export const pageTitle = computed(() => {
    switch (currentRoute.value.path) {
        case '/login':
            return 'Login';
        case '/signup':
            return 'Signup';
        case '/recover':
            return 'Recover forgotten password';
        default:
            return 'Reset password';
    }
});
export const changeView = (path: 'login' | 'signup' | 'recover') => {
    router.replace({ path: `/${path}` });
};

let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;
export const receiveMessage = (event: any) => {
    // Ensure origin is trusted.
    if (event.origin !== window.location.origin) {
        return;
    }
    const { data } = event;
    // if we trust the sender and the source is our popup
    console.log('EV', data);
    if (data === 'ERR') {
        console.error('SHOULD SHOW MODAL, ERROR!');
    }
    if (data.code) {
        // get the URL params and redirect to our server to use Passport to auth/login
        const { payload } = data;
        const redirectUrl = `/auth/google/login${payload}`;
        window.location.pathname = redirectUrl;
    }
};
export const openPopup = (url: string, name: string) => {
    window.removeEventListener('message', receiveMessage);
    const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
    if (!windowObjectReference || windowObjectReference.closed || previousUrl !== url) {
        /* if no window, or window was closed */
        windowObjectReference = window.open(url, name, strWindowFeatures);
        if (previousUrl !== url) {
            /* URL changed, focus window */
            windowObjectReference?.focus();
        }
    } else {
        /* window already exists. */
        windowObjectReference.focus();
    }
    // listen for receiving a message from the popup
    window.addEventListener('message', receiveMessage, { capture: false, once: true });
    // assign the previous URL
    previousUrl = url;
};
