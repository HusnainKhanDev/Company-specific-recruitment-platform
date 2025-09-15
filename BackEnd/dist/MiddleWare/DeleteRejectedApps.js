import cron from 'node-cron';
import ApplicationModel from '../Models/ApplicationModel.js';
// Runs every day at 1 AM
cron.schedule('0 0 * * *', async () => {
    console.log("Cron job started: Cleaning rejected applications...");
    try {
        const result = await ApplicationModel.deleteMany({ status: "Rejected" });
        console.log(`Deleted ${result.deletedCount} rejected applications.`);
    }
    catch (err) {
        console.error("Cron job error:", err);
    }
});
