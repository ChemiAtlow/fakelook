<template>
    <transition name="fade">
        <div
            class="backdrop"
            v-if="modalInstances.length"
            @click="closeLastModal"
        ></div>
    </transition>
    <transition-group name="slide">
        <template v-for="(modal, index) in modalInstances" :key="index">
            <component
                :is="modal.Component"
                v-bind="modal.props"
                :close="val => closeModal(modal, val)"
            />
        </template>
    </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    modalInstances,
    closeModal,
    closeLastModal
} from "@/compositions/modal";

const component = defineComponent({
    name: "ModalHandler",
    setup() {
        return { modalInstances, closeModal, closeLastModal };
    }
});

export default component;
</script>

<style lang="scss" scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba($primary, 0.4);
    backdrop-filter: blur(0.75rem);
    height: 100%;
    z-index: 4;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(30%) !important;
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}
</style>
