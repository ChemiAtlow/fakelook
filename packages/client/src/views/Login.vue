<template>
    <Container>
        <form>
            <h1>Login</h1>
            <FormField label="Username" v-model="username" />
            <FormField label="Password" v-model="password" type="password" />
            <Button>Login</Button>
        </form>
        <div>
            <Button varaiety="secondary">Forgot password?</Button>
            <Button varaiety="secondary">Don't have an account?</Button>
        </div>
        <div>
            <Button color="gray" icon="facebook">Login with Facebook</Button>
        </div>
        <div>
            <Button color="gray" icon="google">Login with Google</Button>
        </div>
    </Container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Container } from "@/components/Layout";
import { FormField, Button } from "@/components/Forms";

const component = defineComponent({
    name: "Login",
    components: { Container, FormField, Button },
    async setup() {
        const username = ref("");
        const password = ref("");
        return { username, password };
    }
});

export default component;
</script>

<style lang="scss" scoped></style>
