const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin-next");
const RemovePlugin = require("remove-files-webpack-plugin");
const { HotModuleReplacementPlugin, ProgressPlugin } = require("webpack");
const { NODE_ENV = "production" } = process.env;
const PKG_DIR = path.join(__dirname, "..", "packages");
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";


const DIRS = {
    PKG_DIR,
    COMMON_DIR: path.join(PKG_DIR, "common"),
    SERVER_DIR: path.join(PKG_DIR, "server"),
    AUTH_DIR: path.join(PKG_DIR, "service_authentication"),
    IDENTITY_DIR: path.join(PKG_DIR, "service_identity"),
    POSTS_DIR: path.join(PKG_DIR, "service_posts"),
    VIEW_DIR: path.join(PKG_DIR, "service_view"),
};

const tsRule = pathName => ({
    test: /\.ts$/,
    loader: "ts-loader",
    include: pathName,
    options: {
        configFile: path.join(pathName, "tsconfig.json"),
    },
});
const plugins = currentServer => {
    const basePlugins = [new HotModuleReplacementPlugin()];
    return IS_PROD
        ? basePlugins
        : [
              ...basePlugins,
              new ProgressPlugin(),
              new WebpackShellPlugin({
                  onBuildEnd: { scripts: ["npm run execute"] },
              }),
              new RemovePlugin({
                  before: {
                      include: [path.join(currentServer, "dist")],
                  },
              }),
          ];
};
const baseOutput = currentServer => ({
    path: currentServer,
    filename: `dist/app.js`,
});
const baseResolve = {
    extensions: [".ts", ".js"],
    symlinks: false,
    alias: {
        "@fakelook/common/src": path.join(DIRS.COMMON_DIR, "src"),
        "@fakelook/common": path.join(DIRS.COMMON_DIR, "src"),
    },
};
const baseExternals = currentServer => [
    nodeExternals({
        allowlist: ["@fakelook/common", "@fakelook/common/src/backend"],
        modulesDir: path.resolve(__dirname, "..", "node_modules"),
        additionalModuleDirs: [
            path.resolve(currentServer, "node_modules"),
            path.resolve(DIRS.COMMON_DIR, "node_modules"),
        ],
    }),
];

/**
 *
 * @param {keyof typeof DIRS} server
 * @returns webpack setting.
 */
exports.serversSettings = server => {
    const currentServer = DIRS[server] || DIRS.SERVER_DIR;
    return {
        entry: path.join(currentServer, "src", "app.ts"),
        output: baseOutput(currentServer),
        plugins: plugins(currentServer),
        module: {
            rules: [tsRule(DIRS.COMMON_DIR), tsRule(currentServer)],
        },
        devtool: IS_PROD ? "source-map" : "cheap-module-eval-source-map",
        mode: NODE_ENV,
        target: "node",
        watch: IS_DEV,
        stats: IS_PROD ? "errors-only" : "normal",
        resolve: baseResolve,
        externals: baseExternals(currentServer),
    };
};
