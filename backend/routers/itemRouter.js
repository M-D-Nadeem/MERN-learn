import express from "express"
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controller/itemsControllers.js"
import { authmiddleware } from "../middlewares/userMiddleware.js"
const itemRouter=express.Router()

itemRouter.get("/get",getAllItems)
itemRouter.get("/get/:id",getItemById)
itemRouter.post("/create",authmiddleware,createItem)
itemRouter.put("/update/:id",authmiddleware,updateItem)
itemRouter.delete("/delete/:id",authmiddleware,deleteItem)

export default itemRouter