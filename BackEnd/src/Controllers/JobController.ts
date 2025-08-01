import { GraphQLError } from "graphql";
import { createJob, getAllJobs, searchJob } from "../Services/JobServices.js";
import { ConFn, JobArgs, JobSearchArgs } from "../Types_Interfaces.js";
import { normalize } from "path";


export const ListNewJob: ConFn<JobArgs> = async (_: any, args: JobArgs) => {
    const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy } = args.input;

    if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
        throw new GraphQLError("All fields are required.", {
            extensions: {
                code: 'BAD_USER_INPUT',
                statusCode: 400
            }
        });
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
            throw new GraphQLError("Failed to create job." , {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    statusCode: 500
                }
            });
        }
        return NewJob;
    }
    catch (err: any) {
        console.error("Error creating job:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }

}

export const FetchAllJobs: ConFn<null> = async () => {
    try {
        const jobs = await getAllJobs(); 
        return jobs;
    } catch (err: any) {
        console.error("Error fetching jobs:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
}

export const SearchJobByField: ConFn<JobSearchArgs> = async (_: any, args: JobSearchArgs) => {
    const { field, value } = args;

    if (!field || !value) {
        throw new GraphQLError("Field and value are required for search." , {
            extensions: {
                code: 'BAD_USER_INPUT',
                statusCode: 400
            }
        });
    }   

    let CleanedField = field.toString().trim()
    let CleanedValue = value.toString().trim().toLowerCase()

    try{
        const Jobs = await searchJob(CleanedField, CleanedValue);
        return Jobs;
    }

    catch (err: any) {
        console.log("Error searching job:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
}


