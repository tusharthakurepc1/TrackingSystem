import { SystemUser } from '../typings/common'
import { Schema, model } from "mongoose"

const systemUserSchema = new Schema(
  {
    isActive: {type: String, require: true}, 
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    dob: {type: String, require: true}
  },
  {
    timestamps: true
  }
)

const SystemUserModel = model<SystemUser>("systemuser", systemUserSchema);
export default SystemUserModel;