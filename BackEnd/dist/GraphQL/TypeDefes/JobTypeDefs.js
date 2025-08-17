export const JobsTypeDefs = /* GraphQL */ `

    type Job {
        _id: ID!
        title: String!
        closingDate: String!
        workSetup: String!
        salary: String
        description: String!
        requirements: [String]
        jobType: String!
        createdBy: User!
        createdAt: String!
        countApplicants: Int
    }
    input JobInput {
        title: String!
        closingDate: String!
        workSetup: String!
        salary: String
        description: String!
        requirements: String
        jobType: String!
        createdBy: ID!
    }

    input EditJobInput {
        _id: ID!
        title: String!
        closingDate: String!
        workSetup: String!
        salary: String
        description: String!
        requirements: String
        jobType: String!
        createdBy: ID!
    }

    type Query {
        GetAllJobs: [Job]!
        SearchJobByField(field: String!, value: String!): [Job]!
    }

    type Mutation {
        CreateNewJob(input: JobInput!): Job!
        EditJob(input: EditJobInput!): Job!
    }
`;
