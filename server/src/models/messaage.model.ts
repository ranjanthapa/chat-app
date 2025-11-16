import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "../interfaces/message.interface";

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
