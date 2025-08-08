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
    enum: ["onsite", "remote", "hybrid"],
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
    enum: ["full-time", "part-time", "internship"],
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
  countApplicants: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("job", JobSchema);
