import UserModel from "../Models/UserModel.js";
export async function InsertNewUser(params) {
    const userInput = {
        fullname: params.OnlyName,
        email: params.email,
        password: params.Bpassword,
        phone: params.phone,
        googleId: params.googleId,
        role: params.role
    };
    if (!userInput.fullname || !userInput.email) {
        throw new Error("Fullname and email are required.");
    }
    if (!userInput.googleId && !userInput.password) {
        // This means it's NOT Google signup, but password is missing
        throw new Error("Password is required for local signup.");
    }
    try {
        let NewUser = await UserModel.create(userInput);
        if (NewUser) {
            return NewUser;
        }
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) {
            throw new Error("Duplication arised User already Exist");
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
export async function GetUserByID(ID) {
    try {
        if (!ID) {
            throw new Error("Please Provide ID");
        }
        const User = await UserModel.findById(ID);
        if (!User) {
            throw new Error("User Not found");
        }
        return User;
    }
    catch (err) {
        throw new Error("Error in finding User" + err.message);
    }
}
