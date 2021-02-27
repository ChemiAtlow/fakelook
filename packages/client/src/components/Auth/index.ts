import { defineAsyncComponent } from "vue";

export const FacebookButton = defineAsyncComponent(() =>
    import(/* webpackChunkName: "auth" */ "./FacebookButton.vue")
);

export const GoogleButton = defineAsyncComponent(() =>
    import(/* webpackChunkName: "auth" */ "./GoogleButton.vue")
);
