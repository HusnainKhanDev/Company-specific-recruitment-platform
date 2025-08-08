import { createNewUser, GetSpecificUser, SingInUser } from "../../Controllers/UserController.js";
export const UserResolvers = {
    Query: {
        GetUser: GetSpecificUser
    },
    Mutation: {
        CreateUser: createNewUser,
        LoginUser: SingInUser,
    },
};
