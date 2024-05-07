import Application from "../../interface/Applications"
import User from "../../interface/User"

interface SystemUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string
}

interface OrgList_Type {
  orgList: Array<string>,
  email: string
}

interface Leave {
  _id: string,
}

export type {SystemUser, OrgList_Type, Leave}