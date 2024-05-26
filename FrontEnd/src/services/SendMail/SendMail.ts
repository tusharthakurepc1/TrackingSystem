import axios from "axios";
import { OtpPayload } from "./SendMail.type";

export const sendOtpReq = async ({ emailVal }: OtpPayload) => {
  const OTP_URL = "http://localhost:5500/mail/"+emailVal;

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const resp = await axios.get(OTP_URL,{ headers });
    return resp;

  } catch (err) {
    console.log(err);
    return {
      data: {
        msg: "Can't send Otp"
      }, 
      status: "400"
    }
  }
};
