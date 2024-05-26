import { Schema, model } from "mongoose";
import { OrganizationUser, OrgDetails } from '../typings/common'


const OrganizationUserSchema = new Schema(
  {
    isActive: {type: Boolean, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    dob: {type: String, require: false},
    doj: {type: String, require: false},
    organization_list: {type: Array<OrgDetails>, require: true}
  },
  {
    timestamps: true
  }
)

const OrganizationUserModel = model<OrganizationUser>('organizationuser', OrganizationUserSchema)
export default OrganizationUserModel;