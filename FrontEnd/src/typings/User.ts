

export default interface User{
  _id: string,
  name: string,
  userEmail: Array<string>,
  max_wfh: number,
  admin: string, 
  email: string,
  application: Array<Application>
}