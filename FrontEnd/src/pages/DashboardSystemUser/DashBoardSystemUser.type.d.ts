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
}

interface UserWithOrg {
  email: string,
  orgName: string
}

export type { UserStructure, SystemUserStructure, UserWithOrg };
