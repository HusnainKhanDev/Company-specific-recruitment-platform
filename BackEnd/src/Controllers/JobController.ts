import { GraphQLError } from "graphql";
import { createJob } from "../Services/JobServices.js";
import { ConFn, JobArgs } from "../Types_Interfaces.js";





export const ListNewJob: ConFn<JobArgs> = async (_: any, args: JobArgs, context: any) => {
    const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy } = args.input;

    if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
        throw new GraphQLError("All fields are required.");
    }

    const newJob = {
        title,
        closingDate,
        workSetup,
        salary: salary || "Negotiable",
        description,
        requirements: requirements,
        jobType,
        createdBy,
    };

    try {
        let NewJob = await createJob(newJob);
        if (!NewJob) {
            throw new GraphQLError("Failed to create job.");
        }
        return NewJob;
    }
    catch (err: any) {
        console.error("Error creating job:", err);
        throw new GraphQLError(err.message);
    }

}