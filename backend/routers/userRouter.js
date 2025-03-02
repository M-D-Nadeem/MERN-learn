import express from "express"
import { login, logOut, register } from "../controller/userControllers.js"
const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logOut)

export default userRouter