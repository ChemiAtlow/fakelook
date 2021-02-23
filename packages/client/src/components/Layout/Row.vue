<template>
    <div class="row"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const component = defineComponent({
    name: "Row",
})

export default component;
</script>

<style lang="scss" scoped>
.row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem,1fr));
    gap: 1rem;
    align-items: center;
}
</style>