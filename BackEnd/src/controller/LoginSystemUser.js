const SystemUser = require("../models/SystemUserModel")
const OtpModel = require("../models/OtpModel")
const jwt = require("jsonwebtoken")
const minuteDiff = require('../util/TimeDiffMinute')
const SECRET_KEY = require('../constants')

const LoginSystemUser = async (req, res) => {
    let {email, password, otp} = req.body;

    if(
        [email, password, otp].some((el)=>{
            !el || el === ""
        })
    ){
        return res.status(400).json({status: false, msg: "Fill the details"})
    }

    let user = await SystemUser.find({email})
    if(user.length != 1){
        return res.status(400).json({status: false, msg: "User not Found"})
    }

    let validOtp = await OtpModel.find({email}).sort({_id: -1})

    if(
        [validOtp[0]["email_t"], validOtp[0]["otp_t"], validOtp[0]["time_t"]].some((el)=>{
            !el || el === ""
        })
    ){
        return res.status(400).json({ status: "false", msg: "Can't find Otp" })
    }

    const diff = minuteDiff(new Date(Date.now()), new Date(Date.parse(validOtp[0]["time"])));
    if(diff > 15 || validOtp[0]["otp"] != otp){
        return res.status(400).json({ status: "false", msg: "Invalid Otp" })
    }


    const token = jwt.sign({user}, SECRET_KEY, { expiresIn: '15m' })
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60),
        httpOnly: true
    }

    return res.status(200).cookie("token", token, options).json({
        sucess: true,
        token,
        user
    })

}



module.exports = LoginSystemUser;

