import { Router } from "express";
import { deleteUser, register, updateDetail } from "../services/user.service";
import { auth } from "../middlewares/auth.middleware";
const userRoute = Router();

userRoute.post("/", register);
userRoute.patch('/', auth, updateDetail);
userRoute.delete('/', auth, deleteUser);

export default userRoute;
