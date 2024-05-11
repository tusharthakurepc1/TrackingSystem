import OrganizationModel from '../models/organization.model'
import { Organization, UpdateOrganizationUserEmail } from 'typings/common';

class OrganizationDao {
  //DB queries of Organization
  
  public insertOrganization = async (reqBody: Organization)=>{
    return await OrganizationModel.create(reqBody)
  }

  public pushOrganizationUserEmail = async (reqBody: UpdateOrganizationUserEmail) => {
    return await OrganizationModel.updateOne(
      {name: reqBody.orgName},
      {
        $push: {
          userEmail: reqBody.email
        }
      }
    )
  }

  public pullOrganizationUserEmail = async (reqBody: UpdateOrganizationUserEmail) => {
    return await OrganizationModel.updateOne(
      {name: reqBody.orgName},
      {
        $pull: {
          userEmail: reqBody.email
        }
      }
    )
  }

  public makeOrganizationAdmin = async (reqBody: UpdateOrganizationUserEmail) => {
    return await OrganizationModel.updateOne(
      {name: reqBody.orgName},
      {
        $set: {
          admin: reqBody.email
        }
      }
    )
  }

  public getOrganization = async (orgName: string) => {
    return await OrganizationModel.findOne({name: orgName})
  }

}

export default OrganizationDao;