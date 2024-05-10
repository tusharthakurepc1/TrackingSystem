const mongoose = require("mongoose")

const WFHApplicationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true
    },
    orgName: {
        type: String,
        required: true
    },
    status: {                   // 1 states for approved, 2 states for rejected, 3 states for pending
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    approvedDate: {
        type: Date,
        required: true,
    }
})

const WFHApplicationModel = mongoose.model("WFHApplication", WFHApplicationSchema)
module.exports = WFHApplicationModel;

