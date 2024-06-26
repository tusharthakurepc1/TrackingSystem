import OrganizationDao from '../dao/organization.dao'
import { Organization, UpdateOrganizationUserEmail } from 'typings/common';

class OrganizationServices {
  private organizationDao = new OrganizationDao();

  //Operations on Organizations
  public getOrganization = async (orgName: string) => {
    return await this.organizationDao.getOrganization(orgName);
  }

  public addOrganization = async (reqBody: Organization) => {
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

    console.log(orgList);
    
    return orgList;
  }
  public getAllOrganization = async () => {
    return await this.organizationDao.getAllOrganization();
  }

  public isAdminOfOrganization = async (email: string, orgName: string) => {
    const orgData = await this.organizationDao.getOrganization(orgName);
    
    return orgData.admin === email
  }


  public removeOrganizationService = async (_id: string) => {
    return await this.organizationDao.removeOrganization(_id);
  }


}

export default OrganizationServices;