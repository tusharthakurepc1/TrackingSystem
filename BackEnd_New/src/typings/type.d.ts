import { Request } from 'express'
import { AuthUser } from "./common"

interface ExtendedRequest extends Request {
  user: AuthUser
}