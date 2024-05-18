import { Schema, model } from 'mongoose'
import { otp } from '../typings/common'

const otpSchema = new Schema(
  {
    email: {type: String, require: true},
    otp: {type: String, require: true},
    time: {type: Date, require: true}
  },
  {
    timestamps: true
  }
)

const otpModel = model<otp>('otp', otpSchema);
export default otpModel