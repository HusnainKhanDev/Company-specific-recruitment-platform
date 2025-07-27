import UserModel from "../Models/UserModel.js";
import { ParamsIF } from "../Types_Interfaces.js";


export async function InsertNewUser(params: ParamsIF) {
    const userInput = {
        fullname: params.fullname,
        email: params.email,
        Bpassword: params.Bpassword,
        phone: params.phone,
        googleId: params.googleId ? params.googleId : undefined, // Optional field
    }
    try{
        let NewUser = await UserModel.create(userInput)
        if(NewUser){
            return NewUser
        }
    }
    catch(err: any){
        if(err.code === 11000) {
            throw new Error("Duplication arised" + err.message);
        }
        else{
            throw new Error("Error in creating user: " + err.message);
        }
    }
}