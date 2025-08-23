import { ChangeStaus, FindApplicationsByUser, GetAllApplications } from "../../Controllers/ApplicationController.js";
import { GetJobById } from "../../Services/JobServices.js";
import { GetUserByID } from "../../Services/UserServices.js";
export const ApplicationResolvers = {
    Query: {
        GetApplications: GetAllApplications,
        GetUserSpecificApplication: FindApplicationsByUser
    },
    Mutation: {
        Change_Staus: ChangeStaus
    },
    // it is called Nested Resolver 
    //If we store any field in MongoDB as ObjectIds, GraphQL will not automatically populate them — you must define nested field resolvers.
    Application: {
        jobId: async (parent) => {
            return GetJobById(parent.jobId);
        },
        candidateId: async (parent) => {
            return await GetUserByID(parent.candidateId);
        }
    }
};
