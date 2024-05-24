import axios, { AxiosError } from "axios";
import { OrganizationData } from "./Organization.type";

export const getAllOrganization = async () => {
  const URL = "http://localhost:5500/organization/data/all";
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const api = await axios.get(URL, { headers });

    return api.data;
  } catch (err) {
    return err;
  }
};

export const getOrganizationData = async (orgName: string) => {
  const URL = `http://localhost:5500/organization/${orgName}`;

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const api = await axios.get(URL, { headers });
    return api.data;
  } catch (err) {
    return err;
  }
};

export const getAllOrganizationData = async () => {
  const URL = `http://localhost:5500/organization/data/list`;

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const api = await axios.get(URL, { headers });
    return api.data;
  } catch (err) {
    return err;
  }
};

export const addOrganization = async (orgDetails: OrganizationData) => {
  const URL = `http://localhost:5500/organization`;

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const api = await axios.post(
      URL,
      {
        ...orgDetails,
        userEmail: [],
      },
      { headers }
    );
    return api.data;
  } catch (err) {
    return err;
  }
};

export const removeOrganization = async (_id: string, orgName: string) => {
  const URL = `http://localhost:5500/organization/remove`;

  try{
    const headers = {
      "Content-Type": "application/json",
    };

    const api = await axios.put(URL, { _id, orgName }, { headers });
    return api.data;
  }
  catch(err){
    return err;
  }

}
