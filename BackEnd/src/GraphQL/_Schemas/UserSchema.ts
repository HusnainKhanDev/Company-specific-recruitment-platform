export const UsertypeDefs = /* GraphQL */ `
  type User {
    _id: ID!,
    fullname: String!,
    phone: String,
    email: String!,
    password: String!,
    googleId: String
    role: String
  }

  input CreateUserInput {
    fullname: String!,
    phone: String,
    email: String!,
    password: String!,
    googleId: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    CreateUser(input: CreateUserInput): User
  }
`
