import SendMailDao from "../dao/sendmail.dao";
import nodemailer from 'nodemailer'
import generateOtp from '../util/generateotp.util'

class SendMailServices {
  private sendMailDao = new SendMailDao

  private mailConfiguration = async () => {
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

    return transporter;
  }

  public sendOtp = async (email: string) => {
    const transporter = await this.mailConfiguration()
    const otp = generateOtp();

    const ack = await transporter.sendMail({
      from: 'Mail send to <tusharchandthakurepc205@gmail.com>',
      to: email, 
      subject: `Hello Mr.${email}`,  
      html: `Your OTP is <b>${otp}</b> this is valid for only 15 min`, 
    });

    if(ack){
      await this.sendMailDao.insertOtp(email, otp);
    }
    return ack;
  }

}

export default SendMailServices;