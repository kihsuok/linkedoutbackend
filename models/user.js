const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    appliedJobs: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);