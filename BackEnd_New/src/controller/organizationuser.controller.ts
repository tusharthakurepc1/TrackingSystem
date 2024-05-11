import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import OrganizationUserServices from "../service/organizationuser.services"
import OrganizationServices from "../service/organization.services"
import { Organization } from '../typings/common'
import { ExtendedRequest } from "../typings/type"
import SECRET_KEY from "../constants/common"

class OrganizationUserController {
  public organizationUserServices = new OrganizationUserServices()
  public organization = new OrganizationServices();

  public addOrganizationUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const orgDetail = req.body.org;
    try{
      console.log(JSON.stringify(orgDetail));
      
      await this.organizationUserServices.addOrganizationUser(user);
      await this.organizationUserServices.pushOrganizationUserOrg(orgDetail);
      await this.organization.addOrganizationEmail(orgDetail)

      console.log("OrganizationUser Sucessfully Added");
      return res.status(200).json({
        data: {
          msg: "Organization User Added Sucessfully."
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

  public getOrganizationUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    console.log(email);
    
    try{
      const result = await this.organizationUserServices.getOrganizationUser(email)
      const token = jwt.sign({email, password: result.password}, SECRET_KEY, {expiresIn: "3d"})
      
      return res.status(200).json({
        data: result,
        accessToken: token,
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

  public getOrganizationUserAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {email, password} = req.user;

    try{
      const result = await this.organizationUserServices.getOrganizationUserCredential(email, password)

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

  public deleteOrganizationUser = async (req: Request, res: Response, next: NextFunction) => {
    const orgData = req.body.org;

    try{
      await this.organizationUserServices.deleteOrganizationUser(orgData);
      await this.organization.removeOrganizationEmail(orgData)

      return res.status(200).json({
        data: {
          msg: "Organization User Deleted Sucessfully."
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

  public updateOrganizationUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, user } = req.body;

    try{
      await this.organizationUserServices.updateOrganizationUser(email, user);

      return res.status(200).json({
        data:{
          msg: "Account Updated Sucessfully"
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

export default OrganizationUserController;