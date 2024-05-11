import WfhApplicationDao from "../dao/wfhapplication.dao";
import { ApplicationRequest } from "../typings/type";
import { wfhApplication } from "../typings/common";

class WfhApplicationServices {
  private wfhApplicationDao = new WfhApplicationDao()

  public insertApplication = async(reqBody: wfhApplication) => {
    return this.wfhApplicationDao.insertApplication(reqBody);
  }

  public updateApplicationStatus = async (reqBody: ApplicationRequest) => {
    return this.wfhApplicationDao.updateStatus(reqBody)
  }

}

export default WfhApplicationServices;