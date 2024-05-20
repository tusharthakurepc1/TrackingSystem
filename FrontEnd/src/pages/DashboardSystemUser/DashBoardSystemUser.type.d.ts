type UserStructure = {
  email: string;
  firstName: string;
  lastName: string;
}

type SystemUserStructure = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  organization_list: [string]
}

type OrganizationUserStructure = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  doj: string,
  organization_list: [string]
}

type UserWithOrg = {
  email: string,
  orgName: string
}

export type { UserStructure, OrganizationUserStructure, SystemUserStructure, UserWithOrg };
