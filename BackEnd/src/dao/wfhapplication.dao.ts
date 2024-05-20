import { wfhApplication } from "../typings/common";
import { ApplicationRequest, FilterParameters } from "../typings/type";
import WfhApplicationModel from "../models/wfhapplication.model";
import OrganizationUserDao from "./organizationuser.dao";

class WfhApplicationDao {

  public insertApplication = async (reqBody: wfhApplication) => {
    const { email, orgName, status, reason, createdDate, approvedDate } = reqBody;
    return await WfhApplicationModel.create({
      email, 
      createdDate,
      orgName, 
      status, 
      reason,
      rejectedReason: "",
      approvedBy: "",
      approvedDate
    })
  }

  public updateStatus = async (reqBody: ApplicationRequest) => {
    const { _id, email, status, rejectedReason } = reqBody;

    if(status === 2){
      return await WfhApplicationModel.updateOne(
        {_id},
        {
          $set: {
            status,
            rejectedReason,
            approvedBy: email
          }
        }
      )
  
    }

    return await WfhApplicationModel.updateOne(
      {_id},
      {
        $set: {
          status,
          rejectedReason: "",
          approvedBy: email
        }
      }
    )

  }

  public getAllApplication = async (orgResult: Array<string>) => {
    return await WfhApplicationModel.find({
      orgName: {
        $in: orgResult
      }
    })
  }

  public getAllApplicationOffset = async (orgResult: Array<string>, page: number, pageSize: number) => {
    const currentPage = (page) || 1;
    const currentPageSize = (pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;
    console.log(currentPage, startPage, currentPageSize);
    
    return await WfhApplicationModel.find({
      orgName: {
        $in: orgResult
      }
    }).skip(startPage).limit(currentPageSize);
  }

  public getAllApplicationUser = async (email: string, page: number, pageSize: number) => {
    const currentPage: number = (page) || 1;
    const currentPageSize: number = (pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;
    
    const data = await WfhApplicationModel.find({email}).skip(startPage).limit(currentPageSize);
    // console.log("Data Applications: ", data);
    

    return data;
  }

  public getAllEmailApplication = async (email: string) => {
    return await WfhApplicationModel.find({email});
  }

  public getUserCompanyApplication = async (email: string, orgName: string) => {
    return await WfhApplicationModel.find({email, orgName})
  }

  public getUserCompanyApplicationOffset = async (email: string, orgName: string, page: string, pageSize: string) => {
    const currentPage = parseInt(page) || 1;
    const currentPageSize = parseInt(pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;

    return await WfhApplicationModel.find({email, orgName}).skip(startPage).limit(currentPageSize);
  }

  public getCompanyApplication = async (orgName: string, page: string, pageSize: string) => {
    const currentPage = parseInt(page) || 1;
    const currentPageSize = parseInt(pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;
    console.log("Company Application API: ", currentPage, startPage, currentPageSize);

    return await WfhApplicationModel.find({orgName}).skip(startPage).limit(currentPageSize);
  }

  public getCompanyApplicationFilter = async (orgName: string, page: string, pageSize: string, availedAtStartDate: Date, availedAtEndDate: Date, filteredQuery: FilterParameters) => {
    const currentPage = parseInt(page) || 1;
    const currentPageSize = parseInt(pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;

    
    const findObj = {
      ...filteredQuery,
      createdDate: {
        $gte: availedAtStartDate,
        $lte: availedAtEndDate
      },
      orgName
    }
    console.log(findObj);
    
    
    return await WfhApplicationModel.find(findObj).skip(startPage).limit(currentPageSize);
  }

  public getApplicationFilterCount = async(orgName: string, availedAtStartDate: Date, availedAtEndDate: Date, filteredQuery: FilterParameters) => {
    const findObj = {
      ...filteredQuery,
      createdDate: {
        $gte: availedAtStartDate,
        $lte: availedAtEndDate
      },
      orgName
    }
    
    return (await WfhApplicationModel.find(findObj)).length
  }

  public getCompanyApplicationCount = async(orgName: string) => {
    return (await WfhApplicationModel.find({orgName})).length
  }

  public getUserCompanyApplicationCount = async(orgName: string, email: string) => {
    return (await WfhApplicationModel.find({orgName, email})).length
  }

}

export default WfhApplicationDao;