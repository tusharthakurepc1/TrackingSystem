type Application = {
  approvedBy: string;
  approvedDate: Date;
  createdDate: Date;
  email: string;
  orgName: string;
  reason: string;
  status: number;
  id: string;
}

type CalendarLeaveProps = {
  email: string;
  orgName: string,
  updatedFlag: boolean, 
  setUpdatedFlag: Function
}

export type {Application, CalendarLeaveProps};