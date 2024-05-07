const OrganizationUser = require("../models/OrganizationUserModel")
const minuteDiff = require('../util/TimeDiffMinute')
const OtpModel = require("../models/OtpModel")
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../constants")

const LoginOrganizationUser = async (req, res) => {
    let { email, password, otp } = req.body;

    if(
        [email, password, otp].some((el)=>{
            return !el || el === ""
        })
    ){
        return res.status(400).json({status: false, msg: "Fill the details"})
    }
    
    console.log(email, password, otp)
    let user = await OrganizationUser.find({ email: email, password: password })
    if (user.length !== 1) {
        return res.status(400).json({ status: "false", msg: "Invalid Login Credentials" })
    }

    // let validOtp = await OtpModel.find({email}).sort({_id: -1})

    // if(
    //     [validOtp[0]["email_t"], validOtp[0]["otp_t"], validOtp[0]["time_t"]].some((el)=>{
    //         !el || el === ""
    //     })
    // ){
    //     return res.status(400).json({ status: "false", msg: "Can't find Otp" })
    // }
    
    // const diff = minuteDiff(new Date(Date.now()), new Date(Date.parse(validOtp[0]["time"])));
    // if(diff > 15 || validOtp[0]["otp"] != otp){
    //     return res.status(400).json({ status: "false", msg: "Invalid Otp" })
    // }

    const accessToken = jwt.sign({ user }, SECRET_KEY, { expiresIn: '3d' })

    return res.status(200).json({
        success: true,
        accessToken,
        user
    })
}

module.exports = LoginOrganizationUser;