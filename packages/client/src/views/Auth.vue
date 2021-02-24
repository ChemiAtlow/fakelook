<template>
    <Container>
        <form>
            <h1>{{ pageTitle }}</h1>
            <FormField
                label="Username"
                v-model="username.value"
                autocomplete="username"
                :error="username.error"
                v-if="!isRecover"
            />
            <FormField
                label="Email"
                v-model="email.value"
                autocomplete="email"
                :error="email.error"
                v-if="isSignup || isRecover"
            />
            <FormField
                label="Password"
                v-model="password.value"
                :autocomplete="isLogin ? 'current-password' : 'new-password'"
                type="password"
                :error="password.error"
                v-if="!isRecover"
            />
            <FormField
                v-if="isSignup"
                label="Repeat Password"
                v-model="repeatPassword.value"
                type="password"
                autocomplete="off"
                :error="repeatPassword.error"
            />
            <Button>Submit</Button>
        </form>
        <div class="btn__wrapper">
            <Button
                varaiety="secondary"
                @click="changeView('recover')"
                v-if="isLogin"
            >
                Forgot password?
            </Button>
            <Button
                varaiety="secondary"
                @click="() => changeView(isLogin ? 'signup' : 'login')"
            >
                {{ isLogin ? "Don't have an account?" : "Go to login page!" }}
            </Button>
        </div>
        <template v-if="isLogin">
            <div class="btn__wrapper">
                <Button color="gray" icon="facebook">
                    Login with Facebook
                </Button>
            </div>
            <div class="btn__wrapper">
                <Button color="gray" icon="google" @click="googleLogin">
                    Login with Google
                </Button>
            </div>
        </template>
    </Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Container } from "@/components/Layout";
import { FormField, Button } from "@/components/Forms";
import {
    username,
    password,
    email,
    repeatPassword,
    isLogin,
    isSignup,
    isRecover,
    pageTitle,
    changeView,
} from "@/compositions/auth";

const component = defineComponent({
    name: "Auth",
    components: { Container, FormField, Button },
    async setup() {
        let auth2: any = {};
        await new Promise<void>((res, rej) => {
            const gAPIScript = document.createElement("script");
            gAPIScript.setAttribute(
                "src",
                "https://apis.google.com/js/client:platform.js"
            );
            document.head.appendChild(gAPIScript);
            gAPIScript.onload = () => {
                const gapi = (window as any).gapi;
                gapi.load("auth2", function () {
                    auth2 = gapi.auth2.init({
                        //eslint-disable-next-line @typescript-eslint/camelcase
                        client_id:
                            "77598589513-08uj972lr28be5cdcl6a2bp8frk3h94j.apps.googleusercontent.com",
                    });
                });

                res();
            };
        });
        const googleLogin = async () => {
            try {
                const info = await auth2.grantOfflineAccess();
                console.log(info);
            } catch (error) {
                console.warn(error);
            }
        };
        return {
            username,
            password,
            email,
            repeatPassword,
            changeView,
            isLogin,
            isSignup,
            isRecover,
            pageTitle,
            googleLogin,
        };
    },
});

export default component;
</script>

<style lang="scss" scoped>
.btn__wrapper {
    margin: 0.5rem 0;
}
</style>
