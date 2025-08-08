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