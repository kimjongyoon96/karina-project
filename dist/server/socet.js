"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = void 0;
// websocket.ts
const socket_io_1 = require("socket.io");
let connectedUsers = 0;
const setupWebSocket = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        connectedUsers++;
        io.emit("user count", connectedUsers);
        socket.on("disconnect", () => {
            connectedUsers--;
            io.emit("user count", connectedUsers);
        });
    });
};
exports.setupWebSocket = setupWebSocket;
