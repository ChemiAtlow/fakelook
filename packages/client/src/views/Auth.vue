<template>
    <Container>
        <form>
            <h1>{{ pageTitle }}</h1>
            <FormField
                label="Username"
                v-model="username.value"
                autocomplete="username"
            />
            <FormField
                label="Password"
                v-model="password.value"
                autocomplete="current-password"
                type="password"
            />
            <Button>Login</Button>
        </form>
        <div class="btn__wrapper">
            <Button varaiety="secondary" @click="changeView('recover')" v-if="isLogin">
                Forgot password?
            </Button>
            <Button varaiety="secondary" @click="() => changeView(isLogin ? 'signup' : 'login')">
                {{isLogin ? "Don't have an account?" : "Go to login page!" }}
            </Button>
        </div>
        <template v-if="isLogin">
            <div class="btn__wrapper">
                <Button color="gray" icon="facebook"
                    >Login with Facebook</Button
                >
            </div>
            <div class="btn__wrapper">
                <Button color="gray" icon="google">Login with Google</Button>
            </div>
        </template>
    </Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Container } from "@/components/Layout";
import { FormField, Button } from "@/components/Forms";
import { username, password, isLogin, pageTitle, changeView } from "@/compositions/auth";

const component = defineComponent({
    name: "Login",
    components: { Container, FormField, Button },
    setup() {
        return { username, password, changeView, isLogin, pageTitle };
    }
});

export default component;
</script>

<style lang="scss" scoped>
.btn__wrapper {
    margin: 0.5rem 0;
}
</style>
