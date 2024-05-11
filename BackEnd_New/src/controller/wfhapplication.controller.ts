import { Request, Response, NextFunction } from 'express'
import WfhApplicationServices from "../service/wfhapplication.services";
import { ExtendedRequest, ApplicationRequest } from '../typings/type';
import { wfhApplication } from '../typings/common';

class WfhApplicationController {
  public wfhApplicationService = new WfhApplicationServices()

  public insertApplication = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { email } = req.user
    const { createdDate, orgName, reason } = req.body;

    const reqBody: wfhApplication = {
      email,
      createdDate,
      orgName,
      status: 3,
      reason,
      approvedDate: new Date(0, 0, 0)
    } 

    try{
      await this.wfhApplicationService.insertApplication(reqBody)

      res.status(200).json({
        data: {
          msg: "Application Sucessfully"
        },
        status: 200
      })
    }
    catch(err){
      res.status(400).json({
        data: err,
        status: 400
      })
    }
  }

  public updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { _id, status } = req.body;
    const reqBody:ApplicationRequest = {
      _id,
      status
    }

    try{
      await this.wfhApplicationService.updateApplicationStatus(reqBody);

      return res.status(200).json({
        data: {
          msg: "Application Status Updated"
        },
        status: 200
      })
    }
    catch(err){
      return res.status(400).json({
        data: err,
        status: 400
      })
    }
  }

}

export default WfhApplicationController;
