import type { LoginInterface } from "../interfaces/login.interface";
import api from "./axios";

export const registerUser = (data: any) =>
  api.post("/users/register", data);

export const loginUser = (data: LoginInterface) =>
  api.post("/auth/login", data);


export const updateUser = (data: any) =>{
  api.patch('/users', data)
}


export const deleteUser = ()=>{
  api.delete('/users')
}