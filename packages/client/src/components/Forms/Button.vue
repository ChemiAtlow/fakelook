<template>
    <button
        v-bind="$attrs"
        class="app-button"
        :class="{
            [color || '']: color,
            [varaiety || '']: varaiety,
            has__icon: icon
        }"
    >
        <Icon v-if="icon" :icon="icon" :color="darkGray" />
        <slot />
    </button>
</template>

<script lang="ts">
import styles from "@/utils/_exportVars.scss";
import { defineComponent } from "vue";
import { Icon, ICONS } from "../Icon";

const component = defineComponent({
    name: "Button",
    components: { Icon },
    props: {
        color: String as () => "error" | "gray",
        varaiety: String as () => "small" | "large" | "secondary",
        icon: String as () => keyof typeof ICONS
    },
    setup() {
        return { darkGray: styles.darkGray }
    }
});

export default component;
</script>

<style lang="scss" scoped>
@mixin button(
    $primaryBgColor,
    $labelColor: $light,
    $hoverColor: $primary,
    $borderColor: $primary
) {
    @extend %app-button;

    background: $primaryBgColor;

    @if $labelColor != $light {
        color: $labelColor;
    }

    &.secondary {
        background: $light;
        color: $borderColor;
        border: 1px solid $borderColor;
    }
    &.has__icon {
        width: 90%;
        max-width: 22rem;
        display: inline-grid;
        grid-template-columns: 1rem 1fr;
    }
    &:hover,
    &:focus {
        box-shadow: 0 0.3rem 1rem rgba($hoverColor, 0.5);
        border-color: transparent;
    }
}

@mixin button-variety($variety, $colors...) {
    &.#{$variety} {
        @include button($colors...);
    }
}

%app-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    height: 40px;
    border-radius: 0.3rem;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0 20px;
    font-size: 13px;
    letter-spacing: 1.2px;
    color: $light;
    white-space: nowrap;
    text-transform: uppercase;
    transition: all 300ms linear;
    margin: 0 0.2rem;

    &[disabled] {
        pointer-events: none;
        opacity: 0.7;
        cursor: default;
    }

    &.small {
        min-width: auto;
        padding: 0 14px;
    }

    &.large {
        height: 50px;
        border-radius: 3px;
        padding: 0 34px;
    }
}

.app-button {
    @include button($button-bg);
    @include button-variety("error", $warn-bg, $light, $red, $red);
    @include button-variety("gray", $gray-bg, $dark, $dark-gray, $dark-gray);
}
</style>