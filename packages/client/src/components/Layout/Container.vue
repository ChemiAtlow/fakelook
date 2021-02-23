<template>
    <div class="container"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const component = defineComponent({
    name: "Container",
    props: {
        align: {
            type: String as () =>  "start" | "center" | "end",
        }
    }
})

export default component;
</script>

<style lang="scss" scoped>
.container {
    width: 95%;
    max-width: 60rem;
    margin: 1rem auto;
    text-align: v-bind('align || "unset"');
}
</style>