import otpModel from '../models/otp.model'

class SendMailDao {
  
  public insertOtp = async (email: string, otp: string) => {
    const user = otpModel.find({email})
    if(user){
      await otpModel.updateOne(
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
      await otpModel.create({
        email, 
        otp,
        time: Date.now()
      })
    }
  }


}

export default SendMailDao;