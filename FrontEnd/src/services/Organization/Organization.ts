import axios from "axios";

export const getAllOrganization = async () => {
  const URL = "http://localhost:5500/organization/all";
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
