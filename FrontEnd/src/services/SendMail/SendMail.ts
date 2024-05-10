import axios from "axios";
import { OtpPayload } from "./SendMail.type";

export const sendOtpReq = async ({ emailVal }: OtpPayload) => {
  const OTP_URL = "http://localhost:5500/mail";

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const resp = await axios.post(
      OTP_URL,
      JSON.stringify({ email: emailVal }),
      { headers },
    );
    console.log("Otp Sent Sucessfylly", resp);
    alert("Please Check You Mail ");
  } catch (err) {
    console.log(err);
    alert("Invalid Email! Can't send OTP");
    return "Can't send OTP.";
  }
};
