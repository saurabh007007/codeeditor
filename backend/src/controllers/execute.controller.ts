import { Request, Response } from "express";
import { pollBatchResults, submitBatch } from "../libs/juge0.lib";
export const executeCode = async (req: Request, res: Response): Promise<any> => {
    try {


        const { source_code, language_id, stdin, expected_output, problemId } = req.body
        const userId = req.user?.id;

        // validate the test cases
        if (!Array.isArray(stdin)
            || stdin.length === 0
            || !Array.isArray(expected_output)
            || expected_output.length !== stdin.length
        ) {
            console.log(source_code, language_id, stdin, expected_output, problemId);
            return res.status(400).json({
                success: false,
                message: "Invalid test cases provided. Please provide valid input and expected output arrays."
            })
        }

        // now pare the batch submision for juge zero
        const submision = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,

        }))

        // now send submsion to juge zero
        const submitResponse = await submitBatch(submision)

        const tokens = submitResponse.map((res: any) => res.token);

        // poll the juge zero for all results
        const results = await pollBatchResults(tokens);

        console.log("Results from Juge Zero:", results);

        let allPassed =true;
        const detailedResults=results.map((result:any,i:number)=>{
            const stdout=result.stdout?.trim();
            const expected_outputs=expected_output[i]?.trim();
            const passed = stdout === expected_outputs;

            if (!passed) {
                allPassed = false;
            }

            // console.log(`Test Case ${i + 1}:`);
            // console.log(`Input: ${stdin[i]}`);
            // console.log(`Expected Output: ${expected_outputs}`);
            // console.log(`Actual Output: ${stdout}`);
            // console.log(`Passed: ${passed}`);

            return {
                testCase:i+1,
                passed,
                stdout,
                expected_output: expected_outputs,
                input: stdin[i],
                stderr: result.error || null,
                compile_output:result.compile_outputs || null,
                status:result.status.description,
                memory:result.memory ? `${result.memory} KB`:undefined,
                time: result.time ? `${result.time} ms` : undefined,



            }

            
        })
        console.log("Detailed Results:", detailedResults);

        

        return res.status(200).json({
            success: true,
            message: "Code executed successfully",
            data: results
        });

    } catch (error: any) {
        console.error("Error executing code:", error);
        return res.status(500).json({
            success: false,
            message: "Error executing code",
            error: error.message
        });

    }

}