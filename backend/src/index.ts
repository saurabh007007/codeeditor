import express,{Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT=process.env.PORT || 3000;

const app = express();3000
app.get("/",(req:Request,res:Response)=>{
    res.send("hello world")
})


app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
})