export interface Organization {
  name: string,
  max_wfh: number,
  userEmail: Array<string>,
  admin: string
}

export interface SystemUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string
}

export interface OrganizationUser {
  isAdmin: boolean,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  doj: string,
  orgination_list: Array<string>
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


export interface AuthUser {
  email: string,
  password: string
}
