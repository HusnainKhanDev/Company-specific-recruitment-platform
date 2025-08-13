import { FindApplicationsByUser, GetAllApplications } from "../../Controllers/ApplicationController.js";
import { GetJobById } from "../../Services/JobServices.js";
import { GetUserByID } from "../../Services/UserServices.js";

export const ApplicationResolvers = {
  Query: {
    GetApplications: GetAllApplications,
    GetUserSpecificApplication: FindApplicationsByUser
  },

  // it is called Nested Resolver 
  //If we store any field in MongoDB as ObjectIds, GraphQL will not automatically populate them — you must define nested field resolvers.
  Application: {
    jobId: async (parent: any) => {
      return GetJobById(parent.jobId);
    },

    candidateId: async (parent: any) => {
      return await GetUserByID(parent.candidateId);
    }
  }

}