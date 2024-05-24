type OrganizationUserStructure = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: string,
  doj: string,
  organization_list: [string]
}

type OrganizationListModelProps = {
  openOrg: boolean,
  setOpenOrg: Function,
  flagUpdate: boolean, 
  setFlagUpdate: Function,
  updateData: OrganizationUserStructure
}

export type {OrganizationUserStructure, OrganizationListModelProps}