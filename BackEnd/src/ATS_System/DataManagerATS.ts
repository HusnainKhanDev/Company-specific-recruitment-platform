import  fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import pdf from 'pdf-extraction'
import { GetJobById } from '../Services/JobServices.js';
import { ATSDataObj } from '../Types_Interfaces.js';
import { Ats_AI } from './AI_HF_Inference.js';

export async function PassDataToATS(JID: any, ResumeName: string, CandSkills: string[], appId: any) {
    let fileName = ResumeName;
    const filePath = path.join("E:\\JavaScript Material\\JS Projects\\5_Company Specific Job Portal With ATS\\BackEnd\\Uploads\\", fileName);

    if (!fs.existsSync(filePath)) {
        console.log("File Does not Exist");
        return;
    }

    let dataBuffer = fs.readFileSync(filePath)


    const extension = fileName.split('.').pop()?.trim() 


    let extractedText;
    try {
        if (extension === "docx") {
                const result = await mammoth.extractRawText({ buffer: dataBuffer  });
                extractedText = result.value;
        } 
        else if (extension === "pdf") {
            const result = await pdf(dataBuffer)
            extractedText = result.text
        } 
        else {
            console.log("Invalid File Extension")
        }
        
        let AtsReadyData: ATSDataObj;
        const response: any = await GetJobById(JID) 
        if(response.description && response.requirements && appId && CandSkills && extractedText){
            AtsReadyData = {
                ID: appId,
                CandidateResumeExtractedText: extractedText,
                JobDiscription: response.description,
                JobRequirment: response.requirements,
                CandidateSkills: CandSkills
            }

            console.log("Data From Data Manager", AtsReadyData)
            return await Ats_AI(AtsReadyData)
        }
        else{
            console.error("Job Details are not Provided")
        }
    } 
    catch (error) {
        console.error("Error processing Application Data:", error);
        throw error;
    }
}