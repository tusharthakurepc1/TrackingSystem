type ApplicationStructure = {
  _id: string;
  email: string;
  createdDate: Date;
  orgName: string;
  status: number;
  reason: string;
  approvedDate: Date;
}

type FilterQuery = {
  email?: string,
  availedAt?: string,
  reason?: string,
  status?: string,
  approvedBy?: string,
}

type LeaveApprovalProps = {
  updatedFlag: boolean;
  setUpdateFlag: Function;
  email: string;
  orgName: string;
}

export type { ApplicationStructure, FilterQuery, LeaveApprovalProps };
