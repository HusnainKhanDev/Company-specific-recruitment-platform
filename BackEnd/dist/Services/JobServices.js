import JobModel from "../Models/JobModel.js";
export async function createJob(params) {
    const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy } = params;
    if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
        throw new Error("All fields are required.");
    }
    requirements.forEach((item, index) => {
        requirements[index] = item.trim().toLowerCase();
    });
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
export async function getAllJobs() {
    try {
        const jobs = await JobModel.find({ isDeleted: false });
        return jobs;
    }
    catch (err) {
        console.error("Error fetching jobs:", err);
        throw new Error(err.message);
    }
}
export async function searchJob(field, value) {
    try {
        if (!field || !value) {
            throw new Error("Field and value are required for search.");
        }
        const query = { [field]: value, isDeleted: false };
        const result = await JobModel.find(query);
        if (!result || result.length === 0) {
            throw new Error("No jobs found for the given search criteria.");
        }
        return result;
    }
    catch (err) {
        // console.error("Error searching job:", err);
        throw new Error(err.message);
    }
}
export async function GetJobById(ID) {
    try {
        if (!ID) {
            throw new Error("ID required for search.");
        }
        const result = await JobModel.findById(ID);
        return result;
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export async function UpdateJob(params) {
    const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy, _id } = params;
    // Validation
    if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
        throw new Error("All fields are required.");
    }
    // Normalize requirements
    const normalizedRequirements = requirements.map(item => item.trim().toLowerCase());
    const input = {
        title,
        closingDate,
        workSetup,
        salary: salary || "Negotiable",
        description,
        requirements: normalizedRequirements.length > 0 ? normalizedRequirements : [],
        jobType,
        createdBy
    };
    try {
        const updatedJob = await JobModel.findByIdAndUpdate(_id, input, {
            new: true, // Return the updated document
            runValidators: true // Ensure schema validation runs
        });
        if (!updatedJob) {
            throw new Error("Job not found or update failed.");
        }
        return updatedJob;
    }
    catch (err) {
        console.error("Error updating job:", err);
        throw new Error(err.message || "Internal server error.");
    }
}
export async function removeJob(ID) {
    try {
        let response = await JobModel.findByIdAndUpdate(ID, { $set: { isDeleted: true } }, { new: true });
        console.log("Response", response);
        if (response) {
            return true;
        }
    }
    catch (err) {
        console.log("Delete Error: ", err);
        throw new Error("Error in Deleting Job");
    }
}
export async function UpdateCont(JobID) {
    try {
        let response = await JobModel.findByIdAndUpdate(JobID, { $inc: { countApplicants: 1 } }, { new: true });
        if (response) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw new Error("Error in Updating Count");
    }
}
