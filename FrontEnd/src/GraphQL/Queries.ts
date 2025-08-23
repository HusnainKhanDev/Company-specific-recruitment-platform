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
export const GetUserSpecificApplication = gql`
  query GetUserSpecificApplication {
  GetUserSpecificApplication {
    candidateDescription
    email
    fullname
    jobId {
      title
    }
    linkedInProfile
    pastJob {
      companyName
      endDate
      position
      startDate
    }
    status
    phone
    resume
    skills
  }
}
`

export const SearchField = gql`
    query SearchJobByField($field: String!, $value: String!) {
      SearchJobByField(field: $field, value: $value) {
        workSetup
        title
        salary
        requirements
        jobType
        description
        createdAt
        countApplicants
        closingDate
        _id
      }
    }
`

export const GetAllApplications = gql `
  query GetApplications {
  GetApplications {
    _id
    candidateId {
      _id
    }
    fullname
    email
    phone
    resume
    status
    atsFeedback
    atsScore
    linkedInProfile
    jobId {
      title
    }
    skills
    pastJob {
      startDate
      position
      endDate
      companyName
    }
    createdAt
    candidateDescription
  }
}
`