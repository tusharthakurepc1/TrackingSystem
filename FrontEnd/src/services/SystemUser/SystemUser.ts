import axios from "axios";
import { SystemUser, UserDeleteType, UserAdminType } from "./SystemUser.type";

export const SystemUserWithOffset = async (page: number, pageSize: number) => {
  const URL = `http://localhost:5500/sysuser?page=${page}&pageSize=${pageSize}`

  try{
    const headers = {
      'Content-type': "application/json"
    }
    const api = await axios.get(URL, {headers});
    
    
    return api.data;
  }
  catch(err){
    return "Can't get Users";
  }

}

export const SystemUserDashBoardRequest = async (token: string) => {
  const URL = "http://localhost:5500/sysuser/dashboard";

  try {
    const headers = {
      "Content-Type": "application/json",
      authorization: `BEARER ${token}`,
    };
    const response = await axios.post(URL, JSON.stringify({}), {
      headers
    });
    

    return response.data;
  } catch (err) {
    console.log(err);
    return "DashBoard Error";
  }
};

export const updateSystemUser = async (email: string, user: SystemUser) => {
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

export const updateSystemUserOrgName = async (email: string, orgName: string, user: SystemUser) => {
  const URL = "http://localhost:5500/user/details/update";

  try{
    const headers = {
      "Content-Type": "application/json"
    }
    const api = await axios.put(URL, JSON.stringify({email, orgName, user}), {headers});
    return api.data;
    
  }catch(err){
    return "Update Error"
  }

}

export const updateSystemUserData = async (email: string, user: SystemUser) => {
  console.log(email);
  console.log(JSON.stringify(user));
  
  const URL = "http://localhost:5500/sysuser/update";

  try{
    const headers = {
      "Content-Type": "application/json"
    }
    const api = await axios.put(URL, JSON.stringify({email, user}), {headers});
    return api.data;
    
  }catch(err){
    return err;
  }

}

export const SystemUserLoginRequest = async ({
  email,
  password,
  otp,
}: LoginUser) => {
  const OTP_URL = "http://localhost:5500/sysuser/login";
  const user = { email, password, otp };

  console.log(user);
  
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const resp = await axios.post(OTP_URL, 
      JSON.stringify({email, password, otp}),
     { headers });
    
    return resp.data;
  } catch (err) {
    console.log(err);
    return "Login Error";
  }
};

export const UserDelete = async ({
  _id,
  email,
  organizationValue,
}: UserDeleteType) => {
  const URL = "http://localhost:5500/user/delete";

  try {
    const headers = {
      "Content-type": "application/json",
    };
    const response = await axios.post(
      URL,
      JSON.stringify({ _id, email, orgName: organizationValue }),
      { headers },
    );
    // console.log(response.data);
    
    return response.data;
  } catch (err) {
    // console.log(err);
    return err;
  }
};

export const MakeUserAdminReq = async ({
  email,
  organizationValue,
}: UserAdminType) => {
  const URL = "http://localhost:5500/organization/admin";
  
  try {
    const headers = {
      "Content-type": "application/json",
    };
    const response = await axios.put(
      URL,
      JSON.stringify({ email: email, orgName: organizationValue }),
      { headers },
    );
    
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Cannot create Admin");
    return "User Admin Creation Abort";
  }
};
