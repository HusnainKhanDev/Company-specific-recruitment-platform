import ApplicationModel from "../Models/ApplicationModel.js";
export async function SetDataInDocument(ID, Des, Score) {
    try {
        if (ID && Des && Score) {
            let response = await ApplicationModel.findByIdAndUpdate(ID, { $set: { atsScore: Score, atsFeedback: Des } }, { new: true });
            if (response) {
                return response;
            }
            else {
                console.log("Something went wrong in Setting data In application");
            }
        }
    }
    catch (err) {
        console.log("SetDataInDocument Ma Masla Aya ha: ", err.message);
    }
}
