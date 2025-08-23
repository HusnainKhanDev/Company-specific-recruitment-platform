export const ApplicationsTypeDefs = /* GraphQL */  `
    
    type PastJob {
        companyName: String
        position: String
        startDate: String
        endDate: String
    }
    
    type  Application {
        _id: ID!
        fullname: String!
        email: String!
        phone: String!
        jobId: Job!
        candidateId: User!
        candidateDescription: String!
        linkedInProfile: String
        resume: String
        status: String
        atsFeedback: String,
        atsScore: Int
        skills: [String]
        pastJob: PastJob!
        createdAt: String
    }

    type Query {
        GetApplications: [Application]!
        GetUserSpecificApplication: [Application]
    }

    type Mutation {
        Change_Staus(Appid: ID!, status: String!): Application
    }
   
`

