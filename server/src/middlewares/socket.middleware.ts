import jwt, { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";

export async function authSocketMiddleware(
  socket: Socket,
  next: (err?: any) => void
) {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    socket.data.user = decoded;
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
}
