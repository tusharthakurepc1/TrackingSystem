type ApplicationStructure = {
  _id: string;
  email: string;
  createdDate: Date;
  orgName: string;
  status: number;
  reason: string;
  approvedDate: Date;
}
type UserStructure = {
  email: string;
  firstName: string;
  lastName: string;
  orgName: string
}

export type { ApplicationStructure, UserStructure };
