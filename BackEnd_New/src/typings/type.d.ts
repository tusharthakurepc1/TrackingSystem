import { Request } from 'express'
import { AuthUser } from "./common"

interface ExtendedRequest extends Request {
  user: AuthUser
}

interface ApplicationRequest {
  _id: string,
  email: string,
  status: number
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
