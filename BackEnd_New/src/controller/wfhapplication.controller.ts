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
      approvedBy: "",
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
    const { _id, email, status } = req.body;
    const reqBody:ApplicationRequest = {
      _id,
      email,
      status
    }
    console.log(_id, email, status);
    

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

  public getUserApplications = async(req: Request, res: Response, next: NextFunction) => {
    const {email} = req.params

    try{
      const applications = await this.wfhApplicationService.getUserEmailApplication(email);

      return res.status(200).json({
        data: applications,
        status: 200
      })
    }
    catch(err){
      return res.status(400).json({
        data: {
          msg: "Cannot get application"
        }, 
        status: 400
      })
    }

  }

  public getAllApplication = async (req: Request, res: Response, next: NextFunction) => {
    const { orgList, email } = req.body;
    const orgBody = {
      orgList,
      email
    }
    
    try{
      
      const response = await this.wfhApplicationService.getAllApplication(orgBody);      

      return res.status(200).json({
        data: response,
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

  public getAllApplicationFetch = async (req: Request, res: Response, next: NextFunction) => {
    const { orgList, email, page, pageSize } = req.body;
    const orgBody = {
      orgList,
      email, 
      page,
      pageSize
    }
    
    
    try{
      
      const response = await this.wfhApplicationService.getAllApplicationFetch(orgBody);      

      return res.status(200).json({
        data: response,
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

  public getAllApplicationUser = async (req: Request, res: Response, next: NextFunction) => {
    const { orgList, email, page, pageSize } = req.body;
    const orgBody = {
      orgList,
      email, 
      page,
      pageSize
    }
     
    try{
      
      const response = await this.wfhApplicationService.getAllApplicationUser(orgBody);      

      return res.status(200).json({
        data: response,
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
