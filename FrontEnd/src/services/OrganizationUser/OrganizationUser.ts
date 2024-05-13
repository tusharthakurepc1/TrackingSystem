import axios from "axios";
import { User, LoginUser, OrganizationUserCompl } from "./OrganizationUser.type";

//Return the User DashBoard Data while navigate to the DashBoard
export const organizationUserDashBoardRequest = async (token: string) => {
  const URL = "http://localhost:5500/user/dashboard";
  try {
    const headers = {
      "Content-Type": "application/json",
      authorization: `BEARER ${token}`,
    };
    const api = await axios.post(URL, JSON.stringify({}), { headers });
    

    return api.data;
  } catch (err) {
    return err;
  }
};

export const updateOrganizationUser = async (email: string, user: OrganizationUserCompl) => {
  console.log(email);
  console.log(JSON.stringify(user));
  
  const URL = "http://localhost:5500/user/update";

  try{
    const headers = {
      "Content-Type": "application/json"
    }
    const api = await axios.put(URL, JSON.stringify({email, user}), {headers});
    return api.data;
    
  }catch(err){
    return "Update Error"
  }

}


export const organizationUserRequest = async (token: string) => {
  const URL = "http://localhost:5500/user/dashboard";
  try {
    const headers = {
      "Content-Type": "application/json",
      authorization: `BEARER ${token}`,
    };
    const api = await axios.post(URL, JSON.stringify({}), { headers });
    // console.log(api.data);
    
    return api.data;
  } catch (err) {
    return "DashBoard Error";
  }
};

//Return the User with corrospond email and password
export const organizationUserLoginRequest = async ({
  email,
  password,
  otp,
}: LoginUser) => {
  const OTP_URL = "http://localhost:5500/user/login";
  const user = { email, password, otp };

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const resp = await axios.post(OTP_URL, JSON.stringify(user), { headers });
    if (resp.data.msg) {
      alert("Login Sucessfully");
    }
    return resp.data;
  } catch (err) {
    console.log(err);
    
    return "Login Error Throw";
  }
};

//Insert data into the db with corrospond User Type
export const organizationUserSignupRequest = async ({
  _orginizationName,
  isAdmin,
  firstName,
  lastName,
  email,
  password,
  dob,
  doj,
}: User) => {
  const URL = "http://localhost:5500/user";
  const user = {
    _orginizationName,
    isAdmin,
    firstName,
    lastName,
    email,
    password,
    dob,
    doj,
  };
  console.log(JSON.stringify(user));

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(URL, JSON.stringify(user), { headers });

    if (response.data.msg) {
      alert("Account Created Sucessfully");
    }
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Account Created Failed");
    return "Signup Error Throw";
  }
};

export const acceptedLeaveRequest = async (_id: string) => {
  const URL = "http://localhost:5500/application-status/leave";

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.put(
      URL,
      JSON.stringify({ _id, status: 1 }),
      { headers },
    );
    
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const rejectedLeaveRequest = async (_id: string) => {
  // setNewStatus(2);
  const URL = "http://localhost:5500/application-status/leave";

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const post_dashboard_api = await axios.put(
      URL,
      JSON.stringify({ _id, status: 2 }),
      { headers },
    );
    return post_dashboard_api.data;
  } catch (err) {
    return err;
  }
};