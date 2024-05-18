import otpModel from '../models/otp.model'

class SendMailDao {
  
  public insertOtp = async (email: string, otp: string) => {
    const user = await otpModel.find({email})
    
    console.log("USER OTP ", otp);
    
    if(user.length > 0){
      return await otpModel.updateOne(
        {email},
        {
          $set: {
            otp,
            time: Date.now()
          }
        }
      )
    }
    else{
      return await otpModel.create({
        email, 
        otp,
        time: Date.now()
      })
    }
  }

  public getOtp = async (email: string) => {
    return await otpModel.findOne({email})
  }

}

export default SendMailDao;