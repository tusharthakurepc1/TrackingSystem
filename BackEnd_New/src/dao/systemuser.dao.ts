import SystemUserModel from "../models/systemuser.model";
import { SystemUser } from '../typings/common'


class SystemUserDao {

  public insertSystemUser = async (reqBody: SystemUser) => {
    return await SystemUserModel.create(reqBody);
  }

  public getSystemUser = async (email: string) => {
    return await SystemUserModel.findOne({email});
  }

  public getSystemUserCredential = async (email: string, password: string) => {
    return await SystemUserModel.findOne({email, password})
  }

  public deleteSystemUser = async (email: string) => {
    return await SystemUserModel.deleteOne({email});
  }

  public updateSystemUser = async (email: string, reqBody: SystemUser) => {
    return await SystemUserModel.updateOne(
      {email},
      {
        $set: {
          firstName: reqBody.firstName,
          lastName: reqBody.lastName,
          password: reqBody.password,
          dob: reqBody.dob
        }
      }
    )
  }

}

export default SystemUserDao;