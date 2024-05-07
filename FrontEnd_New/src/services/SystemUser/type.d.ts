interface SystemUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string
}

interface UserDeleteType {
  _id: string, 
  email: string,
  organizationValue: string
}

interface UserAdminType {
  email: string,
  organizationValue: string
}

export type {SystemUser, UserDeleteType, UserAdminType}