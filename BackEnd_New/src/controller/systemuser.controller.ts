import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import SystemUserServices from "../service/systemuser.services"
import { ExtendedRequest } from "../typings/type"
import SECRET_KEY from "../constants/common"

class SystemUserController {
  public systemUserServices = new SystemUserServices()

  public addSystemUser = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try{
      await this.systemUserServices.addSystemUser(body);
      console.log("SystemUser Sucessfully Added");
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
    console.log(req)
    console.log(email);
    
    try{
      const result = await this.systemUserServices.getSystemUser(email)
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

  public getSystemUserAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {email, password} = req.user;

    try{
      const result = await this.systemUserServices.getSystemUserCredential(email, password)

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

}

export default SystemUserController;