import express,{Request,Response} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ProblemRouter from "./routes/problem.routes";
import executionRoute from "./routes/executeCode.routes";


import authRouter from "./routes/auth.routes";

dotenv.config();
const app = express();

// Middleware all goes here 
app.use(express.json());
app.use(cookieParser())

const PORT=process.env.PORT || 3000;

app.get("/",(req:Request,res:Response)=>{
    res.send("hello world 🐵")
})


//Routes for authentications
app.use("/api/v1/auth",authRouter)

//problem routes hai bro 
app.use("/api/v1/problems",ProblemRouter)
//code exectution section here

app.use("/api/v1/execute-code",executionRoute)




app.listen(PORT,()=>{
    console.log("Server is running on port " + PORT);
})