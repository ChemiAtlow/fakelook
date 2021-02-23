module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/utils/_vars.scss";`,
            },
        },
    },
    // chainWebpack: config => {
    //     config.plugins.delete("prefetch");
    // },
};
