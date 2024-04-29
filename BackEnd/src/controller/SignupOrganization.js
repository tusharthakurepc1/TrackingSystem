const Organization = require("../models/OrganizationModel")

const SignupOrganization = async (req, res) =>{
    let name = req.body.name
    let max_wfh = req.body.max_wfh

    if(name === "" || !name || !max_wfh){
        return res.status(200).json({status: "false", msg: "Fill the details"})
    }

    let user = Organization.findOne({name: name})
    if(!user){
        return res.status(200).json({status: "false", msg: "Organization already exists"})
    }

    const new_orgi = await Organization.create({
        name: name,
        max_wfh: max_wfh,
        userEmail: []
    })
    new_orgi.save();

    res.status(200).json({status: "true", msg: "Organization created sucessfully"})

}

module.exports = SignupOrganization;