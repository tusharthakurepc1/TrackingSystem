const mongoose = require("mongoose")


const WFHApplicationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
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
    }
})

const WFHApplicationModel = mongoose.model("WFHApplication", WFHApplicationSchema)
module.exports = WFHApplicationModel;

