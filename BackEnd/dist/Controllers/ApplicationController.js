import { createApplication, EditStatus, FetchAllApplications, FindAppByUserID } from "../Services/ApplicationServices.js";
import { CheckAuthentication } from "../MiddleWare/isAuthenticated.js";
import { GraphQLError } from "graphql";
export const submitApplication = async (req, res) => {
    const { User } = CheckAuthentication(req, res);
    if (!User?.ID || User?.Role != "Candidate") {
        return res.status(400).json({ msg: "UnAuthenticated User" });
    }
    const { fullname, email, phone, jobId, candidateId, candidateDescription, linkedInProfile, skills, companyName, position, startDate, endDate } = req.body;
    const resume = req.file?.filename;
    console.log(resume);
    if (!fullname || !email || !phone || !jobId || !candidateId || !resume || !skills) {
        console.log(fullname, email, phone, jobId, candidateId, resume, skills);
        return res.status(400).json({
            error: "Fullname, email, phone, jobId, resume, and skills are required."
        });
    }
    let data2 = skills.split(",");
    let data3 = data2.map((i) => {
        return i.trim();
    });
    const newApplication = {
        fullname,
        email,
        phone,
        jobId,
        candidateId,
        candidateDescription: candidateDescription || "",
        linkedInProfile: linkedInProfile || "",
        resume: resume,
        skills: data3,
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
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || "Internal server error." });
    }
};
export const GetAllApplications = async (_, args, context) => {
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
                code: "UNAUTHENTICATED_USER",
                statusCode: 401,
            },
        });
    }
    if (context.User.Role !== "Employeer") {
        console.log("Employeer");
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
    catch (err) {
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};
export const FindApplicationsByUser = async (_, args, context) => {
    try {
        let UserID = context.User.ID;
        const Applications = await FindAppByUserID(UserID);
        return Applications;
    }
    catch (err) {
        console.log(err);
        throw new GraphQLError(err.message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }
        });
    }
};
export const ChangeStaus = async (_, args, context) => {
    if (!context.User) {
        throw new GraphQLError("Please login to continue.", {
            extensions: {
                code: "UNAUTHENTICATED_USER",
                statusCode: 401,
            },
        });
    }
    if (context.User.Role !== "Employeer") {
        throw new GraphQLError("Only Employers can create jobs.", {
            extensions: {
                code: "FORBIDDEN",
                statusCode: 403,
            },
        });
    }
    try {
        const { Appid, status } = args;
        if (!Appid || !status) {
            throw new GraphQLError("Applications ID And Status is Required", {
                extensions: {
                    code: "BAD_REQUEST",
                    statusCode: 400,
                },
            });
        }
        let Res = await EditStatus(Appid, status);
        if (Res) {
            return Res;
        }
    }
    catch (err) {
        throw new GraphQLError(err.message, {
            extensions: {
                code: "SERVER_ERROR",
                statusCode: 500
            }
        });
    }
};
