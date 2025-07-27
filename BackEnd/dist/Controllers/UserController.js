import { GraphQLError } from "graphql";
import { InsertNewUser } from "../Services/UserServices.js";
export const createNewUser = async (_, args) => {
    const { fullname, phone, email, password, googleId } = args.input;
    if (!fullname || !email || !password) {
        throw new GraphQLError("Please provide all required fields.");
    }
    try {
        const newUser = await InsertNewUser({ fullname, phone, email, password, googleId });
        if (newUser) {
            return newUser;
        }
        else {
            return "User Not Created";
        }
    }
    catch (err) {
        console.log("Error in Creating User", err.message);
        return "Error in Creating User";
    }
};
