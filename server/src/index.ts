import app from "./app";
import { connectDB } from "./configs/db.config";
import http from "http";
import { Server } from "socket.io";
import { Message } from "./models/messaage.model";
import { authSocketMiddleware } from "./middlewares/socket.middleware";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(authSocketMiddleware);

io.on("connection", async (socket) => {
  console.log(`${socket.data.user.id} joined the chat`);

  socket.on("message", async (text) => {
    console.log("Received:", text);

    const message = await Message.create({
      message: text,
      sender: socket.data.user.id,
    });

    socket.broadcast.emit("new-message", {
      text: message.message,
      user: socket.data.user.id, // other clients see sender ID
    });

    const chatCount = await Message.countDocuments();
    io.emit("stats", { totalChat: chatCount });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

connectDB();

server.listen(5000, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
