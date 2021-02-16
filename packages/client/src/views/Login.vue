<template>
    <div>
        {{ data }}
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
async function fetchData() {  
    return new Promise<string>((resolve) => {
        fetch(`https://disease.sh/v3/covid-19/countries/?yesterday=true&strict=true`).then(res => {
            setTimeout(async () => resolve(await res.json()), 2000);
        });
    });
}
const component = defineComponent({
    name: "Login",
    async setup() {
        console.log("start fetch!")
        const data = ref<string>();
        data.value = await fetchData();
        console.log("done")
        return { data };
    }
});

export default component;
</script>

<style lang="scss" scoped>
</style>