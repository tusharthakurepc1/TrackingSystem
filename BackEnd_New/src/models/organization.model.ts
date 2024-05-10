import { model, Schema } from 'mongoose'
import { Organization } from 'typings/common';

const organizationSchema: Schema = new Schema(
  {
    name: { type: String, require: true, unique: true },
    max_wfh: {type: Number, require: true},
    userEmail: {type: Array<String>, require: true},
    admin: {type: String, require: true, default: 'none'}
  },
  {
    timestamps: true
  }
)

const OrganizationModel = model<Organization>("organization", organizationSchema)
export default OrganizationModel;




