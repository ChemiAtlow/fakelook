import { defineAsyncComponent } from "vue";

export const Container = defineAsyncComponent(() =>
    import(/* webpackChunkName: "layout" */ "./Container.vue")
);

export const Row = defineAsyncComponent(() =>
    import(/* webpackChunkName: "layout" */ "./Row.vue")
);
