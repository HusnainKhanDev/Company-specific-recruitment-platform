import {GraphQLError} from "graphql"
import bcrypt from "bcrypt"
import { InsertNewUser } from "../Services/UserServices.js"
import { UserArgs } from "../Types_Interfaces.js"
import { ConFn } from "../Types_Interfaces.js"

export const createNewUser:ConFn<UserArgs> = async (_: any, args: UserArgs) => {

    const { fullname, phone, email, password, googleId } = args.input
    
    if (!fullname || !email || !password) {
        throw new GraphQLError("Please provide all required fields.")
    }

    const Bpassword:string = bcrypt.hashSync(password, 10)
    try {

        const newUser = await InsertNewUser({ fullname, phone, email, Bpassword, googleId })
        if (newUser) {
            return newUser
        } else {
            throw new GraphQLError("User creation failed.")
        }

    } catch (err: any) {
        console.log("Error in Creating User", err.message)
        throw new GraphQLError("Error in creating user: " + err.message)
    }
}