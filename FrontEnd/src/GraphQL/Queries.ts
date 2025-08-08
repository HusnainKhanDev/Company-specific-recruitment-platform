import { gql } from "@apollo/client"


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
