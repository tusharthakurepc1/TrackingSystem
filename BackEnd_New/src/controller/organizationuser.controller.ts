import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import OrganizationUserServices from "../service/organizationuser.services"
import OrganizationServices from "../service/organization.services"
import SendMailServices from "../service/sendmail.services"
import { Organization } from '../typings/common'
import { ExtendedRequest } from "../typings/type"
import SECRET_KEY from "../constants/common"

class OrganizationUserController {
  public organizationUserServices = new OrganizationUserServices()
  public organization = new OrganizationServices();
  public sendMailServices = new SendMailServices();

  public addOrganizationUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const orgDetail = {
      _id: "",
      orgName: user._orginizationName,
      email: user.email
    };

    const newUser = {
      isActive: true,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      doj: user.doj,
      orgination_list: [user._orginizationName]
    }

    try{
      
      const r1 = await this.organizationUserServices.addOrganizationUser(newUser);
      const r2 = await this.organization.addOrganizationEmail(orgDetail)

      console.log("Resp1: ", r1);
      console.log("Resp2: ", r2);
      

      console.log("OrganizationUser Sucessfully Added");
      return res.status(200).json({
        data: {
          msg: "Organization User Added Sucessfully."
        },
        status: 200
      })
      
    }
    catch(err){
      console.log(err);
      
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
      const token = jwt.sign({email}, SECRET_KEY, {expiresIn: "3d"})
      
      return res.status(200).json({
        data: result,
        accessToken: token,
        user: "ORG",
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

  public getOrganizationUserCred = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    
    
    try{
      const result = await this.organizationUserServices.getOrganizationUserCred(email)
      const isValid = await this.sendMailServices.validateOtp(email, otp);
      // if(!isValid){
      //   return res.status(400).json({
      //     data: {
      //       msg: "Otp Expire"
      //     },
      //     status: 400
      //   })
      // }

      console.log(result);
      
      const token = jwt.sign({email}, SECRET_KEY, {expiresIn: "3d"})
      
      console.log(result);
      
      return res.status(200).json({
        data: result,
        accessToken: token,
        status: 200
      })
    }
    catch(err){
      console.log(err);
      
      return res.status(400).json({
        data: err,
        status: 400
      })
    }
  }

  public getOrganizationUserAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {email} = req.user;

    try{
      const result = await this.organizationUserServices.getOrganizationUserCredential(email)
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

  public deleteOrganizationUser = async (req: Request, res: Response, next: NextFunction) => {
    const orgData = req.body;

    console.log(orgData);
    
    try{
      const r1 = await this.organizationUserServices.deleteOrganizationUser(orgData);
      const r2 = await this.organization.removeOrganizationEmail(orgData)

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
      const response = await this.organizationUserServices.updateOrganizationUser(email, user);
      if(response === 945){
        return res.status(200).json({
          data:{
            msg: "Email Already Used"
          },
          status: 250
        })
      }

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