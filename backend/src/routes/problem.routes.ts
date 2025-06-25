import express from "express"
import { authMiddeware, isAdmin } from "../middleware/auth.middleware";
import { createProblem,getProblemById,getProblems ,getAllProblemSolvedByUser,updateProblemById,deleteProblemById} from "../controllers/problem.controller";

const problemRouter = express.Router()


//to create the problesm 
problemRouter.post("/create-problem",authMiddeware,isAdmin,createProblem)
//to get all problems

problemRouter.get("/get-all-problems",authMiddeware,getProblems)

//to get a single problem by id\
problemRouter.get("/get-problem/:id",authMiddeware,getProblemById)

//update problems 

problemRouter.put("/update-problem/:id",authMiddeware,isAdmin,updateProblemById)

//delete problems 

problemRouter.delete("/delete-problem/:id",authMiddeware,isAdmin,deleteProblemById)

//get all solved problems 

problemRouter.get("/get-solved-problems", authMiddeware, getAllProblemSolvedByUser);


export default problemRouter;