import cron from 'node-cron';
import ApplicationModel from '../Models/ApplicationModel.js';
import { PassDataToATS } from '../ATS_System/DataManagerATS.js';
cron.schedule('0 0 * * *', async () => {
    console.log("Ya chal raha ha");
    try {
        let result = await ApplicationModel.find({
            $and: [
                { atsFeedback: { $eq: "In Progress" } },
                { atsScore: { $eq: 0 } }
            ]
        }).select("_id jobId resume skills");
        if (result.length > 0)
            PassData(result);
    }
    catch (err) {
        console.log(err);
    }
});
async function PassData(Data) {
    for (let obj of Data) {
        if (obj.jobId && obj.resume && obj.skills && obj._id) {
            await PassDataToATS(obj.jobId, obj.resume, obj.skills, obj._id);
        }
    }
}
