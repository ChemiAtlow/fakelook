<template>
    <Container>
        <h1>Login</h1>
        <FormField label="Username" v-model="username" />
        <FormField label="Password" v-model="username" />
    </Container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Container } from "@/components/Layout";
import { FormField } from "@/components/Forms";
async function fetchData() {
    return new Promise<void>(resolve => {
        setTimeout(resolve, 2000);
    });
}
const component = defineComponent({
    name: "Login",
    components: { Container, FormField },
    async setup() {
        const username = ref("");
        console.log("start fetch!");
        await fetchData();
        console.log("done");
        return { username };
    }
});

export default component;
</script>

<style lang="scss" scoped>
</style>