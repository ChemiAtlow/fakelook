const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin-next");
const RemovePlugin = require("remove-files-webpack-plugin");
const { HotModuleReplacementPlugin, ProgressPlugin } = require("webpack");
const { NODE_ENV = "production" } = process.env;
const PKG_DIR = path.join(__dirname, "..", "packages");

const tsRule = pathName => ({
    test: /\.ts$/,
    loader: "ts-loader",
    include: pathName,
    options: {
        configFile: path.join(pathName, "tsconfig.json"),
    },
});

const DIRS = {
    PKG_DIR,
    COMMON_DIR: path.join(PKG_DIR, "common"),
    SERVER_DIR: path.join(PKG_DIR, "server"),
    AUTH_DIR: path.join(PKG_DIR, "service_authentication"),
    IDENTITY_DIR:  path.join(PKG_DIR, "service_identity"),
    POSTS_DIR: path.join(PKG_DIR, "service_posts"),
    VIEW_DIR: path.join(PKG_DIR, "service_view"),
};

exports.DIRS = DIRS;

/**
 * 
 * @param {keyof typeof DIRS} server 
 * @returns webpack setting.
 */
exports.serversSettings = server => {
    const currentServer = DIRS[server] || SERVER_DIR;
    return {
        entry: path.join(currentServer, "src", "app.ts"),
        output: {
            path: currentServer,
            filename: `dist/app.js`,
        },
        plugins: [
            new ProgressPlugin(),
            new HotModuleReplacementPlugin(),
            new WebpackShellPlugin({
                onBuildEnd: { scripts: NODE_ENV === "development" ? ["yarn execute"] : [] },
            }),
            new RemovePlugin({
                before: {
                    include: [path.join(currentServer, "dist")],
                },
            }),
        ],
        module: {
            rules: [tsRule(DIRS.COMMON_DIR), tsRule(currentServer)],
        },
        devtool: "source-map",
        mode: NODE_ENV,
        target: "node",
        watch: NODE_ENV === "development",
        resolve: {
            extensions: [".ts", ".js"],
            symlinks: false,
            alias: {
                "@fakelook/common/src": path.join(DIRS.COMMON_DIR, "src"),
                "@fakelook/common": path.join(DIRS.COMMON_DIR, "src"),
            },
        },
        externals: [
            nodeExternals({
                allowlist: ["@fakelook/common"],
                modulesDir: path.resolve(__dirname, "..", "node_modules"),
                additionalModuleDirs: [path.resolve(currentServer, "node_modules"),path.resolve(DIRS.COMMON_DIR, "node_modules"),],
            }),
        ],
    };
};
