import JobModel from "../Models/JobModel.js";
import { JobParamsIF } from "../Types_Interfaces.js";

export async function createJob(params: JobParamsIF) {
    const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy } = params;

    if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
        throw new Error("All fields are required.");
    }

    requirements.forEach((item: string, index: number) => {
        requirements[index] = item.trim().toLowerCase();
    });


    console.log("Final requirment", requirements)

    const input = {
        title,
        closingDate,
        workSetup,
        salary: salary || "Negotiable",
        description,
        requirements: requirements.length > 0 ? requirements : [],
        jobType,
        createdBy
    }

    try{
        const newJob = await JobModel.create(input);
        if (!newJob) {
            throw new Error("Failed to create job.");
        }
        return newJob;
    }
    catch(err:any ) {
        console.error("Error creating job:", err);
        throw new Error(err.message);
    }

}

export async function getAllJobs() {
    try {
        const jobs = await JobModel.find();
        return jobs;
    } catch (err: any) {
        console.error("Error fetching jobs:", err);
        throw new Error(err.message);
    }
}

export async function searchJob(field: string, value: string) {
    try{
        if (!field || !value) {
            throw new Error("Field and value are required for search.");
        }

        const query: any = { [field]: value }
        
        const result = await JobModel.find(query);  

        if (!result || result.length === 0) {
            throw new Error("No jobs found for the given search criteria.");
        }

        return result;
    }
    catch (err: any) {
        // console.error("Error searching job:", err);
        throw new Error(err.message);
    }

}