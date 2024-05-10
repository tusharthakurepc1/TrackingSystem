const SystemUser = require("../models/SystemUserModel")

const GetSystemUser = async (req, res) =>{
    let {email} = req.user;
    if(!email){
        return res.status(400).json({msg: "Token Expire"})
    }
    
    return res.status(200).json({
        user: req.user
    })
}

module.exports = GetSystemUser;
