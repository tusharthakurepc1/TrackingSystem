import OrganizationUserDao from "../dao/organizationuser.dao"
import { OrganizationUser, UpdateOrganizationUserEmail } from "../typings/common"

class OrganizationUserServices {
  private organizationUserDao = new OrganizationUserDao()

  public getAllOrganizationUser = () => {
    return this.organizationUserDao.getAllUsers();
  }

  public getOrganizationUserCred = (email: string, password: string) => {
    return this.organizationUserDao.getOrganizationUserCred(email, password);
  }

  public addOrganizationUser = (reqBody: OrganizationUser) => {
    return this.organizationUserDao.insertOrganizationUser(reqBody);
  }

  public pushOrganizationUserOrg = (orgDetail: UpdateOrganizationUserEmail) => {
    return this.organizationUserDao.pushOrganizationUserOrg(orgDetail);
  }

  public getOrganizationUser = (email: string) => {
    return this.organizationUserDao.getOrganizationUser(email);
  }

  public getOrganizationUserCredential = (email: string, password: string) => {
    return this.organizationUserDao.getOrganizationUserCredential(email, password);
  }

  public deleteOrganizationUser = (orgData: UpdateOrganizationUserEmail) => {
    return this.organizationUserDao.deleteOrganizationUser(orgData);
  }

  public updateOrganizationUser = (email: string, reqBody: OrganizationUser) => {
    return this.organizationUserDao.updateOrganizationUser(email, reqBody);
  }

}

export default OrganizationUserServices;