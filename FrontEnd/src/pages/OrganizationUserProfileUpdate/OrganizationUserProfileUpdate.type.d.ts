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
}

type OrgUserProfileUpdateProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  organizationList: [string];
  formFlag: boolean;
  setFormFlag: Function;
}

export type { UserStructure, SystemUserStructure, OrgUserProfileUpdateProps };
