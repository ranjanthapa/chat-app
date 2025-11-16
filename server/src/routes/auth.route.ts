import {Router} from "express";
import { login } from "../services/auth.service";


const authRoute = Router();

authRoute.post('/login', login)

export default authRoute;