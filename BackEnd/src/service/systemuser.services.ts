import OrganizationUserDao from "../dao/systemuser.dao"
import { SystemUser } from "../typings/common"

class SystemUserServices {
  private systemUserDao = new OrganizationUserDao()

  public addSystemUser = (reqBody: SystemUser) => {
    reqBody.isActive = true;
    return this.systemUserDao.insertSystemUser(reqBody);
  }

  public getSystemUser = (email: string) => {
    return this.systemUserDao.getSystemUser(email);
  }

  public getSystemUserCred = (email: string) => {
    return this.systemUserDao.getSystemUser(email);
  }

  public getSystemUserCredential = (email: string) => {
    return this.systemUserDao.getSystemUser(email);
  }

  public deleteSystemUser = (email: string) => {
    return this.systemUserDao.deleteSystemUser(email);
  }

  public updateSystemUser = async (email: string, reqBody: SystemUser) => {
    const user = await this.systemUserDao.getSystemUser(reqBody.email)
    if(user && email !== reqBody.email){
      return 945;
    }
    
    return await this.systemUserDao.updateSystemUser(email, reqBody);
  }

}

export default SystemUserServices;