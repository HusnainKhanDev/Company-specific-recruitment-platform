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
    }
    input JobInput {
        title: String!
        closingDate: String!
        workSetup: String!
        salary: String
        description: String!
        requirements: [String]
        jobType: String!
        createdBy: ID!
    }

    type Query {
        hello2: String
    }

    type Mutation {
        CreateNewJob(input: JobInput!): Job!
    }
`;
