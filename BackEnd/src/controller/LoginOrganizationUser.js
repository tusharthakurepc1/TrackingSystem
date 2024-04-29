const OrganizationUser = require("../models/OrganizationUserModel")
const OtpModel = require("../models/OtpModel")
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../constants")

const LoginOrganizationUser = async (req, res) => {
    let { email, password, otp } = req.body;

    if (
        [email, password, otp].some((el) => {
            return el === "" || typeof (el) === "undefined"
        })
    ) {
        return res.status(200).json({ status: "false", msg: "Fill the details" })
    }

    let user = await OrganizationUser.find({ email: email, password: password })
    if (user.length !== 1) {
        return res.status(200).json({ status: "false", msg: "Invalid Login Credentials" })
    }

    let validOtp = await OtpModel.find({email}).sort({_id: -1})

    if(
        [validOtp[0]["email_t"], validOtp[0]["otp_t"], validOtp[0]["time_t"]].some((el)=>{
            !el || el === ""
        })
    ){
        return res.status(200).json({ status: "false", msg: "Can't find Otp" })
    }
    
    const diff = minuteDiff(new Date(Date.now()), new Date(Date.parse(validOtp[0]["time"])));
    if(diff > 15 || validOtp[0]["otp"] != otp){
        return res.status(200).json({ status: "false", msg: "Invalid Otp" })
    }

    console.log();
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '15m' })
    const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60),
        httpOnly: true
    }

    return res.status(200).cookie("token", token, option).json({
        success: true,
        token,
        user
    })
}

function minuteDiff(dt2, dt1) 
{
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}




module.exports = LoginOrganizationUser;