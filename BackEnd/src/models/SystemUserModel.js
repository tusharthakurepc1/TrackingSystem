const mongoose = require("mongoose")

const SystemUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    }
})

const SystemUserModel = mongoose.model("SystemUser", SystemUserSchema)
module.exports = SystemUserModel
