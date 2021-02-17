import { defineAsyncComponent } from "vue";

export const FormField = defineAsyncComponent(() =>
    import(/* webpackChunkName: "forms" */ "./FormField.vue")
);
