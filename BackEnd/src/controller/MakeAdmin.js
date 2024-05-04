const OrganizationModel = require("../models/OrganizationModel")

const MakeAdmin = async (req, res) => {
    let {email, orgName} = req.body;

    console.log(email, orgName);
    if(
        [email, orgName].some((el)=>{
            return !el || el === ""
        })
    ){
        return res.status(400).json({status: false, msg: "Fill the field"})
    }

    const result = await OrganizationModel.findOne({name: orgName})
    if(!result){
        return res.status(400).json({status: false, msg: "Organization not found"})
    }

    const updatedResult = await OrganizationModel.updateOne(
        {name: orgName},
        {
            $set: {
                admin: email
            }
        }
    )
    console.log(updatedResult);

    return res.status(200).json({status: true, msg: `${email} now admin of ${orgName}`, ack: updatedResult})
}

module.exports = MakeAdmin;