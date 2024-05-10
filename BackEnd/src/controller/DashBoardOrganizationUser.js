const WFHApplicationModel = require("../models/WFHApplicationModel")

const DashBoardOrganizationUser = async (req, res) =>{
    let {email} = req.user;

    const allApplications = await WFHApplicationModel.find({email})

    return res.status(200).json({
        user: req.user,
        allApplications
    })
}

module.exports = DashBoardOrganizationUser;
