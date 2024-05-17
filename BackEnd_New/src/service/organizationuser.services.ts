import OrganizationUserDao from "../dao/organizationuser.dao"
import { OrganizationUser, UpdateOrganizationUserEmail } from "../typings/common"

class OrganizationUserServices {
  private organizationUserDao = new OrganizationUserDao()

  public getAllOrganizationUser = async () => {
    return await this.organizationUserDao.getAllUsers();
  }

  public getAllOrganizationUserCount = async() => {
    return await this.organizationUserDao.getAllUsersCount();
  }

  public getOrganizationUsersOffset = async (page: string, pageSize: string) => {
    return await this.organizationUserDao.getOrganizationUsersOffset(page, pageSize)
  }

  public getOrganizationUserCred = async (email: string) => {
    return await this.organizationUserDao.getOrganizationUser(email);
  }

  public addOrganizationUser = async (reqBody: OrganizationUser) => {
    return await this.organizationUserDao.insertOrganizationUser(reqBody);
  }

  public pushOrganizationUserOrg = async (orgDetail: UpdateOrganizationUserEmail) => {
    return await this.organizationUserDao.pushOrganizationUserOrg(orgDetail);
  }

  public getOrganizationUser = async (email: string) => {
    return await this.organizationUserDao.getOrganizationUser(email);
  }

  public getOrganizationUserCredential = async (email: string) => {
    return await this.organizationUserDao.getOrganizationUser(email);
  }

  public deleteOrganizationUser = async (orgData: UpdateOrganizationUserEmail) => {
    return await this.organizationUserDao.deleteOrganizationUser(orgData);
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