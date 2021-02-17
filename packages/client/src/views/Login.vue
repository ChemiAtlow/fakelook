<template>
  <Container>
    <h1>Login</h1>
    <FormField label="Username" v-model="username" />
    <FormField label="Password" v-model="password" type="password" />
  </Container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Container } from "@/components/Layout";
import { FormField } from "@/components/Forms";

const component = defineComponent({
  name: "Login",
  components: { Container, FormField },
  async setup() {
    const username = ref("");
    const password = ref("");
    return { username, password };
  },
});

export default component;
</script>

<style lang="scss" scoped></style>
