import { SystemUser } from '../typings/common'
import { Schema, model } from "mongoose"

const systemUserSchema = new Schema(
  {
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    dob: {type: String, require: true}
  },
  {
    timestamps: true
  }
)

const SystemUserModel = model<SystemUser>("systemuser", systemUserSchema);
export default SystemUserModel;