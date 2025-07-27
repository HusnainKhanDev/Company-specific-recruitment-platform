import UserModel from "../Models/UserModel.js";
export async function InsertNewUser(params) {
    const userInput = {
        fullname: params.fullname,
        email: params.email,
        password: params.password,
        phone: params.phone,
        googleId: params.googleId ? params.googleId : undefined, // Optional field
    };
    try {
        let NewUser = await UserModel.create(userInput);
        if (NewUser) {
            return NewUser;
        }
    }
    catch (err) {
        throw new Error("Error inserting new user: " + err);
    }
}
