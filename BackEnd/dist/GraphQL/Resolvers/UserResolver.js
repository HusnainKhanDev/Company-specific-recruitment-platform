import { createNewUser, SingInUser } from "../../Controllers/UserController.js";
export const UserResolvers = {
    Mutation: {
        CreateUser: createNewUser,
        LoginUser: SingInUser,
    },
};
