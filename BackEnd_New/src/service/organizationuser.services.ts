import OrganizationUserDao from "../dao/organizationuser.dao"
import { OrganizationUser, UpdateOrganizationUserEmail } from "../typings/common"

class OrganizationUserServices {
  private organizationUserDao = new OrganizationUserDao()

  public getAllOrganizationUser = () => {
    return this.organizationUserDao.getAllUsers();
  }

  public getAllOrganizationUserCount = () => {
    return this.organizationUserDao.getAllUsersCount();
  }

  public getOrganizationUsersOffset = (page: string, pageSize: string) => {
    return this.organizationUserDao.getOrganizationUsersOffset(page, pageSize)
  }

  public getOrganizationUserCred = (email: string) => {
    return this.organizationUserDao.getOrganizationUser(email);
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

  public getOrganizationUserCredential = (email: string) => {
    return this.organizationUserDao.getOrganizationUser(email);
  }

  public deleteOrganizationUser = (orgData: UpdateOrganizationUserEmail) => {
    return this.organizationUserDao.deleteOrganizationUser(orgData);
  }

  public updateOrganizationUser = async (email: string, reqBody: OrganizationUser) => {
    const user = await this.organizationUserDao.getOrganizationUser(reqBody.email)
    
    if(user && email !== reqBody.email){
      return 945;
    }
    
    return await this.organizationUserDao.updateOrganizationUser(email, reqBody);
  }

}

export default OrganizationUserServices;