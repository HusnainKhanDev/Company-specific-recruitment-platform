import UserModel from "../Models/UserModel.js";
export async function InsertNewUser(params) {
    const userInput = {
        fullname: params.fullname,
        email: params.email,
        password: params.Bpassword,
        phone: params.phone,
        googleId: params.googleId ? params.googleId : undefined, // Optional field
    };
    console.log("User Input:", userInput);
    if (!userInput.fullname || !userInput.email || !userInput.password) {
        throw new Error("Fullname, email, and password are required to create a user.");
    }
    try {
        let NewUser = await UserModel.create(userInput);
        if (NewUser) {
            return NewUser;
        }
    }
    catch (err) {
        if (err.code === 11000) {
            throw new Error("Duplication arised" + err.message);
        }
        else {
            throw new Error("Error in creating user: " + err.message);
        }
    }
}
export async function FindUserByEmail(email) {
    if (!email) {
        throw new Error("Email is required to find user.");
    }
    try {
        const User = await UserModel.findOne({ email: email });
        if (User) {
            return User;
        }
        else {
            return null; // User not found
            // throw new Error("User not found.");
        }
    }
    catch (err) {
        throw new Error("Error in finding user: " + err.message);
    }
}
export async function UpdateUserGoogleID(email, googleId) {
    if (!email || !googleId) {
        throw new Error("Email and Google ID are required to update user.");
    }
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ email: email }, { $set: { googleId: googleId } }, { new: true });
        if (updatedUser) {
            return updatedUser;
        }
        else {
            throw new Error("User not found or update failed.");
        }
    }
    catch (err) {
        throw new Error("Error in updating user Google ID: " + err.message);
    }
}
