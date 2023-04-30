const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    jobApplicants: {
        type: Array,
        required: true,
    },
    archived: {
        type: Boolean,
        required : true
    },
    contact:{
        type: Number,
        required: true
    }

});

module.exports = mongoose.model("Job", jobSchema);