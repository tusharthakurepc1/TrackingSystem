import { wfhApplication } from "../typings/common";
import { ApplicationRequest } from "typings/type";
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
      approvedBy: "",
      approvedDate
    })
  }

  public updateStatus = async (reqBody: ApplicationRequest) => {
    const { _id, email, status } = reqBody;

    return await WfhApplicationModel.updateOne(
      {_id},
      {
        $set: {
          status,
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
    const currentPage = (page) || 1;
    const currentPageSize = (pageSize) || 10;
    const startPage = (currentPage - 1) * currentPageSize;
    
    return await WfhApplicationModel.find({email}).skip(startPage).limit(currentPageSize);
  }

  public getAllEmailApplication = async (email: string) => {
    return await WfhApplicationModel.find({email});
  }

}

export default WfhApplicationDao;