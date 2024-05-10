import { NextFunction, Request, Response } from 'express'
import OrganizationServices from '../service/organization.services'

class OrganizationController {
  public orgService = new OrganizationServices()

  //Organization Controller Code below
  public getOrganization = async (req: Request, res: Response, next: NextFunction) => {
    const {orgName} = req.params
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

}

export default OrganizationController;

