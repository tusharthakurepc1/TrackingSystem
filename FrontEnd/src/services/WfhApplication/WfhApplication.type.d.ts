import Application from "../../typings/Applications";
import User from "../../typings/User";

type SystemUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
}

type OrgList_Type = {
  orgList: Array<string>;
  email: string;
}

type Leave = {
  _id: string;
}

type FilterQuery = {
  email?: string,
  availedAt?: string,
  reason?: string,
  status?: string,
  approvedBy?: string
}

export type { SystemUser, OrgList_Type, Leave, FilterQuery };
