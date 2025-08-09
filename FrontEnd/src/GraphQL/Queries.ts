import { gql } from "@apollo/client"

// User Queries--------------------------------------------------

export const getUser = gql `
        query GetUser {
    GetUser {
        email
        fullname
        phone
        role
        _id
    }
}
`

// Job Queries--------------------------------------------------

export const GetJobs = gql`
    query GetAllJobs {
  GetAllJobs {
    _id
    closingDate
    countApplicants
    createdAt
    description
    jobType
    requirements
    salary
    title
    workSetup
  }
}
`
