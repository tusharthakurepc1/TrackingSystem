import { wfhApplication } from "../typings/common";
import { ApplicationRequest } from "typings/type";
import WfhApplicationModel from "../models/wfhapplication.model";

class WfhApplicationDao {

  public insertApplication = async (reqBody: wfhApplication) => {
    const { email, orgName, status, reason, createdDate, approvedDate } = reqBody;
    return await WfhApplicationModel.create({
      email, 
      createdDate,
      orgName, 
      status, 
      reason,
      approvedDate
    })
  }

  public updateStatus = async (reqBody: ApplicationRequest) => {
    const { _id, status } = reqBody;

    return await WfhApplicationModel.updateOne(
      {_id},
      {
        $set: {
          status
        }
      }
    )

  }

}

export default WfhApplicationDao;