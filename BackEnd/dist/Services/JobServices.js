import JobModel from "../Models/JobModel.js";
export async function createJob(params) {
    const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy } = params;
    if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
        throw new Error("All fields are required.");
    }
    const input = {
        title,
        closingDate,
        workSetup,
        salary: salary || "Negotiable",
        description,
        requirements: requirements.length > 0 ? requirements : [],
        jobType,
        createdBy
    };
    try {
        const newJob = await JobModel.create(input);
        if (!newJob) {
            throw new Error("Failed to create job.");
        }
        return newJob;
    }
    catch (err) {
        console.error("Error creating job:", err);
        throw new Error(err.message);
    }
}
