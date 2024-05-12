import { Request } from 'express'
import { AuthUser } from "./common"

interface ExtendedRequest extends Request {
  user: AuthUser
}

interface ApplicationRequest {
  _id: string
  status: number
}

interface ApplicationFetchRequest {
  orgList: Array<string>,
  email: string
}
