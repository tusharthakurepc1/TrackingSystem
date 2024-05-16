interface UserStructure {
  email: string;
  firstName: string;
  lastName: string;
}

interface SystemUserStructure {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  organization_list: [string]
}

interface OrganizationUserStructure {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  doj: string,
  organization_list: [string]
}

interface UserWithOrg {
  email: string,
  orgName: string
}

export type { UserStructure, OrganizationUserStructure, SystemUserStructure, UserWithOrg };
