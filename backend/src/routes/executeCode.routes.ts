import express from "express";
import { authMiddeware } from "../middleware/auth.middleware";
import { executeCode } from "../controllers/execute.controller";

const executionRoute = express.Router();


executionRoute.post("/",authMiddeware,executeCode)





export default executionRoute;