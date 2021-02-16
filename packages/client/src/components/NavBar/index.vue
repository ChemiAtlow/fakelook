<template>
    <div class="navbar">
        <div class="navbar__title">
            <h1>Fakelook</h1>
        </div>
        <div>
            <router-link to="/">Home</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/about">About</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const component = defineComponent({
    name: "NavBar"
});

export default component;
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $bubble-bg;
    box-shadow: 0 1px 20px rgba($deep-blue, 0.5);
    z-index: 3;
    &__title h1 {
        font-size: 2rem;
        margin: 0 1rem;
        color: $light;
    }
}
</style>