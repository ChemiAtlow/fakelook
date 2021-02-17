import { defineAsyncComponent } from "vue";

export const FormField = defineAsyncComponent(() =>
    import(/* webpackChunkName: "forms" */ "./FormField.vue")
);

export const Button = defineAsyncComponent(() =>
    import(/* webpackChunkName: "forms" */ "./Button.vue")
);
