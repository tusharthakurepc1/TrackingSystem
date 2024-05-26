import OrganizationUserSchema from "../models/organizationuser.model";
import { OrganizationUser, OrgDetails, OrganizationUserNew, UpdateOrganizationUserEmail } from '../typings/common'


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

    return await OrganizationUserSchema.find({isActive: true}).skip(startPage).limit(currentPageSize);
  }

  public insertOrganizationUser = async (reqBody: OrganizationUserNew) => {
    const user: OrganizationUserNew = await OrganizationUserSchema.findOne({email: reqBody.email, isActive: true});
    console.log(user);
    
    if(user){
      const orgExists: boolean = user.organization_list.some((el: OrgDetails)=>{
        return el.orgName === reqBody.organization_list[0].orgName
      })

      if(orgExists){
        return null;
      }
      return await OrganizationUserSchema.updateOne(
        {email: reqBody.email}, 
        {
          $push: {
            organization_list: reqBody.organization_list[0]
          }
        }
      )
    }
    return await OrganizationUserSchema.create(reqBody);
  }

  public pushOrganizationUserOrg = async (orgDetail: UpdateOrganizationUserEmail) => {
    const {email, orgName} = orgDetail;

    return await OrganizationUserSchema.updateOne(
      {email},
      {
        $push: {
          organization_list: {orgName, doj: ""}
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
          organization_list: {orgName}
        }
      }
    )
  }

  public getOrganizationUser = async (email: string) => {
    return await OrganizationUserSchema.findOne({email, isActive: true});
  }

  public deleteOrganizationUser = async (orgData: UpdateOrganizationUserEmail) => {
    const { email, orgName} = orgData;
    const data: OrganizationUserNew = await OrganizationUserSchema.findOne({email})

    if(data.organization_list.length <= 1){
      return await OrganizationUserSchema.deleteOne({email});
    }
    else{
      return await OrganizationUserSchema.updateOne(
        {email},
        {
          $pull: {
            organization_list: { orgName: orgName }
          }
        }
      )
    }
  }

  public updateOrganizationUser = async (email: string, reqBody: OrganizationUser) => {
    return await OrganizationUserSchema.updateOne(
      {email, isActive: true},
      {
        $set: {
          firstName: reqBody.firstName,
          lastName: reqBody.lastName,
          email: reqBody.email,
          dob: reqBody.dob,
        }
      }
    )
  }

  public updateOrganizationUserOrg = async(email: string, orgName: string, reqBody: OrganizationUser) => {
    return await OrganizationUserSchema.updateOne(
      {email, 'organization_list.orgName': orgName, isActive: true},
      {
        $set: {
          firstName: reqBody.firstName,
          lastName: reqBody.lastName,
          email: reqBody.email,
          dob: reqBody.dob,
          'organization_list.$.doj': reqBody.doj
        }
      }
    )
  }


  //remove organization from the user email list
  public deleteUserFromOrganization = async(orgName: string) => {
    return await OrganizationUserSchema.updateMany(
      {orgination_list: orgName},
      {
        $pull: {
          orgination_list: orgName
        }
      }
    )
  }

}

export default OrganizationUserDao;