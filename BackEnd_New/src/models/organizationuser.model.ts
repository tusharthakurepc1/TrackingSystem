import { Schema, model } from "mongoose";
import { OrganizationUser } from '../typings/common'

const OrganizationUserSchema = new Schema(
  {
    isAdmin: {type: Boolean, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    dob: {type: String, require: false},
    doj: {type: String, require: false},
    orgination_list: {type: Array<String>, require: true}
  },
  {
    timestamps: true
  }
)

const OrganizationUserModel = model<OrganizationUser>('organizationuser', OrganizationUserSchema)
export default OrganizationUserModel;