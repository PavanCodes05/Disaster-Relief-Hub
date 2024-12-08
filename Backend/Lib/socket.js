import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(receiverId) {
  return userMap[receiverId];
}

const userMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userMap[userId] = socket.id;
    console.log("userMap", userMap);
  }

  io.emit("join", Object.keys(userMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userMap[userId];
    io.emit("join", Object.keys(userMap));
  });
});

export { io, server, app };
