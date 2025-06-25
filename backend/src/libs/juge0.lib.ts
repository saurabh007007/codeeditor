import axios from "axios";

export const getJudge0LanguageId = (language: string): number | null => {
  const languageMap: Record<string, number> = {
    python: 71,
    java: 62,
    javascript: 63,
  };

  return languageMap[language.toLowerCase()] ?? null;
};

export const submitBatch= async (submissions: any[]): Promise<any> => {
    const {data}=await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{submissions})
    console.log("Results:",data)
    return data;
}


const sleep  = (ms:any)=> new Promise((resolve)=> setTimeout(resolve , ms))

export const pollBatchResults= async (tokens:any)=>{
    while(true){
        const {data}=await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
                
            }
       })
       const results=data.submissions;
       const isAllDone=results.every((result:any)=> result.status.id!==1 && result.status.id!==2 )
       if(isAllDone) return results;

       await sleep(1000)
        
    }

}