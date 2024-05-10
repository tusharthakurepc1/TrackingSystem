import OrganizationDao from '../dao/organization.dao'
import { Organization, UpdateOrganizationUserEmail } from 'typings/common';

class OrganizationServices {
  private organizationDao = new OrganizationDao();

  //Operations on Organizations
  public getOrganization = async (orgName: string) => {
    return this.organizationDao.getOrganization(orgName);
  }

  public addOrganization = async (reqBody: Organization) => {
    return this.organizationDao.insertOrganization(reqBody);
  }

  public addOrganizationEmail = async (reqBody: UpdateOrganizationUserEmail) => {
    return this.organizationDao.pushOrganizationUserEmail(reqBody);
  }

}

export default OrganizationServices;