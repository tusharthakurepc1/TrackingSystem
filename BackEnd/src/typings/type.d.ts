import { Request } from 'express'
import { AuthUser } from "./common"

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

