import { GraphQLError } from "graphql";
import { createJob, getAllJobs, searchJob, UpdateJob } from "../Services/JobServices.js";
import { ConFn, JobArgs, JobSearchArgs } from "../Types_Interfaces.js";



export const ListNewJob: ConFn<JobArgs> = async (_: any, args: JobArgs, context: any) => {
    
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
            code: "UNAUTHENTICATED_USER",
            statusCode: 401,
            },
        });
    }

    if (context.User.Role !== "Employeer") {
        console.log("Employeer")
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

    const newJob = {
        title,
        closingDate,
        workSetup,
        salary: salary || "Negotiable",
        description,
        requirements: requirements.split(","),
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
        console.log("Request has been Done By react App")
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

export const SearchJobByField: ConFn<JobSearchArgs> = async (_: any, args: JobSearchArgs, context: any) => {

     if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
            code: "UNAUTHENTICATED_USER",
            statusCode: 401,
            },
        });
    }

    const { field, value } = args;
    console.log(field, value)
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
        // console.log("Error searching job:", err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
}

export const EditExistingJob: ConFn<JobArgs & { input: JobArgs["input"] & { _id: string } }> = async (_: any, args:any, context: any) => {
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
            code: "UNAUTHENTICATED_USER",
            statusCode: 401,
            },
        });
    }

    if (context.User.Role !== "Employeer") {
        console.log("Employeer")
        throw new GraphQLError("Only Employers can create jobs.", {
            extensions: {
            code: "FORBIDDEN",
            statusCode: 403,
            },
        });
    }

    try{
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
            requirements: requirements? requirements.split(",") : [],
            jobType,
            createdBy,
        };


        let response = await UpdateJob(updateJob)
        if(response){
            return response
        }
    }
    catch(err: any){
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'SERVER_ERROR',
                statusCode: 500
            }
        });
    }
}
