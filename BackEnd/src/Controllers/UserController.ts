import { GraphQLError } from "graphql"
import bcrypt from "bcrypt"
import { FindUserByEmail, InsertNewUser } from "../Services/UserServices.js"
import { DBUser, UserArgs } from "../Types_Interfaces.js"
import { ConFn } from "../Types_Interfaces.js"
import { SignInUser } from "../Types_Interfaces.js"
import jwt from "jsonwebtoken"


export const createNewUser: ConFn<UserArgs> = async (_: any, args: UserArgs, context: any) => {

    const { fullname, phone, email, password, googleId } = args.input

    if (!fullname || !email || !password) {
        throw new GraphQLError("Please provide all required fields.")
    }

    const Bpassword: string = bcrypt.hashSync(password, 10)
    try {

        const newUser = await InsertNewUser({ fullname, phone, email, Bpassword, googleId })

        const Secret = String(process.env.JWT_SECRET)
        let token: string = jwt.sign({ ID: newUser?._id, role: newUser?.role }, Secret, { expiresIn: '1d' })
        if (newUser) {
            context.res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            })
            console.log(token)
            return newUser
        } else {
            throw new GraphQLError("User creation failed.")
        }

    } catch (err: any) {
        console.log("Error in Signing Up User", err.message)
        throw new GraphQLError("Error in Signing Up User: " + err.message)
    }
}

export const SingInUser: ConFn<SignInUser> = async (_:any, args: SignInUser, context: any) => {
    const {email, password} = args

    if(!email || !password) {
        throw new GraphQLError("Please provide email and password.")
    }

    try{
        const User: DBUser = await FindUserByEmail(email)
        if(User) {
            const isPasswordValid = await bcrypt.compare(password, User.password)
            if(isPasswordValid) {

                const Secret = String(process.env.JWT_SECRET)

                let token: string = jwt.sign({ ID: User._id, role: User.role }, Secret, { expiresIn: '1d' })

                context.res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax"
                })

                return User
            } else {
                throw new GraphQLError("Invalid password.")
            }
        }
    }
    catch(err: any) {
        console.log("Error in SingInUser", err.message)
        throw new GraphQLError("Error in signing in user: " + err.message)
    }



    
}