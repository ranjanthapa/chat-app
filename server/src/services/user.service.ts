import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { User } from "../models/user.model";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "sucess",
      message: "user created",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!;
    const { password, ...data } = req.body;

    const user = await User.findById(id).select("+password");
    console.log({ user: req.user });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    Object.assign(user, data);
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User updated",
      data: data,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.user;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "User account deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
