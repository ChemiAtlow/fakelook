const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin-next");
const RemovePlugin = require("remove-files-webpack-plugin");
const { HotModuleReplacementPlugin, ProgressPlugin } = require("webpack");
const { NODE_ENV = "production" } = process.env;
const PKG_DIR = path.join(__dirname, "packages");
const COMMON_DIR = path.join(PKG_DIR, "common");
const SERVER_DIR = path.join(PKG_DIR, "server");
const AUTH_DIR = path.join(PKG_DIR, "service_authentication");
const IDENTITY_DIR = path.join(PKG_DIR, "service_identity");
const POSTS_DIR = path.join(PKG_DIR, "service_posts");
const VIEW_DIR = path.join(PKG_DIR, "service_view");

const tsRule = pathName => ({
    test: /\.ts$/,
    loader: "ts-loader",
    include: pathName,
    options: {
        configFile: path.join(pathName, "tsconfig.json"),
    },
});
const commonSetting = {
    devtool: "source-map",
    mode: NODE_ENV,
    target: "node",
    watch: NODE_ENV === "development",
    resolve: {
        extensions: [".ts", ".js"],
        symlinks: false,
        alias: { "@fakelook/common": path.join(COMMON_DIR, "src") },
    },
    externals: [nodeExternals({ allowlist: ["@fakelook/common"] })],
};

module.exports = [
    {
        entry: path.join(COMMON_DIR, "src", "index.ts"),
        output: {
            path: COMMON_DIR,
            filename: `dist/index.js`,
        },
        module: { rules: [tsRule(COMMON_DIR)] },
        plugins: [new ProgressPlugin(), new HotModuleReplacementPlugin()],
        ...commonSetting,
    },
    {
        entry: {
            server: {
                import: path.join(SERVER_DIR, "src", "app.ts"),
            },
            service_authentication: {
                import: path.join(AUTH_DIR, "src", "app.ts"),
            },
            service_identity: {
                import: path.join(IDENTITY_DIR, "src", "app.ts"),
            },
            service_posts: {
                import: path.join(POSTS_DIR, "src", "app.ts"),
            },
            service_view: {
                import: path.join(VIEW_DIR, "src", "app.ts"),
            },
        },
        output: {
            path: PKG_DIR,
            filename: `[name]/dist/app.js`,
        },
        plugins: [
            new ProgressPlugin(),
            new HotModuleReplacementPlugin(),
            new WebpackShellPlugin({
                onBuildEnd: { scripts: NODE_ENV === "development" ? ["yarn start"] : [] },
            }),
        ],
        module: {
            rules: [
                tsRule(COMMON_DIR),
                tsRule(SERVER_DIR),
                tsRule(AUTH_DIR),
                tsRule(IDENTITY_DIR),
                tsRule(POSTS_DIR),
                tsRule(VIEW_DIR),
            ],
        },
        ...commonSetting,
    },
];
