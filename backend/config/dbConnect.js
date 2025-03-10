import mongoose from "mongoose"
const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then((con)=>{
        console.log("Sucessfully connected to database ",con.connection.host);
        
    })
    .catch((err)=>{
        console.log("Failed to connect with database",err);
        process.exit(1)
        
    })
}

export default dbConnect