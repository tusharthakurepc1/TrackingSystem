import OrganizationDao from '../dao/organization.dao'
import { Organization, UpdateOrganizationUserEmail } from 'typings/common';

class OrganizationServices {
  private organizationDao = new OrganizationDao();

  //Operations on Organizations
  public getOrganization = async (orgName: string) => {
    return await this.organizationDao.getOrganization(orgName);
  }

  public addOrganization = async (reqBody: Organization) => {
    reqBody.isActive = true;
    return await this.organizationDao.insertOrganization(reqBody);
  }

  public addOrganizationEmail = async (reqBody: UpdateOrganizationUserEmail) => {
    return await this.organizationDao.pushOrganizationUserEmail(reqBody);
  }

  public removeOrganizationEmail = async (reqBody: UpdateOrganizationUserEmail) => {
    return await this.organizationDao.pullOrganizationUserEmail(reqBody);
  }

  public makeOrganizationAdmin = async (reqBody: UpdateOrganizationUserEmail) => {
    return await this.organizationDao.makeOrganizationAdmin(reqBody);
  }

  public getAllOrganizationName = async () => {
    const allOrgList = await this.organizationDao.getAllOrganization();
    const orgList: string[] = allOrgList.map((el)=>{
      return el.name;
    })

    return orgList;
  }

  public isAdminOfOrganization = async (email: string, orgName: string) => {
    const orgData = await this.organizationDao.getOrganization(orgName);
    
    return orgData.admin === email
  }


}

export default OrganizationServices;