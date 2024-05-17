interface ApplicationStructure {
  _id: string;
  email: string;
  createdDate: Date;
  orgName: string;
  status: number;
  reason: string;
  approvedDate: Date;
}
interface UserStructure {
  email: string;
  firstName: string;
  lastName: string;
  orgName: string
}

export type { ApplicationStructure, UserStructure };
