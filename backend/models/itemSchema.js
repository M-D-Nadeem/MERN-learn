import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    price:{
       type:Number,
       required:true,
    },
    category:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

export default mongoose.model("Item",itemSchema)