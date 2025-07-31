import { ListNewJob } from "../../Controllers/JobController.js";

export const JobsResolvers = {
  Query: {
      hello2: () => "Hello, World!", 
  },

    Mutation: {  
      CreateNewJob: ListNewJob,
  },
}
