const path = require('path');
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/utils/_vars.scss";`,
            },
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@fakelook/common": path.resolve(__dirname, "..", "common", "src"),
            },
        },
    },
    // chainWebpack: config => {
    //     config.plugins.delete("prefetch");
    // },
};
