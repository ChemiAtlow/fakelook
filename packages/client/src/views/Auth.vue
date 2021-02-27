<template>
    <app-loader v-if="isCallback" />
    <Container v-else>
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
                <FacebookButton />
            </div>
            <div class="btn__wrapper">
                <GoogleButton />
            </div>
        </template>
    </Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Container } from "@/components/Layout";
import { FormField, Button } from "@/components/Forms";
import { FacebookButton, GoogleButton } from "@/components/Auth";
import {
    username,
    password,
    email,
    repeatPassword,
    isLogin,
    isCallback,
    isSignup,
    isRecover,
    pageTitle,
    changeView,
} from "@/compositions/auth";
import { authService } from "@/services";

const component = defineComponent({
    name: "Auth",
    components: { Container, FormField, Button, GoogleButton, FacebookButton },
    async setup() {
        if (isCallback.value) {
            const queries = new URLSearchParams(window.location.search);
            let msg = "ERR";
            if (queries.has("code")) {
                const code = queries.get("code") || "";
                const origin = location.href.split("?")[0];
                const provider = queries.has("state") ? "facebook" : "google";
                try {
                    const { jwt } = await authService.thirdPartyConnect(
                        code,
                        origin,
                        provider
                    );
                    msg = jwt;
                } catch (err) {
                    console.warn(err);
                    msg = "ERR";
                }
            }
            if (window.opener) {
                window.opener.postMessage(msg);
                window.close();
            }
        }
        return {
            username,
            password,
            email,
            repeatPassword,
            changeView,
            isLogin,
            isCallback,
            isSignup,
            isRecover,
            pageTitle,
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
