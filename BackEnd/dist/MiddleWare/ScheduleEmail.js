import cron from 'node-cron';
import ApplicationModel from '../Models/ApplicationModel.js';
import { SendMailToCandidate } from './SendMail.js';
cron.schedule('0 0 * * *', async () => {
    console.log("email chal rahi haaa");
    try {
        let result = await ApplicationModel.find({
            $and: [{ status: { $eq: 'Accepted' } }, { emailed: { $eq: false } }]
        })
            .select("email jobId candidateId _id") // keep IDs so populate can use them
            .populate([
            { path: "candidateId", select: "fullname" },
            { path: "jobId", select: "title" }
        ]);
        if (result.length > 0) {
            // console.log(result)
            PassData(result);
        }
    }
    catch (err) {
        console.log(err);
    }
});
async function PassData(Data) {
    for (let item of Data) {
        if (item) {
            console.log(item.email, item?.jobId.title, item.candidateId.fullname);
            await SendMailToCandidate(item.email, item.candidateId.fullname, item?.jobId.title);
            await ApplicationModel.findByIdAndUpdate(item._id, { $set: { emailed: true } });
        }
    }
}
