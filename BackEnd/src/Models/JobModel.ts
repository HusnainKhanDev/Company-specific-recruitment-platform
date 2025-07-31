import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  closingDate: {
    type: Date,
    required: true,
  },
  workSetup: {
    type: String,
    enum: ["Onsite", "Remote", "Hybrid"],
    required: true,
    lowercase: true,
  },
  salary: {
    type: String,
    default: "Negotiable",
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String], // list of bullet points
    default: [],
  },
  jobType:{
    type: String,
    enum: ["Full-time", "Part-time", "Internship"],
    required: true,
    lowercase: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // links to the HR who posted it
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("job", JobSchema);
