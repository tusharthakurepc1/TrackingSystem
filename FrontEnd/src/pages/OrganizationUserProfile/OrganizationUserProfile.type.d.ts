export type SystemUser = {
    dob: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,   
    _id: string
}

export type OrganizationUser = {

}

export type OrganizationUserCompl = {
    isAdmin: boolean,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dob: string,
    doj: string,
    orgination_list: Array<string>
  }