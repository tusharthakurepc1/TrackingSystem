import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import SystemUserServices from "../service/systemuser.services"
import OrganizationUserServices from "../service/organizationuser.services"
import SendMailServices from "../service/sendmail.services"
import { ExtendedRequest } from "../typings/type"
import SECRET_KEY from "../constants/common"

class SystemUserController {
  public systemUserServices = new SystemUserServices()
  private organizationUserService = new OrganizationUserServices();
  private sendMailServices = new SendMailServices();

  public addSystemUser = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    
    try{
      await this.systemUserServices.addSystemUser(body);
      
      return res.status(200).json({
        data: {
          msg: "System User Added Sucessfully."
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

  public getSystemUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    // console.log(req)
    // console.log(email);
    
    try{
      const result = await this.systemUserServices.getSystemUser(email)
      const token = jwt.sign({email}, SECRET_KEY, {expiresIn: "3d"})
      
      
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


  public getSystemUserCred = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    
    try{
      const result = await this.systemUserServices.getSystemUserCred(email)
      const isValid = await this.sendMailServices.validateOtp(email, otp);
      // if(!isValid){
      //   return res.status(400).json({
      //     data: {
      //       msg: "Otp Expire"
      //     },
      //     status: 400
      //   })
      // }

      const token = jwt.sign({email}, SECRET_KEY, {expiresIn: "3d"})
      console.log("Login");
      
      
      return res.status(200).json({
        data: result,
        accessToken: token,
        user: "SYS",
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

  public getSystemUserAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {email} = req.user;
    
    try{
      const result = await this.systemUserServices.getSystemUserCredential(email)
      const orgData = await this.organizationUserService.getAllOrganizationUser();

      
      return res.status(200).json({
        data: {
          user: result,
          orgData
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

  public getUserWithOffset = async (req: Request, res: Response, next: NextFunction) => {
    const {page, pageSize} = req.query;

    console.log(page, pageSize);
    
    try{
      const result = await this.organizationUserService.getOrganizationUsersOffset(page.toString(), pageSize.toString());
      const resultSize = await this.organizationUserService.getAllOrganizationUserCount();

      console.log(result);
      
      return res.status(200).json({
        data: result,
        totalData: resultSize,
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


  public deleteSystemUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    try{
      await this.systemUserServices.deleteSystemUser(email);

      return res.status(200).json({
        data: {
          msg: "System User Deleted Sucessfully."
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

  public updateSystemUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, user } = req.body;

    try{
      const result = await this.systemUserServices.updateSystemUser(email, user);
      if(result === 945){
        return res.status(200).json({
          data:{
            msg: "Email Already Used"
          },
          status: 205
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

export default SystemUserController;