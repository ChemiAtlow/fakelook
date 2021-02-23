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
        <Button color="gray" icon="facebook">Login with Facebook</Button>
      </div>
      <div class="btn__wrapper">
        <Button color="gray" icon="google">Login with Google</Button>
      </div>
    </template>
  </Container>
  <teleport v-if="isLogin" to="body">
    <script src="https://apis.google.com/js/client:platform.js?onload=start">
    </script>
  </teleport>
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
  setup() {
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
