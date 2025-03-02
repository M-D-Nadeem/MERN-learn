import User from "../models/userSchema.js"
import jwt from "jsonwebtoken"
const register=async (req,res)=>{
    try{        
        const {username,email,password}=req.body
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User alredy exist with this email"})
        }
        
        const user=new User({username,email,password})
        await user.save()
        const token=jwt.sign(
            {id:user._id,username:username,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        )
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=="production",
            maxAge:24*60*60*1000,
            sameSite:'strict'
        })
        res.status(200).json({
            message:"User registed successfully",
            user:user,
            token
        })

    }catch(err){        
        res.status(500).json({message:"Server error",error:err})
    }
}

const login=async (req,res)=>{
    try{
       const {email,password}=req.body
       const user=await User.findOne({email})
       if(!user){
        return res.status(400).json({message:"Invalid credentials"})
       }
       const isMatch = await user.comparePassword(password);
       if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
       }

       const token=jwt.sign(
        {id:user._id,username:user.username,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"24h"}
    )
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV=="production",
        maxAge:24*60*60*1000,
        sameSite:'strict'
    })

    res.status(200).json({
        message:"Login successful",
        user:user,
        token,
    })

    }catch(err){
        console.log(err);
        
        res.status(500).json({message:"Server error",error:err})
    }
}

const logOut=(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Logout successful"})
}
export {register,login,logOut}