
export interface Organization {
  isActive: boolean, 
  name: string,
  max_wfh: number,
  userEmail: Array<string>,
  admin: string
}

export interface SystemUser {
  isActive: boolean,
  firstName: string,
  lastName: string,
  email: string,
  dob: string
}

export interface OrganizationUser {
  isActive: boolean,
  firstName: string,
  lastName: string,
  email: string,
  dob: string,
  doj: string,
  organization_list: Array<OrgDetails>
}

export interface OrgDetails  {
  orgName: string,
  doj: string,
}

export interface OrganizationUserNew {
  isActive: boolean,
  firstName: string,
  lastName: string,
  email: string,
  dob: string,
  organization_list: Array<OrgDetails>
}

export interface wfhApplication{
  email: string,
  createdDate: Date,
  orgName: string,
  status: number,
  reason: string,
  approvedBy: String,
  approvedDate: Date
}

export interface otp{
  email: string,
  otp: string,
  time: Date
}


export interface UpdateOrganizationUserEmail {
  _id: string,
  orgName: string,
  email: string
}

export interface OrganizationUserJoin {
  isActive: boolean,
  email: string,
  orgName: string,
  doj: Date
}

export interface AuthUser {
  email: string
}