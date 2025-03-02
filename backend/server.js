import app from "./app.js";
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect.js";
dotenv.config()
dbConnect()

const PORT=3001
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})