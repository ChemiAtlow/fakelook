const concurrently = require("concurrently");

const fullstack = "fullstack";
const client = "client";
const server = "server";
const commands = {
    common: {
        command: "cd packages/common && yarn start:dev",
        name: "common",
        prefixColor: "green.bold",
    },
    back: {
        command: "cd packages/server && yarn start:dev",
        name: server,
        prefixColor: "cyan.bold",
    },
    front: {
        command: "cd packages/client && yarn start:dev",
        name: client,
        prefixColor: "yellow.bold",
    },
};
const allowedAliases = {
    all: fullstack,
    e2e: fullstack,
    fullstack,
    client,
    react: client,
    front: client,
    server,
    back: server,
};
const requestedProject = allowedAliases[process.argv[2]] || fullstack;

const commandsArr = [commands.common];
if (requestedProject === fullstack) {
    console.log("Starting Fakelook E2E");
    commandsArr.push(commands.back, commands.front);
}
if (requestedProject === client) {
    console.log("Starting Fakelook Client");
    commandsArr.push(commands.front);
}
if (requestedProject === server) {
    console.log("Starting Fakelook Server");
    commandsArr.push(commands.back);
}
return concurrently(commandsArr, { prefix: "[@facelook/{name}:{pid}]" })
