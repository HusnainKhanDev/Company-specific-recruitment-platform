import { EditExistingJob, FetchAllJobs, ListNewJob, SearchJobByField } from "../../Controllers/JobController.js";
export const JobsResolvers = {
    Query: {
        GetAllJobs: FetchAllJobs,
        SearchJobByField: SearchJobByField
    },
    Mutation: {
        CreateNewJob: ListNewJob,
        EditJob: EditExistingJob
    },
};
