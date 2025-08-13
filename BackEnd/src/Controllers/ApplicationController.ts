import { Request, Response } from "express";
import { createApplication, FetchAllApplications, FindAppByUserID } from "../Services/ApplicationServices.js";
import { CheckAuthentication } from "../MiddleWare/isAuthenticated.js";
import { ConFn } from "../Types_Interfaces.js";
import { GraphQLError } from "graphql";

export const submitApplication = async (req: Request, res: Response) => {
    
    const {User} = CheckAuthentication(req, res)
    if(!User?.ID) {
        return res.status(400).json({msg: "UnAuthenticated User"})
    }
    
    const {
        fullname,
        email,
        phone,
        jobId,
        candidateId,
        candidateDescription,
        linkedInProfile,
        skills,
        companyName,
        position,
        startDate,
        endDate
    } = req.body;

    const resume = req.file?.filename
    console.log(resume)


    if (!fullname || !email || !phone || !jobId || !candidateId || !resume ) {
        console.log(fullname, email, phone, jobId, candidateId, resume, skills)
        return res.status(400).json({
            error: "Fullname, email, phone, jobId, candidateId, resume, and skills are required."
        });
    }

    const newApplication = {
        fullname,
        email,
        phone,
        jobId,
        candidateId,
        candidateDescription: candidateDescription || "" ,
        linkedInProfile: linkedInProfile || "",
        resume: resume || "",
        skills: skills || [],
        pastJob: {
            companyName: companyName || "",
            position: position || "",
            startDate: startDate || "",
            endDate: endDate || ""
        }
    };

    try {
        const application = await createApplication(newApplication);
        if (!application) {
            return res.status(500).json({ error: "Failed to submit application." });
        }
        return res.status(201).json({
            message: "Application submitted successfully.",
            application
        });
    }
    catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message || "Internal server error." });
    }
};

export const GetAllApplications: ConFn<null> = async (_: any, args: any, context: any) => {
        
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
            code: "UNAUTHENTICATED_USER",
            statusCode: 401,
            },
        });
    }

    if (context.User.Role !== "Employeer") {
        console.log("Employeer")
        throw new GraphQLError("Only Employers can create jobs.", {
            extensions: {
            code: "FORBIDDEN",
            statusCode: 403,
            },
        });
    }
    
    try {
        const Applications = await FetchAllApplications();
        return Applications;
    }
    catch (err: any) {
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};

export const FindApplicationsByUser: ConFn<null> = async (_: any, args: any, context: any) => {
    try {
        let UserID = context.User.ID

        const Applications = await FindAppByUserID(UserID);
        console.log("Applications: ", Applications)
        return Applications;
    }
    catch (err: any) {
        console.log(err)
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
}