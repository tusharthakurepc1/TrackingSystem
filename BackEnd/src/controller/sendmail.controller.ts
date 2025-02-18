import { Request, Response, NextFunction } from 'express'
import SendMailServices from "../service/sendmail.services";
import {SendOtpParams} from '../typings/type'

class SendMailController {
  public sendMailServices = new SendMailServices();


  public sendOtp = async (req: Request<SendOtpParams, {}>, res: Response, next: NextFunction) => {
    const { email } = req.params;
    
    try{
      const ack = await this.sendMailServices.sendOtp(email);

      if(ack){
        return res.status(200).json({
          data: {
            msg: "Otp Sent Sucessfully."
          },
          status: 200
        })      
      }

      return res.status(200).json({
        data: {
          msg: "Can't sent Otp!!"
        },
        status: 400
      })    
    }
    catch(err){
      res.status(400).json({
        data: err,
        status: 200
      })
    }
  }

}

export default SendMailController;
