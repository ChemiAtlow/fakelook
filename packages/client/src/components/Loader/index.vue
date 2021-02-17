<template>
     <div className="loader">
        <span className="loader__ball loader__ball--1" />
        <span className="loader__ball loader__ball--2" />
        <span className="loader__ball loader__ball--3" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const component = defineComponent({
    name: "Loader",
})

export default component;
</script>

<style lang="scss" scoped>
.loader{
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    }
    &__ball {
      display: inline-block;
      margin: auto 0.5rem;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
      background: $button-bg;

      &--1,
      &--2,
      &--3 {
        animation: bulging 2s infinite ease-in-out;
      }

      &--1 {
        animation-delay: -0.4s;
      }

      &--2 {
        animation-delay: -0.2s;
      }

      @keyframes bulging {
        0%,
        80%,
        100% {
          transform: scale(0);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
}
</style>