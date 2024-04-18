import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    name: {
        type: String,
    },
    upiID: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    contactNumber: {
        type: String,
        required: [true, "Please provide a contact number"],
    },
    role: {
        type: String,
        required: true,
        enum: ["farmer", "manager"],
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;