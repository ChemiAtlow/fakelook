/* eslint-disable */
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "@/utils/_exportVars.scss" {
    type vars = {
        anotherGray: string,
        dark: string,
        darkBlue: string,
        darkGray: string,
        darkGreen: string,
        darkRed: string,
        darkerBlue: string,
        deepBlue: string,
        gray: string,
        grayishBlue: string,
        light: string,
        lightGray: string,
        lightGreen: string,
        lightRed: string,
        midGray: string,
        midLightGray: string,
        primary: string,
        red: string,
        secondary: string,
    }
    const def: vars;
    export default def;
}
