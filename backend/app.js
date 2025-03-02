import cookieParser from "cookie-parser"
import express from "express"
import itemRouter from "./routers/itemRouter.js"
import userRouter from "./routers/router.js"
const app=express()

app.use(express.json({limit:"5000mb"}))
app.use(cookieParser())
// app.use(cors({
//     origin:"",
//     credential:true
// }))
app.use("/auth",userRouter)
app.use("/item",itemRouter)

app.use("/",(req,res)=>{
    res.send("This server is running..!")
})


export default app