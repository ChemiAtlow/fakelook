import { defineAsyncComponent } from "vue";

export * from "./icons";
export const Icon = defineAsyncComponent(() =>
    import(/* webpackChunkName: "icon" */ "./Icon.vue")
);
