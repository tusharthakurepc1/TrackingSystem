const mongoose = require("mongoose")

const OrganizationUserSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        required: true,
    },
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
    }, 
    doj: {
        type: String,
        required: true,
    },
    orgination_list: {
        type: Array,
        default: [],
        required: true,
    }
})

// module.exports = OrganizationUserSchema

const OrganizationUser = mongoose.model("OrganizationUser", OrganizationUserSchema)
module.exports = OrganizationUser