const concurrently = require("concurrently");

const fullstack = "fullstack";
const client = "client";
const server = "server";
const commands = {
    common: {
        command: "cd packages/common && npm run start:dev",
        name: "common",
        prefixColor: "green.bold",
    },
    back: {
        command: "cd packages/server && npm run start:dev",
        name: server,
        prefixColor: "cyan.bold",
    },
    auth: {
        command: "cd packages/service_authentication && npm run start:dev",
        name: "auth",
        prefixColor: "blue.bold",
    },
    identity: {
        command: "cd packages/service_identity && npm run start:dev",
        name: "identity",
        prefixColor: "white.bold",
    },
    view: {
        command: "cd packages/service_view && npm run start:dev",
        name: "view",
        prefixColor: "red.bold",
    },
    posts: {
        command: "cd packages/service_posts && npm run start:dev",
        name: "posts",
        prefixColor: "magenta.bold",
    },
    front: {
        command: "cd packages/client && npm run start:dev",
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

const commandsArr = [commands.common];
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
