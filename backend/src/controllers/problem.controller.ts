
import { Request,Response } from "express"
import {prisma} from "../libs/PrismaDb"
import { getJudge0LanguageId } from "../libs/juge0.lib";

export const createProblem= async (req: Request, res: Response): Promise<any> => {
//  get all the req data from body 
const{title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,refrenceSolution} =req.body;

if(req.user?.role !== "ADMIN") {
    return res.status(403).json({
        message: "You are not authorized to create a problem.",
        success: false
        
    });
}
    try {
        
    for (const [langauge,solutionCode] of Object.entries(refrenceSolution || {})){
        const languageId =getJudge0LanguageId(langauge);
        if (!languageId) {
            return res.status(400).json({
                message: `Unsupported language: ${langauge}`,
                success: false
            });
        }
    }
    } catch (error) {
        
    }

}
export const getProblems= async (req: Request, res: Response): Promise<any> => {}


export const getProblemById =async (req: Request, res: Response): Promise<any> => {}



export const updateProblemById =async (req: Request, res: Response): Promise<any> => {}

export const deleteProblemById =async (req: Request, res: Response): Promise<any> => {}

export const getAllProblemSolvedByUser= async (req: Request, res: Response): Promise<any> => {}
