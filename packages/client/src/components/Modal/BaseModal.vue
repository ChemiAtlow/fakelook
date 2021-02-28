<template>
    <div class="modal" @click.stop>
        <header class="modal-header">
            <div class="modal-header__title">
                <slot name="title" />
            </div>
            <div class="modal-header__close" @click="close(false)">
                <Icon icon="close" />
            </div>
        </header>
        <main className="modal-body">
            <slot />
        </main>
        <footer v-if="$slots.footer" class="modal-actions">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Icon } from "@/components/Icon";

const component = defineComponent({
    name: "BaseModal",
    props: {
        close: {
            type: Function as PropType<(value?: any) => void>,
            required: true,
        },
    },
    components: { Icon },
});

export default component;
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 45rem;
    max-width: 90%;
    max-height: calc(100% - 12rem);
    background: $light;
    border-radius: 0.8rem;
    box-shadow: $blue-shadow;
    overflow-y: auto;
    z-index: 9;
    &-header {
        display: flex;
        align-items: center;
        background: $light-gray;
        height: $modal-section-height;
        border-bottom: 1px solid $another-gray;
        padding-left: $modal-padding;
        &__title {
            flex: 1;
            text-align: left;
            text-transform: uppercase;
            font-size: 1.2rem;
            font-weight: bold;
            letter-spacing: 0.12rem;
            height: 100%;
            display: flex;
            align-items: center;
        }
        &__close {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: $modal-section-height;
            height: $modal-section-height;
            border-left: 1px solid $another-gray;
            transition: all 350ms ease-in;
            &:hover {
                background: $grayish-blue;
            }
        }
    }
    &-body {
        padding: 0 $modal-padding;
        min-height: $modal-section-height;
    }
    &-actions {
        height: $modal-section-height;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid $another-gray;
        background: $light-gray;
    }
}
</style>