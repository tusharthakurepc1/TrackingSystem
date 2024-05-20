import { Request, Response, NextFunction } from 'express'
import WfhApplicationServices from "../service/wfhapplication.services";
import { ExtendedRequest, ApplicationRequest, FilterParameters } from '../typings/type';
import { wfhApplication } from '../typings/common';
import { filter } from 'lodash';


class WfhApplicationController {
  public wfhApplicationService = new WfhApplicationServices()

  public insertApplication = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { email } = req.user
    const { createdDate, orgName, reason } = req.body;
    const dateProcessed = new Date(Date.parse(createdDate))

    const reqBody: wfhApplication = {
      email,
      createdDate: new Date(dateProcessed.getFullYear(), dateProcessed.getMonth(), dateProcessed.getDate(), 0, 0, 0, 0),
      orgName,
      status: 3,
      reason,
      approvedBy: "",
      approvedDate: new Date(0, 0, 0, 0, 0, 0, 0)

    } 

    console.log(JSON.stringify(reqBody.createdDate.getHours()));
    

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
    const { _id, email, status, rejectedReason } = req.body;
    const reqBody:ApplicationRequest = {
      _id,
      email,
      status,
      rejectedReason
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

  public getUserCompanyApplicationController = async (req: Request, res: Response, next: NextFunction) => {
    const { orgName, email } = req.params;
    
    console.log("User Company: ", orgName, email);
    
    try{
      const data = await this.wfhApplicationService.getUserCompanyApplicationService(email, orgName)
            

      return res.status(200).json({
        data: data,
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

  public getUserCompanyApplicationOffsetController = async (req: Request, res: Response, next: NextFunction) => {
    const { orgName, email, page, pageSize } = req.params;
    
    console.log("User Offset Company: ", orgName, email, page, pageSize);
    
    try{
      const data = await this.wfhApplicationService.getUserCompanyApplicationOffsetService(email, orgName, page, pageSize)

      return res.status(200).json({
        data: data,
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

  

  public getCompanyApplicationController = async (req: Request, res: Response, next: NextFunction) => {
    const { orgName, page, pageSize } = req.params;

    try{
      console.log(orgName);
      const data = await this.wfhApplicationService.getCompanyApplicationService(orgName, page, pageSize)
        

      return res.status(200).json({
        data: data,
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

  public getCompanyApplicationFilterController = async (req: Request, res: Response, next: NextFunction) => {
    const { orgName, page, pageSize } = req.params;
    const { email, availedAt, reason, status, approvedBy, availedAtStart, availedAtEnd } = req.query as Record<string, string | undefined>;
    
    const filterQuery: FilterParameters = {
      email,
      availedAt,
      reason,
      status,
      approvedBy,
    }

    console.log(JSON.stringify(req.query));

    try{
      const data = await this.wfhApplicationService.getCompanyApplicationFilterService(orgName, page, pageSize, availedAtStart, availedAtEnd, filterQuery)

      return res.status(200).json({
        data: data,
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
