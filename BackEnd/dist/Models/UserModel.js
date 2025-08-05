import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        default: null // Allows multiple nulls in collection
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
        default: null,
    },
    role: {
        type: String,
        enum: ["Candidate", "Employeer"],
        default: "Candidate"
    }
});
export default mongoose.model('user', UserSchema);
