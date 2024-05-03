const OrganizationUserModel = require("../models/OrganizationUserModel")

const DashBoardSystemUser = async (req, res) =>{
    let { user } = req.user;

    const user_data = await OrganizationUserModel.find({})

    return res.status(200).json({
        user: req.user,
        user_data
    })
}

module.exports = DashBoardSystemUser;
