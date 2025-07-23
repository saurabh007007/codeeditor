import express from "express";
import { authMiddeware } from "../middleware/auth.middleware";
import { getAllSubmissions, getAllTheSubmissionsForProblem, getSubmissionForProblem } from "../controllers/submission.controller";

const submitionRoute=express.Router();



submitionRoute.get("/get-all-submissions",authMiddeware,getAllSubmissions)
submitionRoute.get("/get-submissions/:id",authMiddeware,getSubmissionForProblem)
submitionRoute.get("/get-submissions-count/:problemId",authMiddeware,getAllTheSubmissionsForProblem)

export default submitionRoute;
