import { Request, Response } from "express";
import { prisma } from "../libs/PrismaDb";
export const getAllSubmissions = async (req:Request, res:Response):Promise<any> => {
try {
    const userId=req.user?.id;
    if(!userId){
        return res.status(401).json({message:"Unauthorized access"});
    }
    const submission =await prisma.submission.findMany({
        where:{
            userId:userId
        }

    })
    return res.status(200).json({
        success:true,
        message:"All the submissions for the user",
        submission
    })

    
} catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({
        success:false,
        message:"Internal server error",
        error:error instanceof Error ? error.message : "Unknown error"
    })
    
}


}




export const getSubmissionForProblem = async (req:Request, res:Response):Promise<any> => {
    try {
        
        const problemId = req.params.id;
        const userId= req.user?.id;
        if(!problemId || !userId){
            return res.status(400).json({message:"Problem ID or User ID is missing"});
        }
        const submision= await prisma.submission.findMany({
            where:{
                problemId:problemId,
                userId:userId
            }
        })

        return res.status(200).json({
            success:true,
            message:"Submission for the problem",
            submision
        })
        
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error instanceof Error ? error.message : "Unknown error"
        })
    }
}




export const getAllTheSubmissionsForProblem = async (req:Request, res:Response):Promise<any> => {

    try {
        const problemId = req.params.problemId;
        if(!problemId){
            return res.status(400).json({message:"Problem ID is missing"});
        }
        const submissions = await prisma.submission.count({
            where:{
                problemId:problemId
            }
        })

        return res.status(200).json({
            success:true,
            message:"All submissions for the problem",
            submissions
        })

    } catch (error) {
        console.error("Error fetching submissions:", error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error instanceof Error ? error.message : "Unknown error"
        })
    }
}