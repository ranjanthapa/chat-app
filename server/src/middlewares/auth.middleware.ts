import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id ).select(
      "email _id"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = {id: user.id.toString(), email: user.email};
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
