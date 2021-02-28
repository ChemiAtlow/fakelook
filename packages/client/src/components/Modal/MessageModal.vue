<template>
    <BaseModal :close="close">
        <template #title>{{ title }}</template>
        <template #default><p>{{ message }}</p></template>
        <template #footer>
            <Button v-if="okText" @click="close(true)">{{okText}}</Button>
            <Button v-if="cancelText" @click="close(false)">{{cancelText}}</Button>
        </template>
    </BaseModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseModal from "./BaseModal.vue";
import { Button } from "@/components/Forms";

const component = defineComponent({
    name: "MessageModal",
    components: { BaseModal, Button },
    props: {
        close: {
            type: Function as PropType<(value?: any) => void>,
            required: true,
        },
        title: String,
        message: String,
        okText: String,
        cancelText: String
    }
});

export default component;
</script>

<style lang="scss" scoped>
</style>