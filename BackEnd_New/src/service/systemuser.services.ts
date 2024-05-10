import SystemUserDao from "../dao/systemuser.dao"
import { SystemUser } from "../typings/common"

class SystemUserServices {
  private systemUserDao = new SystemUserDao()

  public addSystemUser = (reqBody: SystemUser) => {
    return this.systemUserDao.insertSystemUser(reqBody);
  }

  public getSystemUser = (email: string) => {
    return this.systemUserDao.getSystemUser(email);
  }

  public getSystemUserCredential = (email: string, password: string) => {
    return this.systemUserDao.getSystemUserCredential(email, password);
  }

}

export default SystemUserServices;