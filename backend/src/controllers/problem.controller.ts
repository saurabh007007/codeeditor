import { Request, Response } from "express";
import { prisma } from "../libs/PrismaDb";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/juge0.lib";

export const createProblem = async (
    req: Request,
    res: Response
): Promise<any> => {
    //  get all the req data from body
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        refrenceSolution,
    } = req.body;

    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
            message: "You are not authorized to create a problem.",
            success: false,
        });
    }
    try {
        for (const [langauge, solutionCode] of Object.entries(
            refrenceSolution || {}
        )) {
            const languageId = getJudge0LanguageId(langauge);
            if (!languageId) {
                return res.status(400).json({
                    message: `Unsupported language: ${langauge}`,
                    success: false,
                });
            }
            //@ts-ignore
            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));

            const submissionResults= await submitBatch(submissions)
        
            const tokens=submissionResults.map((res:any)=>res.token);

            const results= await pollBatchResults(tokens);

            for(let i=0;i<results.length;i++){
                const result:any=results[i];
                
                if(result.status.id !==3){
                    return res.status(400).json({error:`Testcase ${i+1} failed for the langauge${langauge}` })
                }

                //save the problems in database ; here now
                const newProblem=await prisma.problem.create({
                    //@ts-ignore
                    data:{
                        title,
                        description,
                        difficulty,
                        tags,
                        examples,
                        constraints,
                        testcases,
                        codeSnippets,
                        refrenceSolution,
                        userId:req.user.id

                    }
                })

                return res.status(201).json(newProblem);

            }

        }


    } catch (error) { }
};



export const getProblems = async (
    req: Request,
    res: Response
): Promise<any> => { };

export const getProblemById = async (
    req: Request,
    res: Response
): Promise<any> => { };

export const updateProblemById = async (
    req: Request,
    res: Response
): Promise<any> => { };

export const deleteProblemById = async (
    req: Request,
    res: Response
): Promise<any> => { };

export const getAllProblemSolvedByUser = async (
    req: Request,
    res: Response
): Promise<any> => { };
