

interface ApplicationStructure{
  _id: string
  email: string, 
  createdDate: Date,
  orgName: string,
  status: number,
  reason: string,
  approvedDate: Date
}

export type { ApplicationStructure }