import app from "./app";
import { connectDB } from "./configs/db.config";
import http from "http";
import { Server } from "socket.io";
import { Message } from "./models/messaage.model";
import { authSocketMiddleware } from "./middlewares/socket.middleware";

const server = http.createServer(app);
const io = new Server(server); 

io.use(authSocketMiddleware);
io.on("connection", async (socket) => {
  console.log(`${socket.data.user.email} join a chat`);

  socket.on("user-message", async (data) => {
    const message = await Message.create(data);
    io.emit("new-message", message);
    const chatCount = await Message.countDocuments();
    const stats = {
      activeUser: chatCount,
    };
    io.emit("stats", stats);
  });
});


connectDB();

server.listen(5000, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
