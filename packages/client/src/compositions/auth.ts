import { computed, reactive, watch } from "vue";
import { constants } from "@fakelook/common";
import router from "@/router";

const { currentRoute } = router;
const { validators } = constants;

export const username = reactive({ value: "", error: "" });
export const password = reactive({ value: "", error: "" });
export const repeatPassword = reactive({ value: "", error: "" });
export const email = reactive({ value: "", error: "" });

export const isLogin = computed(() => /login/.test(currentRoute.value.path));
export const isSignup = computed(() => /signup/.test(currentRoute.value.path));
export const isRecover = computed(() =>
  /recover/.test(currentRoute.value.path)
);

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
