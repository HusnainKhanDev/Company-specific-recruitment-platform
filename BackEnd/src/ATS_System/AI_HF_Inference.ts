import { OpenAI } from "openai";
import { ATSDataObj } from "../Types_Interfaces.js";
import { SetDataInDocument } from "./UpdateAppWithAIResult.js";


export async function Ats_AI(DataObje: ATSDataObj) {

    let Prompt = `You are an expert AI recruiter with deep understanding of candidate evaluation and job matching. I will provide the following information:

    1. Job Description: ${DataObje.JobDiscription}  
    2. Job Requirements: ${JSON.stringify(DataObje.JobRequirment)}  
    3. Candidate Resume Text: ${DataObje.CandidateResumeExtractedText}  
    4. Candidate Skills: ${JSON.stringify(DataObje.CandidateSkills)}

    Your task is to analyze and compare the candidate’s resume and skills against the job description and requirements. Provide a professional assessment of the candidate’s suitability for this job.

    Requirements for your analysis:  
    - Check if the candidate has the required skills listed in JobRequirment.  
    - Evaluate the relevance of the candidate’s past experience and achievements described in the resume.  
    - Compare the resume content with the key points in JobDiscription.  
    - Identify strengths and weaknesses in relation to this specific job.  
    - Consider missing skills or experience gaps as deductions in suitability.  
    - Provide a numeric score between 0 and 100 representing overall suitability.  
    - Provide concise, actionable feedback in 2-3 sentences explaining reasoning and gaps.  

    **Output format:**  
    Strictly return a JSON object as follows, without adding any extra text
    Return a JSON object ONLY. Do NOT add markdown, code blocks, explanations, or any extra text. The JSON should look like this exactly:

    {
    "Score": <number between 0 and 100>,  
    "feedback": "<2-3 concise sentences summarizing suitability, strengths, and gaps>"
    }

    Focus on accuracy, relevance, and completeness. Do not include anything outside this JSON.
    `
    // console.log(Prompt)
    const client = new OpenAI({
        baseURL: "https://router.huggingface.co/v1",
        apiKey: process.env.HF_TOKEN_ATS,
    });

    const chatCompletion = await client.chat.completions.create({
        model: "google/gemma-2-9b-it:featherless-ai",
        messages: [
            {
                role: "user",
                content: Prompt
            },
        ],
    });

    let RowContent = chatCompletion.choices[0].message?.content
    console.log("Row Content" ,RowContent)

    if(RowContent) {
        RowContent = RowContent.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        let AiResponse = JSON.parse(RowContent)
        return await SetDataInDocument(DataObje.ID, AiResponse.feedback, Number(AiResponse.Score))
        // console.log("Setting Up Data: ", DataObje.ID, AiResponse.feedback, Number(AiResponse.Score))
    }


}
