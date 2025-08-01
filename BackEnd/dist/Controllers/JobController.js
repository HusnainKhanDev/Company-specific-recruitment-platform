import { GraphQLError } from "graphql";
import { createJob, getAllJobs, searchJob } from "../Services/JobServices.js";
export const ListNewJob = async (_, args) => {
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
            throw new GraphQLError("Failed to create job.", {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    statusCode: 500
                }
            });
        }
        return NewJob;
    }
    catch (err) {
        console.error("Error creating job:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};
export const FetchAllJobs = async () => {
    try {
        const jobs = await getAllJobs();
        return jobs;
    }
    catch (err) {
        console.error("Error fetching jobs:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};
export const SearchJobByField = async (_, args) => {
    const { field, value } = args;
    if (!field || !value) {
        throw new GraphQLError("Field and value are required for search.", {
            extensions: {
                code: 'BAD_USER_INPUT',
                statusCode: 400
            }
        });
    }
    let CleanedField = field.toString().trim();
    let CleanedValue = value.toString().trim().toLowerCase();
    try {
        const Jobs = await searchJob(CleanedField, CleanedValue);
        return Jobs;
    }
    catch (err) {
        console.log("Error searching job:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};
