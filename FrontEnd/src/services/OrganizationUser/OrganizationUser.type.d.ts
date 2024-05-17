interface User {
  _orginizationName: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  doj: string;
}

interface LoginUser {
  email: string;
  orgName: string
  otp: string;
}

export interface OrganizationUserCompl {
  isActive: boolean,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  doj: string,
  orgination_list: Array<string>
}

export type { User, LoginUser };
