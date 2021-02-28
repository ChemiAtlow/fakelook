import { defineAsyncComponent } from "vue";

export const BaseModal = defineAsyncComponent(() =>
    import(/* webpackChunkName: "modal" */ "./BaseModal.vue")
);

export const MessageModal = defineAsyncComponent(() =>
    import(/* webpackChunkName: "modal" */ "./MessageModal.vue")
);

export const ModalHandler = defineAsyncComponent(() =>
    import(/* webpackChunkName: "modal" */ "./ModalHandler.vue")
);
