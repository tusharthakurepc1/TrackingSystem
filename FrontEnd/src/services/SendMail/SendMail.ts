import axios from "axios";
import { OtpPayload } from "./SendMail.type";

export const sendOtpReq = async ({ emailVal }: OtpPayload) => {
  const OTP_URL = "http://localhost:5500/mail/"+emailVal;

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const resp = await axios.get(OTP_URL,{ headers });
    
    console.log("Otp Sent Sucessfylly", resp);
    alert("Please Check You Mail ");
  } catch (err) {
    console.log(err);
    alert("Invalid Email! Can't send OTP");
    return "Can't send OTP.";
  }
};
