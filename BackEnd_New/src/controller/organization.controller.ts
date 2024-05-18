import { NextFunction, Request, Response } from 'express'
import OrganizationServices from '../service/organization.services'
import { UpdateOrganizationUserEmail } from '../typings/common'

class OrganizationController {
  public orgService = new OrganizationServices()

  //Organization Controller Code below
  public getOrganization = async (req: Request, res: Response, next: NextFunction) => {
    const {orgName} = req.params

    if(!orgName || orgName === '' ){
      return res.json(400).json({
        data: {
          msg: "Fill all the details"
        }, 
        status: 400
      })
    }

    try{
      const result = await this.orgService.getOrganization(orgName)
      console.log(result);

      return res.status(200).json({
        data: result,
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

  public addOrganization = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { name, max_wfh, userEmail } = body;
    
    if(
      [name, max_wfh, userEmail].some((el)=> {
        return !el
      })
    ){
      return res.json(400).json({
        data: {
          msg: "Fill all the details"
        }, 
        status: 400
      })
    }
    
    try{
      await this.orgService.addOrganization(body)
      console.log("Organization Added Sucessfully");
      
      return res.status(200).json({
        data: {
          msg: "Organization Added Sucessfully"
        },
        status: 400
      })
    }
    catch(err){
      res.status(400).json({
        data: err,
        status: 400
      });
    }
  }

  public addOrganizationEmail = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { _id, orgName, email } = body;

    if(
      [_id, orgName, email].some((el)=> {
        return !el || el === ''
      })
    ){
      return res.json(400).json({
        data: {
          msg: "Fill all the details"
        }, 
        status: 400
      })
    }


    try{
      await this.orgService.addOrganizationEmail(body)
      console.log("Email Organization Added Sucessfully");
      
      return res.status(200).json({
        data: {
          msg: "User Sucessfully Added to Organization"
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

  public makeOrganizationAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const orgDetail = req.body;
    const {orgName, email} = orgDetail;

    if(
      [orgName, email].some((el)=>{
        return !el || el === ''
      })
    ){
      return res.json(400).json({
        data: {
          msg: "Fill all the details"
        }, 
        status: 400
      })
    }

    try{
      await this.orgService.makeOrganizationAdmin(orgDetail);
      
      return res.status(200).json({
        data: {
          msg: "Organization Admin Updated Sucessfully"
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

  public getAllOrganizationName = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const result = await this.orgService.getAllOrganizationName();

      return res.status(200).json({
        data: {
          msg: result
        }, 
        status: 200
      })
    }
    catch(err){
      return res.status(200).json({
        data: err,
        status: 400
      })
    }
  }

  public isAdminOfOrganization = async (req: Request, res: Response, next: NextFunction) => {
    const {email, orgName} = req.params;

    console.log(email, orgName);
    
    try{
      const user = await this.orgService.isAdminOfOrganization(email, orgName);

      return res.status(200).json({
        data: user,
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

export default OrganizationController;

