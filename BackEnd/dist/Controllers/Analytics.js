import { CheckAuthentication } from "../MiddleWare/isAuthenticated.js";
import ApplicationModel from "../Models/ApplicationModel.js";
import JobModel from "../Models/JobModel.js";
export async function ShowAnalytics(request, response) {
    const { User } = CheckAuthentication(request, response);
    if (!User?.ID || User?.Role != "Employeer") {
        return response.status(400).json({ msg: "UnAuthenticated User" });
    }
    console.log("chal gaya");
    try {
        let CountStatus = await ApplicationModel.aggregate([
            { $group: { _id: "$status", totalCount: { $sum: 1 } } }
        ]);
        let AvgScorePerJob = await ApplicationModel.aggregate([
            { $match: { status: { $ne: "Rejected" } } },
            //“Take documents, group them by some field (the _id we give inside), and then perform calculations on each group.”
            {
                $group: {
                    _id: "$jobId",
                    AvgScorePerJob: { $avg: "$atsScore" },
                    min: { $min: "$atsScore" },
                    max: { $max: "$atsScore" }
                }
            },
            // lookup looks in a job model for jobId provided by group --> _id and return the respective job document  
            {
                $lookup: {
                    from: "jobs", // name of Job collection
                    localField: "_id", // jobId from Application
                    foreignField: "_id", // _id in Job collection
                    as: "jobDetails"
                }
            },
            { $unwind: "$jobDetails" }, // convert array → object
            {
                $project: {
                    _id: 0, // hide ObjectId
                    jobTitle: "$jobDetails.title",
                    AvgScorePerJob: 1,
                    min: 1,
                    max: 1
                }
            }
        ]);
        let ApplicationcountPerJob = await JobModel.aggregate([
            { $match: { isDeleted: { $eq: false } } },
            { $project: { title: 1, countApplicants: 1 } }
        ]);
        let appsPerDay = await ApplicationModel.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ]);
        let AnalyticsData = {
            appsPerDay,
            CountStatus,
            AvgScorePerJob,
            ApplicationcountPerJob,
        };
        if (appsPerDay && CountStatus && AvgScorePerJob && ApplicationcountPerJob) {
            response.status(200).json({ AnalyticsData });
        }
        console.log(AnalyticsData);
    }
    catch (err) {
        console.log(err);
        throw new Error("Error In Calculating Analytics");
    }
}
