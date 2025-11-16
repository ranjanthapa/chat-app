import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
