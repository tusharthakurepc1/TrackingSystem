import WfhApplicationDao from "../dao/wfhapplication.dao";
import { ApplicationRequest, ApplicationFetchRequest, ApplicationFetchRequestOffset } from "../typings/type";
import { wfhApplication, Organization } from "../typings/common";
import OrganizationDao from "../dao/organization.dao";

class WfhApplicationServices {
  private wfhApplicationDao = new WfhApplicationDao()
  private organizationDao = new OrganizationDao();

  public insertApplication = async(reqBody: wfhApplication) => {
    return this.wfhApplicationDao.insertApplication(reqBody);
  }

  public updateApplicationStatus = async (reqBody: ApplicationRequest) => {
    return this.wfhApplicationDao.updateStatus(reqBody)
  }

  public getAllApplication = async (reqBody: ApplicationFetchRequest) => {
    const { orgList, email } = reqBody;

    let orgData = await this.organizationDao.getAllOrganization();
    
    let result: Array<Organization> = []
    let orgResult: Array<string> = []
    
    orgData.forEach((el)=> {
      if(el.admin === email && orgList.find((comp)=> comp === el.name)){        
        orgResult.push(el.name)
        result.push(el)
      }
    })
    
    console.log("ApplicationArray: ");
    console.log(orgResult);
    
    let applicationRes = await this.wfhApplicationDao.getAllApplication(orgResult);
    let allEmailApplications = await this.wfhApplicationDao.getAllEmailApplication(email);
    
    return {
      result,
      applicationRes,
      allEmailApplications
    }
  }

  public getAllApplicationFetch = async (reqBody: ApplicationFetchRequestOffset) => {
    const { orgList, email, page, pageSize } = reqBody;

    let orgData = await this.organizationDao.getAllOrganization();
    
    let result: Array<Organization> = []
    let orgResult: Array<string> = []
    
    orgData.forEach((el)=> {
      if(el.admin === email && orgList.find((comp)=> comp === el.name)){        
        orgResult.push(el.name)
        result.push(el)
      }
    })
    
    
    let applicationRes = await this.wfhApplicationDao.getAllApplicationOffset(orgResult, page, pageSize);
    // console.log("Total applications: ",applicationRes.length);
    

    return {
      applicationRes,
      totalApplication: applicationRes.length
    }
  }

  public getAllApplicationUser = async (reqBody: ApplicationFetchRequestOffset) => {
    const { orgList, email, page, pageSize } = reqBody;
    
    let applicationRes = await this.wfhApplicationDao.getAllApplicationUser(email, page, pageSize);
    let totalApplicationRes = await this.wfhApplicationDao.getAllEmailApplication(email);
    console.log(applicationRes);
    
    return {
      applicationRes,
      totalApplication: totalApplicationRes.length
    }
  }

  public getUserEmailApplication = async (email: string) => {
    return this.wfhApplicationDao.getAllEmailApplication(email);
  }

  public getUserCompanyApplicationService = async (email: string, orgName: string) => {
    return await this.wfhApplicationDao.getUserCompanyApplication(email, orgName);
  }

  public getUserCompanyApplicationOffsetService = async (email: string, orgName: string, page: string, pageSize: string) => {
    const applicationRes = await this.wfhApplicationDao.getUserCompanyApplicationOffset(email, orgName, page, pageSize);
    const totalApplication = await this.wfhApplicationDao.getUserCompanyApplicationCount(orgName, email);

    return {
      applicationRes, 
      totalApplication
    }
  }

  public getCompanyApplicationService = async (orgName: string, page: string, pageSize: string) => {
    const applicationRes = await this.wfhApplicationDao.getCompanyApplication(orgName, page, pageSize);
    const totalApplication = await this.wfhApplicationDao.getCompanyApplicationCount(orgName);

    return {
      applicationRes,
      totalApplication
    }
  }

}

export default WfhApplicationServices;