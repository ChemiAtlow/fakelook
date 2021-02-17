<template>
    <div>
        <FormField label="Username" v-model="username" search />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormField } from "@/components/Forms";
async function fetchData() {
    return new Promise<void>(resolve => {
        setTimeout(resolve, 2000);
    });
}
const component = defineComponent({
    name: "Login",
    components: { FormField },
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