export interface User {
    _id: string,
    orgination_list: Array<String>
    isAdmin: boolean,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dob: string,
    doj: string
}