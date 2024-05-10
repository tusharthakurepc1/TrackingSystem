const SystemUser = require("../models/SystemUserModel")

const SignupSystemUser = async (req, res) => {
    let { firstName, lastName, email, password, dob } = req.body.user;
    
    console.log(firstName, lastName, email, password, dob, '>>>>>>>>');
    if(
        [firstName, lastName, email, password, dob].some((el)=>{
            return !el || el === ""
        })
    ){
        res.status(400).json({flag: false, msg: "Fill the details"})
    }

    const user = await SystemUser.findOne({email})
    if(user){
        return res.status(400).json({flag: false, msg: "System User already Exists"})
    }

    const new_user = await SystemUser.create({
        firstName,
        lastName, 
        email,
        password,
        dob
    })

    return res.status(200).json({flag: true, msg: "System User Created Sucessfully", new_user})
}

module.exports = SignupSystemUser
