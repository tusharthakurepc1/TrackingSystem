import { Schema, model } from "mongoose";
import { wfhApplication } from '../typings/common';

const WfhApplicationSchema = new Schema(
  {
    email: {type: String, require: true},
    createdDate: {type: Date, require: true},
    orgName: {type: String, require: true},
    status: {type: Number, require: true},
    reason: {type: String, require: true},
    approvedBy: {type: String, require: true},
    approvedDate: {type: Date, require: true}
  },
  {
    timestamps: true
  }
)


const WfhApplicationModel = model<wfhApplication>('wfhapplication', WfhApplicationSchema)
export default WfhApplicationModel