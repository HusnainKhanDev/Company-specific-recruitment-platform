import { createNewUser } from "../../Controllers/UserController.js";
export const UserResolvers = {
    Mutation: {
        CreateUser: createNewUser,
    },
};
