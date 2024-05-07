interface ApplicationStructure{
  email: string, 
  createdDate: string,
  orgName: string,
  status: number,
  reason: string,
  approvedDate: string
}
interface UserStructure{
  email: string,
  firstName: string,
  lastName: string
}

export type {ApplicationStructure, UserStructure}