import { Router } from "express";
import { signUp,login,logout } from "../controllers/user.controller.js";

const userRouter=Router()

userRouter.post("/signup",signUp)
userRouter.post("/login",login)
userRouter.get("/logout:id",logout)

export default userRouter