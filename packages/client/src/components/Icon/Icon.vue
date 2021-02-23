<template>
    <svg class="icon" viewBox="0 0 1024 1024">
        <path :d="currentIcon" />
    </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { ICONS } from "./icons";

const component = defineComponent({
    name: "Icon",
    props: {
        size: {
            type: Number,
            default: 16
        },
        icon: {
            type: String as () => keyof typeof ICONS,
            required: true
        },
        color: {
            type: String,
            default: "black"
        }
    },
    setup(props) {
        const currentIcon = computed(() => ICONS[props.icon]);
        return { currentIcon };
    }
});

export default component;
</script>

<style lang="scss" scoped>
svg {
    width: v-bind('`${size}px`');
    height: v-bind('`${size}px`');
    path {
        fill: v-bind(color);
    }
}
</style>