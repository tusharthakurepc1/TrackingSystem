const nodemailer = require("nodemailer")
const generateOtp = require("./GenerateOTP")
const OtpModel = require("../models/OtpModel")

const SendMail = async (req, res) => {
    let { email } = req.body;
    let otp = generateOtp()

    if(
        [ email, otp ].some((el)=>{
            !el || el === ""
        })
    ){
        return res.status(200).json({
            status: false,
            msg: "Fill the Details"
        })
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'tusharchandthakurepc205@gmail.com',
            pass: 'vjvz ybun hocf gzxx'                     //need to change....
        }
    });

    const ack = await transporter.sendMail({
        from: 'Mail send to <tusharchandthakurepc205@gmail.com>',
        to: email, 
        subject: `Hello Mr.${email}`,  
        html: `Your OTP is <b>${otp}</b> this is valid for only 15 min`, 
    });

    if(ack){
        const otp_data = await OtpModel.create({
            email: email,
            otp: otp,
            time: new Date(Date.now())
        })
        otp_data.save()
    }

    return res.status(200).json(ack);
}

module.exports = SendMail;