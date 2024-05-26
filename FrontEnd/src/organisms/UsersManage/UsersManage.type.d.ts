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

type OrgDetails = {
  orgName: string,
  doj: string
}

type OrganizationUserStructure = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  organization_list: OrgDetails[]
}

type UserWithOrg = {
  email: string,
  orgName: string
}

export type { UserStructure, OrganizationUserStructure, SystemUserStructure, UserWithOrg };
