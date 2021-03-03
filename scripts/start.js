const concurrently = require("concurrently");

const fullstack = "fullstack";
const client = "client";
const server = "server";
const commands = {
    back: {
        command: "cd packages/server && yarn execute",
        name: server,
        prefixColor: "cyan.bold",
    },
    auth: {
        command: "cd packages/service_authentication && yarn execute",
        name: "auth",
        prefixColor: "blue.bold",
    },
    identity: {
        command: "cd packages/service_identity && yarn execute",
        name: "identity",
        prefixColor: "white.bold",
    },
    view: {
        command: "cd packages/service_view && yarn execute",
        name: "view",
        prefixColor: "red.bold",
    },
    posts: {
        command: "cd packages/service_posts && yarn execute",
        name: "posts",
        prefixColor: "magenta.bold",
    },
    front: {
        command: "cd packages/client && yarn serve",
        name: client,
        prefixColor: "yellow.bold",
    },
};
const allowedAliases = {
    all: fullstack,
    e2e: fullstack,
    fullstack,
    client,
    ui: client,
    front: client,
    server,
    back: server,
};
const requestedProject = allowedAliases[process.argv[2]] || fullstack;

const commandsArr = [];
const commandsArrBack = [commands.back, commands.auth, commands.identity, commands.view, commands.posts];
if (requestedProject === fullstack) {
    console.log("Starting Fakelook E2E");
    commandsArr.push(...commandsArrBack, commands.front);
}
if (requestedProject === client) {
    console.log("Starting Fakelook Client");
    commandsArr.push(commands.front);
}
if (requestedProject === server) {
    console.log("Starting Fakelook Server");
    commandsArr.push(...commandsArrBack);
}
return concurrently(commandsArr, { prefix: "[@fakelook/{name}:{pid}]" })
