const SystemUser = require("../models/SystemUserModel")

const SignupSystemUser = async (req, res) => {
    let { firstName, lastName, email, password, dob } = req.body
    
    if(
        [firstName, lastName, email, password, dob].some((el)=>{
            !el || el===""
        })
    ){
        res.status(400).json({flag: false, msg: "Fill the details"})
    }

    const user = await SystemUser.find({email})
    if(!user){
        res.status(400).json({flag: false, msg: "System User already Exists"})
    }

    const new_user = await SystemUser.create({
        firstName,
        lastName, 
        email,
        password,
        dob
    })

    return res.status(200).json({flag: true, msg: "System User Created Sucessfully"})
}

module.exports = SignupSystemUser
