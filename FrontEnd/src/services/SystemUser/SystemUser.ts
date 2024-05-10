import axios from "axios";
// import LoginUser from "../../typings/LoginUser";
import { SystemUser, UserDeleteType, UserAdminType } from "./SystemUser.type";

export const SystemUserDashBoardRequest = async (token: string) => {
  const URL = "http://localhost:5500/sysuser-dashboard";

  try {
    const headers = {
      "Content-Type": "application/json",
      authorization: `BEARER ${token}`,
    };
    const post_dashboard_api = await axios.post(URL, JSON.stringify({}), {
      headers,
    });
    const response = post_dashboard_api.data;

    return response;
  } catch (err) {
    console.log(err);
    return "DashBoard Error";
  }
};

export const SystemUserRequest = async (token: string) => {
  const URL = "http://localhost:5500/sysuser-profile";

  try {
    const headers = {
      "Content-Type": "application/json",
      authorization: `BEARER ${token}`,
    };
    const post_dashboard_api = await axios.post(URL, JSON.stringify({}), {
      headers,
    });
    const response = post_dashboard_api.data;

    return response;
  } catch (err) {
    console.log(err);
    return "DashBoard Error";
  }
};

export const SystemUserLoginRequest = async ({
  email,
  password,
  otp,
}: LoginUser) => {
  const OTP_URL = "http://localhost:5500/sysuser-login";
  const user = { email, password, otp };

  console.log(user);
  
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
    alert("Invalid Login Credential");
    return "Login Error";
  }
};

export const SystemUserSignupRequest = async ({
  firstName,
  lastName,
  email,
  password,
  dob,
}: SystemUser) => {
  const URL = "http://localhost:5500/sysuser-signup";
  const user = { firstName, lastName, email, password, dob };
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(URL, JSON.stringify({ user }), {
      headers,
    });
    if (response.data.msg) {
      alert("Account Created Sucessfully");
    }
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Account Created Failed");
    return "Signup Error";
  }
};

export const UserDelete = async ({
  _id,
  email,
  organizationValue,
}: UserDeleteType) => {
  const URL = "http://localhost:5500/user-delete";

  try {
    const headers = {
      "Content-type": "application/json",
    };
    const response = await axios.post(
      URL,
      JSON.stringify({ _id, email, organizationValue }),
      { headers },
    );
    if (response.data.msg) {
      alert("User Deleted Sucessfully");
    }
    return response.data;
  } catch (err) {
    console.log(err);
    alert("User Deleted Failed");
    return "User Delete Abort";
  }
};

export const MakeUserAdminReq = async ({
  email,
  organizationValue,
}: UserAdminType) => {
  const URL = "http://localhost:5500/org-admin";

  try {
    const headers = {
      "Content-type": "application/json",
    };
    const response = await axios.post(
      URL,
      JSON.stringify({ email: email, orgName: organizationValue }),
      { headers },
    );
    if (response.data.msg) {
      alert("Admin Created Sucessfully");
    }
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Cannot create Admin");
    return "User Admin Creation Abort";
  }
};
