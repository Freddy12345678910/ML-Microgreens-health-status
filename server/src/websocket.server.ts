import { Server } from "socket.io";

const MyWebSocketServer = new Server(9500, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export default MyWebSocketServer;
