import { parse } from "dotenv";
import OrganizationUserSchema from "../models/organizationuser.model";
import { OrganizationUser, UpdateOrganizationUserEmail } from '../typings/common'


class OrganizationUserDao {

  public getAllUsers = async () => {
    return await OrganizationUserSchema.find({isActive: true});
  }

  public getAllUsersCount = async () => {
    return (await OrganizationUserSchema.find({isActive: true})).length;
  }

  public getOrganizationUsersOffset = async (page: string, pageSize: string) => {
    const currentPage = parseInt(page) || 1;
    const currentPageSize = parseInt(pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;


    return OrganizationUserSchema.find({isActive: true}).skip(startPage).limit(currentPageSize);
  }

  public insertOrganizationUser = async (reqBody: OrganizationUser) => {
    const user = OrganizationUserSchema.find({email: reqBody.email, isActive: true});
    console.log(user);
    
    if(user){
      return await OrganizationUserSchema.updateOne(
        {email: reqBody.email}, 
        {
          $push: {
            orgination_list: reqBody.orgination_list[0]
          }
        }
      )
    }
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
    return await OrganizationUserSchema.findOne({email, isActive: true});
  }

  public deleteOrganizationUser = async (orgData: UpdateOrganizationUserEmail) => {
    const { email, orgName} = orgData;
    const data = await OrganizationUserSchema.findOne({email})

    if(data.orgination_list.length <= 1){
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
          email: reqBody.email,
          dob: reqBody.dob,
          doj: reqBody.doj
        }
      }
    )
  }

}

export default OrganizationUserDao;