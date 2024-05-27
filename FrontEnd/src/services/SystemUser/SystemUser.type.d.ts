type SystemUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  doj: string
}

type UserDeleteType = {
  _id: string;
  email: string;
  organizationValue: string;
}

type UserAdminType = {
  email: string;
  organizationValue: string;
}

export type { SystemUser, UserDeleteType, UserAdminType };
