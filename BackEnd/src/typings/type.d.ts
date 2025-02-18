import { Request } from 'express'
import { AuthUser, OrganizationUser, SystemUser } from "./common"
import {z} from 'zod'

interface ExtendedRequest extends Request {
  user: AuthUser
}

interface ExtendedRequestForOrg extends Request {
  user: {email: string, orgName: string}
}

interface ApplicationRequest {
  _id: string,
  email: string,
  status: number,
  rejectedReason: string,
}

interface ApplicationFetchRequest {
  orgList: Array<string>,
  email: string
}

interface ApplicationFetchRequestOffset {
  orgList: Array<string>,
  email: string,
  page: number,
  pageSize: number
}

interface FilterParameters {
  email?: string,
  availedAt?: string,
  reason?: string,
  status?: string,
  approvedBy?: string
}


interface GetEmailParams {
  email: string
}

//--------------  Organization Types --------------------------------

interface GetOrganizationParams {
  orgName: string
}


interface PostOrganizationBody {
  name: string, 
  max_wfh: number, 
  userEmail: string 
}

interface AddOrganizationEmailBody {
  _id: string, 
  orgName: string, 
  email: string
}

interface RemoveOrganizationBody {
  _id: string,
  orgName: string
}

interface OrgDetails {
  orgName: string,
  email: string
}

// -------------------- Organization User ---------------------------------

interface User {
  firstName: string,
  lastName: string,
  email: string,
  dob: string,
  doj: string,
  _orginizationName: string
}

interface GetOrganizationUserParams {
  email: string
}

interface GetOrganizationUserCredBody {
  email: string, 
  orgName: string, 
  otp: string
}

interface GetOrganizationUserParams {
  email: string
}

interface GetOrganizationUserCredBody {
  email: string, 
  orgName: string, 
  otp: string
}

interface DeleteOrganizationUserBody {
  _id: string,
  orgName: string,
  email: string
}

interface UpdateOrganizationUserBody {
  email: string,
  user: OrganizationUser
}

interface UpdateOrganizationUserOrgBody {
  email: string,
  orgName: string,
  user: OrganizationUser
}

// -------------------- Otp ---------------------------------

interface SendOtpParams {
  email: string
}

// -------------------- System User ---------------------------------

interface GetSystemUserCredParams {
  email: string,
  otp: string
}

interface GetUserWithOffset {
  page: string,
  pageSize: string
}

interface UpdateSystemUserBody {
  email: string,
  user: SystemUser
}

