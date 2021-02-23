module.exports = {
    // override vscode settings part
    //   settings: {
    //     "vetur.useWorkspaceDependencies": true,
    //     "vetur.experimental.templateInterpolationService": true
    //   },
    projects: [
        {
            root: "./packages/client",
            // Register globally Vue component glob.
            globalComponents: ["./src/components/**/*.vue"],
        },
    ],
};
