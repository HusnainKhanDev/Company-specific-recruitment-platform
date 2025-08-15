import ApplicationModel from "../Models/ApplicationModel.js";
export async function createApplication(Params) {
    try {
        let result = await ApplicationModel.create(Params);
        if (result) {
            return result;
        }
        else {
            throw new Error("Application is Not Submitted");
        }
    }
    catch (err) {
        console.log(err);
        throw new Error("Something Went Wrong while Submiting Application");
    }
}
export async function FetchAllApplications() {
    try {
        let result = await ApplicationModel.find();
        if (result) {
            return result;
        }
        else {
            throw new Error("No Application is Found");
        }
    }
    catch (err) {
        console.log(err);
        throw new Error("Something Went Wrong while Fetching Application");
    }
}
export async function FindAppByUserID(ID) {
    console.log(ID);
    try {
        let result = await ApplicationModel.find({ candidateId: ID });
        if (result) {
            return result;
        }
        else {
            throw new Error("No User Application is Found");
        }
    }
    catch (err) {
        console.log(err);
        throw new Error("Something Went Wrong while Fetching User Application");
    }
}
