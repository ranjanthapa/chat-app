import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email,password);

  const user = await User.findOne({ email }).select("password");
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid Credintial" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7D",
  });

  return res.json({ token });
};
