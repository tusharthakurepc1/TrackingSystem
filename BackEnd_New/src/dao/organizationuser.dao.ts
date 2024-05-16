import { parse } from "dotenv";
import OrganizationUserSchema from "../models/organizationuser.model";
import { OrganizationUser, UpdateOrganizationUserEmail } from '../typings/common'


class OrganizationUserDao {

  public getAllUsers = async () => {
    return await OrganizationUserSchema.find({});
  }

  public getAllUsersCount = async () => {
    return (await OrganizationUserSchema.find({})).length;
  }

  public getOrganizationUsersOffset = async (page: string, pageSize: string) => {
    const currentPage = parseInt(page) || 1;
    const currentPageSize = parseInt(pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;


    return OrganizationUserSchema.find({}).skip(startPage).limit(currentPageSize);
  }

  public getOrganizationUserCred = async (email: string, password: string) => {
    return await OrganizationUserSchema.findOne({email, password});
  }

  public insertOrganizationUser = async (reqBody: OrganizationUser) => {
    return await OrganizationUserSchema.create(reqBody);
  }

  public pushOrganizationUserOrg = async (orgDetail: UpdateOrganizationUserEmail) => {
    const {email, orgName} = orgDetail;
    const user = OrganizationUserSchema.find({})

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
    const { _id, orgName} = orgData;
    const data = await OrganizationUserSchema.findOne({_id})

    if(data.orgination_list.length <= 1){
      return await OrganizationUserSchema.deleteOne({_id});
    }
    else{
      return await OrganizationUserSchema.updateOne(
        {_id},
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
          email: reqBody.email,
          dob: reqBody.dob,
          doj: reqBody.doj
        }
      }
    )
  }

}

export default OrganizationUserDao;