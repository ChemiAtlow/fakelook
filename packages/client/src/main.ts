import { createApp } from "vue";
import App from "./App.vue";
import Loader from "@/components/Loader/index.vue";
import { ClickOutside } from "./directives/clickOutside";
import "./registerServiceWorker";
import router from "./router";

createApp(App)
    .use(router)
    .component("app-loader", Loader)
    .directive("click-outside", ClickOutside)
    .mount("#app");
