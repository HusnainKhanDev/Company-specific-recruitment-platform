import { GraphQLError } from "graphql"
import bcrypt from "bcrypt"
import { FindUserByEmail, InsertNewUser, UpdateUserGoogleID } from "../Services/UserServices.js"
import { DBUser, UserArgs } from "../Types_Interfaces.js"
import { ConFn } from "../Types_Interfaces.js"
import { SignInUser } from "../Types_Interfaces.js"
import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import axios from "axios"


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
        throw new GraphQLError(err.message)
    }
}

export const SingInUser: ConFn<SignInUser> = async (_: any, args: SignInUser, context: any) => {
    const { email, password } = args

    if (!email || !password) {
        throw new GraphQLError("Please provide email and password.")
    }

    try {
        const User: DBUser | null = await FindUserByEmail(email)
        if (User) {
            const isPasswordValid = await bcrypt.compare(password, String(User.password))
            if (isPasswordValid) {

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
        else{
            throw new GraphQLError("User Does Not Exist.")
        }
    }
    catch (err: any) {
        console.log("Error in SingInUser", err.message)
        throw new GraphQLError(err.message)
    }




}


// Goal of this Code:To redirect the user to Google’s OAuth2.0 login page with the required info
//This entire route builds the full Google login link dynamically and redirects the user there / to login page
// Once user logs in, Google will redirect them back to your /auth/google/callback with a code.
export async function RedirectGoogleLoginPage(req: any, res: any) {

    //  This is Google’s login endpoint (official from Google) that starts the OAuth2.0 flow.
    const BaseURI = "https://accounts.google.com/o/oauth2/v2/auth";
    const options: any = {
        client_id: process.env.GOOGLE_CLIENT_ID, //Your app’s ID registered with Google
        redirect_uri: process.env.GOOGLE_REDIRECT_URI, //Where Google should redirect after login
        response_type: "code",//We’re asking for an authorization code
        scope: "openid email profile", //What info we want from the user: email, profile
        access_type: "offline", //get refresh token, not just the access token
        prompt: "consent"//always show the "Allow access?" screen, even if the user already gave permission before.
    };
    //It turns the options object into a query string like this:
    // client_id=xyz&redirect_uri=abc&scope=email+profile&...
    const queryParams = new URLSearchParams(options).toString();

    // This builds the final Google login link like:
    const fullURL = `${BaseURI}?${queryParams}`;
    res.redirect(fullURL);
    //it knows from where request came, so it generate the full url and redirect it to Google login page.
}


export async function HandleGoogleCallback(req: Request, res: Response) {

    // Extracts that code from the URL — it's needed to request an access token.
    // http://localhost:4000/auth/google/callback?code=abc123xyz
    const code = req.query.code as string;
    if (!code) {
        return res.status(400).send("No code provided");
    }

    // You’re sending a POST request to Google’s token endpoint to say:
    // “Hey Google, here’s the code the user gave me. Can I get the real tokens now?”
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
    });


    // access_token: You can use this to get user info from Google
    // id_token: A JWT-style token with user identity (optional)
    const { access_token, id_token } = tokenRes.data;
    if (!access_token || !id_token) {
        return console.log("Failed to get access token");
    }

    //You now make a GET request to Google's User Info API, attaching the access token in the headers.
    const userRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    // sub: Unique Google ID for that user
    // always save sub as googleId in your database.
    const { email, name, picture, sub } = userRes.data;
    console.log("User Info:", userRes.data);
    if (!email || !name || !sub) {
        return console.log("Failed to get user info");
    }
    
    try {
        const isUserInDB = await FindUserByEmail(email);
        if (!isUserInDB) {
            let NewUser = {
                fullname: name,
                email: email,
                googleId: sub,
            }

            const createdUser = await InsertNewUser(NewUser);
            if (createdUser) {
                const Secret = String(process.env.JWT_SECRET);
                let token: string = jwt.sign({ ID: createdUser._id, role: createdUser.role }, Secret, { expiresIn: '1d' });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax"
                });
                return res.redirect( String(process.env.FRONTEND_URL) )
            }
            else{
                return console.log("Error creating user");
            }
        }
        else{
            const Secret = String(process.env.JWT_SECRET);
            const UpdatedUser = await UpdateUserGoogleID(email, sub);
            if (!UpdatedUser) {
                return console.log("Error updating user Google ID");
            }
            else{
                let token: string = jwt.sign({ ID: isUserInDB._id, role: isUserInDB.role }, Secret, { expiresIn: '1d' });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax"
                });
                return res.redirect( String(process.env.FRONTEND_URL) );
            }
            
        }
    }
    catch(err: any) {
        console.log("Error in HandleGoogleCallback", err.message);
    }

}