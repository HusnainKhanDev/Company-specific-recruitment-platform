import ApplicationModel from "../Models/ApplicationModel.js";
import { UpdateCont } from "./JobServices.js";
export async function createApplication(Params) {
    try {
        let result = await ApplicationModel.create(Params);
        if (result) {
            let CountRes = await UpdateCont(Params.jobId);
            if (!CountRes) {
                console.log("Error while Updating Count");
            }
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
export async function EditStatus(ID, Status) {
    try {
        let Response = await ApplicationModel.findByIdAndUpdate(ID, { $set: { status: Status } }, { new: true });
        if (!Response) {
            throw new Error("Status is Not Changed");
        }
        return Response;
    }
    catch (err) {
        throw new Error("Something Went Wrong While Changing Status: " + err.meesage);
    }
}
