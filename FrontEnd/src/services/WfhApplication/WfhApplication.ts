import axios from "axios";
import { SystemUser, OrgList_Type, Leave } from "./WFHApplication.type";

export const wFHApplicationSignupRequest = async ({
  firstName,
  lastName,
  email,
  password,
  dob,
}: SystemUser) => {
  const user = { firstName, lastName, email, password, dob };
  const URL = "http://localhost:5500/sysuser-signup";

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(URL, JSON.stringify({ user }), {
      headers,
    });
    if (response.data.msg) {
      alert("Application Filled Sucessfully");
    }
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Application Signup Failed");
    return "Signup ApplicationError";
  }
};

export const wFHApplicationFetch = async ({ orgList, email }: OrgList_Type) => {
  const URL = "http://localhost:5500/org-getadmin";

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const application = await axios.post(
      URL,
      JSON.stringify({ orgList, email }),
      { headers },
    );
    return application.data;
  } catch (err) {
    console.log(err);
    return "Application Fetch Error";
  }
};

export const acceptedLeaveReq = async ({ _id }: Leave) => {
  const URL = "http://localhost:5500/application-status";

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const api = await axios.post(URL, JSON.stringify({ _id, statusValue: 1 }), {
      headers,
    });
    return api.data;
  } catch (err) {
    console.log(err);
    return "Accepted Leave Feild";
  }
};

export const rejectedLeaveReq = async ({ _id }: Leave) => {
  const URL = "http://localhost:5500/application-status";

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const api = await axios.post(URL, JSON.stringify({ _id, statusValue: 2 }), {
      headers,
    });
    return api.data;
  } catch (err) {
    console.log(err);
    return "Reject Leave Failed";
  }
};
