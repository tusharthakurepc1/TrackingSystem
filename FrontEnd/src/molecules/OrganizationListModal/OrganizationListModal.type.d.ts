type OrgDetails = {
  orgName: string,
  doj: string
}

type OrganizationUserStructure = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  organization_list: OrgDetails[]
}

type OrganizationListModelProps = {
  openOrg: boolean,
  setOpenOrg: Function,
  flagUpdate: boolean, 
  setFlagUpdate: Function,
  updateData: OrganizationUserStructure
}

export type {OrganizationUserStructure, OrganizationListModelProps}