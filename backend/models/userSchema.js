import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt)
        next()
    }
    catch(err){
        next(err)
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}
export default mongoose.model("User",userSchema)