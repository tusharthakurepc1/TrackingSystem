import OrganizationUserSchema from "../models/organizationuser.model";
import { OrganizationUser, UpdateOrganizationUserEmail } from '../typings/common'


class OrganizationUserDao {

  public insertOrganizationUser = async (reqBody: OrganizationUser) => {
    return await OrganizationUserSchema.create(reqBody);
  }

  public pushOrganizationUserOrg = async (orgDetail: UpdateOrganizationUserEmail) => {
    const {email, orgName} = orgDetail;
    return await OrganizationUserSchema.updateOne(
      {email},
      {
        $push: {
          orgination_list: orgName
        }
      }
    )
  }

  public pullOrganizationUserOrg = async (orgDetail: UpdateOrganizationUserEmail) => {
    const {email, orgName} = orgDetail;
    return await OrganizationUserSchema.updateOne(
      {email},
      {
        $pull: {
          orgination_list: orgName
        }
      }
    )
  }

  public getOrganizationUser = async (email: string) => {
    return await OrganizationUserSchema.findOne({email});
  }

  public getOrganizationUserCredential = async (email: string, password: string) => {
    return await OrganizationUserSchema.findOne({email, password})
  }

  public deleteOrganizationUser = async (orgData: UpdateOrganizationUserEmail) => {
    const {email, orgName} = orgData;
    const data = await OrganizationUserSchema.findOne({email})

    if(data.orgination_list.length <= 0){
      return await OrganizationUserSchema.deleteOne({email});
    }
    else{
      return await OrganizationUserSchema.updateOne(
        {email},
        {
          $pull: {
            orgination_list: orgName
          }
        }
      )
    }
  }

  public updateOrganizationUser = async (email: string, reqBody: OrganizationUser) => {
    return await OrganizationUserSchema.updateOne(
      {email},
      {
        $set: {
          firstName: reqBody.firstName,
          lastName: reqBody.lastName,
          password: reqBody.password,
          dob: reqBody.dob,
          doj: reqBody.doj
        }
      }
    )
  }

}

export default OrganizationUserDao;