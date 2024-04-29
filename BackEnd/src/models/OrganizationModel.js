const mongoose = require("mongoose")

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
    },
    max_wfh: {
        type: Number,
        required: true,
    },
    userEmail: {
        type: Array,
        required: true,
    }
})

const Organization = mongoose.model("Organization", OrganizationSchema);
module.exports = Organization;