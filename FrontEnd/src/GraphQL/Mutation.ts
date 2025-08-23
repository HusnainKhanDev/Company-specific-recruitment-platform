import { gql } from "@apollo/client";

export const CreateUserMut = gql`
    mutation CreateUser($input: CreateUserInput!) {
    CreateUser(input: $input) {
        fullname
        role
        email
        phone
        _id
    }
}
`

export const SigninUserMut = gql`
    mutation LoginUser($email: String!, $password: String!) {
        LoginUser(email: $email, password: $password) {
            _id
            fullname
            phone
            email
            role
    }
}
`
// Job Mutation-------------------------------------------------

export const CreateJobMut = gql`
    mutation CreateNewJob($input: JobInput!) {
        CreateNewJob(input: $input) {
            _id
            requirements
        }
}
`

export const EditJob = gql`
    mutation EditJob($input: EditJobInput!) {
        EditJob(input: $input) {
            _id,
            title,
            closingDate
            workSetup
            salary
            description
            requirements
            jobType
            createdAt
            countApplicants
        }
    }
`

export const DeleteJob = gql `
    mutation DeleteJob($id: String!) {
        DeleteJob(ID: $id) {
            msg
            statusCode
        }
    }
`

// Application Mutation-----------------------------------------

export const EditStatus = gql`
    mutation Change_Staus($appid: ID!, $status: String!) {
        Change_Staus(Appid: $appid, status: $status) {
            _id
            status
        }
    }
`