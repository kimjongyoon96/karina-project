// websocket.ts
import { Server } from "socket.io";

let connectedUsers = 0;

export const setupWebSocket = (server: any): void => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    connectedUsers++;
    io.emit("user count", connectedUsers);

    socket.on("disconnect", () => {
      connectedUsers--;
      io.emit("user count", connectedUsers);
    });
  });
};
