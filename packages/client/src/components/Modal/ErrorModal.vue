<template>
    <BaseModal :close="close">
        <template #title>
            <div class="error-modal__title">
                <div class="error-modal__title-icon">
                    <Icon icon="error" :color="darkRed" :size="25" />
                </div>
                <span>{{ title }}</span>
            </div>
        </template>
        <template #default>
            <p>{{ message }}</p>
        </template>
        <template #footer>
            <Button @click="close(true)">OK</Button>
        </template>
    </BaseModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BaseModal } from ".";
import styles from "@/utils/_exportVars.scss";
import { Button } from "@/components/Forms";
import { Icon } from "@/components/Icon";

const component = defineComponent({
    name: "ErrorModal",
    components: { BaseModal, Button, Icon },
    props: {
        close: {
            type: Function as PropType<(value?: boolean) => void>,
            required: true
        },
        title: String,
        message: String
    },
    setup() {
        return { darkRed: styles.darkRed }
    }
});

export default component;
</script>

<style lang="scss" scoped>
.error-modal__title {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: -1 * $modal-padding;
    &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: $modal-section-height;
        border-right: 1px solid $another-gray;
        margin-right: $modal-padding;
    }
}
</style>
