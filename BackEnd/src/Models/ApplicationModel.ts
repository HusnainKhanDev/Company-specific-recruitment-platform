import mongoose from "mongoose";

const PastJobSchema = new mongoose.Schema({
    companyName: { type: String, trim: true },
    position: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date }
}, { _id: false }); 

const ApplicationSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true
    },
    candidateDescription: {
        type: String
    },
    linkedInProfile: { 
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Rejected", "Accepted"],
        default: "Pending"
    },
    resume: {
        type: String, 
        required: true
    },
    skills: {
        type: [String],
        default: [],
        required: true
    },
    pastJob: PastJobSchema
}, { timestamps: true }); 

export default mongoose.model("Application", ApplicationSchema);



