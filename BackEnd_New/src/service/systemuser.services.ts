import OrganizationUserDao from "../dao/systemuser.dao"
import { SystemUser } from "../typings/common"

class SystemUserServices {
  private systemUserDao = new OrganizationUserDao()

  public addSystemUser = (reqBody: SystemUser) => {
    return this.systemUserDao.insertSystemUser(reqBody);
  }

  public getSystemUser = (email: string) => {
    return this.systemUserDao.getSystemUser(email);
  }

  public getSystemUserCred = (email: string, password: string) => {
    return this.systemUserDao.getSystemUserCred(email, password);
  }

  public getSystemUserCredential = (email: string, password: string) => {
    return this.systemUserDao.getSystemUserCredential(email, password);
  }

  public deleteSystemUser = (email: string) => {
    return this.systemUserDao.deleteSystemUser(email);
  }

  public updateSystemUser = (email: string, reqBody: SystemUser) => {
    const user = this.systemUserDao.getSystemUser(reqBody.email)
    if(user && email !== reqBody.email){
      return 945;
    }
    return this.systemUserDao.updateSystemUser(email, reqBody);
  }

}

export default SystemUserServices;