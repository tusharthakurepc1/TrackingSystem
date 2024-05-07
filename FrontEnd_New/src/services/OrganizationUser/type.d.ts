interface User {
  _orginizationName: string; 
  isAdmin: boolean; 
  firstName: string; 
  lastName: string; 
  email: string; 
  password: string; 
  dob: string; 
  doj: string; 
}

interface LoginUser {
  email: string,
  password: string,
  otp: string
}



export type {User, LoginUser}