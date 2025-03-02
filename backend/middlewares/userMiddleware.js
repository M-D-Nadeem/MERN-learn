import jwt from "jsonwebtoken"
const authmiddleware=(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"User not authorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        res.status(500).json({message:"Server error",error:err})
    }
}

const authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!req.user || !roles.include(req.user.role)){
            return res.status(400).json({message:"User not authorized"})
        }
        next()
    }
}

export {authorize,authmiddleware}