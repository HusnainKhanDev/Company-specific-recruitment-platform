import { GraphQLError } from "graphql";
import { createJob, getAllJobs, removeJob, searchJob, UpdateJob } from "../Services/JobServices.js";
export const ListNewJob = async (_, args, context) => {
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
                code: "UNAUTHENTICATED_USER",
                statusCode: 401,
            },
        });
    }
    if (context.User.Role != "Employeer") {
        console.log(context.User.Role);
        throw new GraphQLError("Only Employers can create jobs.", {
            extensions: {
                code: "FORBIDDEN",
                statusCode: 403,
            },
        });
    }
    const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy } = args.input;
    if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
        throw new GraphQLError("All fields are required.", {
            extensions: {
                code: 'BAD_USER_INPUT',
                statusCode: 400
            }
        });
    }
    let data2 = requirements.split(",");
    let data3 = data2.map((i) => {
        return i.trim();
    });
    const newJob = {
        title,
        closingDate,
        workSetup,
        salary: salary || "Negotiable",
        description,
        requirements: data3,
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
export const SearchJobByField = async (_, args, context) => {
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
                code: "UNAUTHENTICATED_USER",
                statusCode: 401,
            },
        });
    }
    const { field, value } = args;
    // console.log(field, value)
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
        // console.log("Error searching job:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};
export const EditExistingJob = async (_, args, context) => {
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
                code: "UNAUTHENTICATED_USER",
                statusCode: 401,
            },
        });
    }
    if (context.User.Role !== "Employeer") {
        console.log("Employeer");
        throw new GraphQLError("Only Employers can create jobs.", {
            extensions: {
                code: "FORBIDDEN",
                statusCode: 403,
            },
        });
    }
    try {
        const { title, closingDate, workSetup, salary, description, requirements, jobType, createdBy, _id } = args.input;
        if (!title || !closingDate || !workSetup || !description || !jobType || !createdBy || !requirements) {
            throw new GraphQLError("All fields are required.", {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    statusCode: 400
                }
            });
        }
        const updateJob = {
            _id,
            title,
            closingDate,
            workSetup,
            salary: salary || "Negotiable",
            description,
            requirements: requirements ? requirements.split(",") : [],
            jobType,
            createdBy,
        };
        let response = await UpdateJob(updateJob);
        if (response) {
            return response;
        }
    }
    catch (err) {
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};
export const DeleteJob = async (_, args, context) => {
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
                code: "UNAUTHENTICATED_USER",
                statusCode: 401,
            },
        });
    }
    if (context.User.Role != "Employeer") {
        console.log(context.User.Role);
        throw new GraphQLError("Only Employers can create jobs.", {
            extensions: {
                code: "FORBIDDEN",
                statusCode: 403,
            },
        });
    }
    const JobId = args.ID;
    if (!JobId) {
        throw new GraphQLError("Please Provide Job ID: ", {
            extensions: {
                code: "BAD_USER_INPUT",
                statusCode: 422
            }
        });
    }
    try {
        let response = await removeJob(JobId);
        if (response) {
            return { msg: "Deleted", statusCode: 200 };
        }
    }
    catch {
        throw new GraphQLError("Error in Deleting Job: ", {
            extensions: {
                code: "SERVER_ERROR",
                statusCode: 500
            }
        });
    }
};
