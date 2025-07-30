export const JobsTypeDefs = /* GraphQL */ `

    type Job {
        title: String!
        closingDate: Date!
        workSetup: String!
        salary: String
        description: String!
        requirements: [String]
        jobType: String!
        createdBy: User!
        createdAt: Date!
    }

    type Query {

    }

    type Mutation {
    
    }
`