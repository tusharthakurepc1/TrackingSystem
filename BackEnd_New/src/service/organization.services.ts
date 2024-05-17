import OrganizationDao from '../dao/organization.dao'
import { Organization, UpdateOrganizationUserEmail } from 'typings/common';

class OrganizationServices {
  private organizationDao = new OrganizationDao();

  //Operations on Organizations
  public getOrganization = async (orgName: string) => {
    return this.organizationDao.getOrganization(orgName);
  }

  public addOrganization = async (reqBody: Organization) => {
    reqBody.isActive = true;
    return this.organizationDao.insertOrganization(reqBody);
  }

  public addOrganizationEmail = async (reqBody: UpdateOrganizationUserEmail) => {
    return this.organizationDao.pushOrganizationUserEmail(reqBody);
  }

  public removeOrganizationEmail = async (reqBody: UpdateOrganizationUserEmail) => {
    return this.organizationDao.pullOrganizationUserEmail(reqBody);
  }

  public makeOrganizationAdmin = async (reqBody: UpdateOrganizationUserEmail) => {
    return this.organizationDao.makeOrganizationAdmin(reqBody);
  }

}

export default OrganizationServices;