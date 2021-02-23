<template>
    <NavBar />
    <div class="page">
        <template v-if="error">
            {{ error }}
        </template>
        <router-view v-else v-slot="{ Component, route }">
            <transition
                :name="route.meta.transitionName || 'fade'"
                mode="out-in"
                :key="route.path"
            >
                <suspense timeout="0">
                    <template #default>
                        <div>
                            <component :is="Component" :key="route.path" />
                        </div>
                    </template>
                    <template #fallback>
                        <app-loader />
                    </template>
                </suspense>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from "vue";
import NavBar from "@/components/NavBar/index.vue";

const component = defineComponent({
    name: "App",
    components: { NavBar },
    setup() {
        const error = ref<Error>();
        onErrorCaptured(e => {
            error.value = e as Error;
            return true;
        });
        return { error };
    }
});

export default component;
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

::-webkit-scrollbar {
    width: 0.4rem;
    &-track {
        background: $primary;
    }
    &-thumb {
        background: $darker-blue;
        background: $button-bg;
        &:hover {
            background: $dark-blue;
        }
    }
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}
body {
    margin: 0;
    font-family: "Assistant", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: $light-gray;
    > #app {
        height: 100%;
        display: grid;
        grid-template-rows: $header-height 1fr;
        text-align: center;
        > .page {
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
            input,
            textarea {
                font-family: "Assistant", sans-serif;
            }
            .fade-enter,
            .fade-leave {
                &-active {
                    transition: opacity 0.5s ease;
                }
                &-from,
                &-to {
                    opacity: 0;
                }
            }
        }
    }
}
</style>
