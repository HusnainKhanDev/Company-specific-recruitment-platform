export const ApplicationsTypeDefs = /* GraphQL */ `
    
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
        skills: [String]
        pastJob: PastJob!
    }

    type Query {
        GetApplications: [Application]!
        GetUserSpecificApplication: [Application]
    }

   
`;
