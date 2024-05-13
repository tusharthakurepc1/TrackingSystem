import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Divider } from "rsuite";
import "./OrganizationUserLoginSignup.style.scss";
import Cookies from "js-cookie";
import { Props } from "./OrganizationUserLoginSignup.type";
import OrganizationUserServices from "../../services/OrganizationUser";
import OtpService from "../../services/SendMail";
import "./OrganizationUserLoginSignup.style.scss";

const LoginOrganizationUserForm = ({ loginFlag, setLogin }: Props) => {
  const navigate = useNavigate();

  const [emailVal, setEmailVal] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [passwordVal, setPasswordVal] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);

  const [otpVal, setOtpVal] = useState("");
  const [otpFlag, setOtpFlag] = useState(false);

  const setValueEmail = (value: string) => {
    if (value === "") setEmailFlag(true);
    else setEmailFlag(false);

    setEmailVal(value);
  };
  const setValuePass = (value: string) => {
    if (value === "") setPasswordFlag(true);
    else setPasswordFlag(false);

    setPasswordVal(value);
  };
  const setValueOtp = (value: string) => {
    if (value === "") setOtpFlag(true);
    else setOtpFlag(false);

    setOtpVal(value);
  };

  //Submit request to server
  const submitReq = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (emailVal === "") {
      setEmailFlag(true);
      return;
    }
    if (passwordVal === "") {
      setPasswordFlag(true);
      return;
    }
    if (otpVal === "") {
      setPasswordFlag(true);
      return;
    }

    const data = await OrganizationUserServices.organizationUserLoginRequest({
      email: emailVal,
      password: passwordVal,
      otp: otpVal,
    });
    
    console.log(data.accessToken);
    

    if(!data.data){
      alert("Invalid Credentials");
    }
    if (data.data && data.accessToken) {
      Cookies.set("accessToken", data.accessToken);
      navigate("/user-dashboard");
    }
  };

  //Otp request to server
  const sendOtpReq = async () => {
    await OtpService.sendOtpReq({ emailVal });
  };

  return (
    <div className="form">
      <form>
        <div className="header-login">
          <h4>Login Organization User</h4>
        </div>
        <br />
        <div className="input-body">
          Email
          <Input type={"email"} onChange={setValueEmail} />
          <span className="error-msg" hidden={!emailFlag}>
            This input is required.
          </span>
          <br />
        </div>
        <div className="input-body">
          Password
          <Input type={"password"} onChange={setValuePass} />
          <span className="error-msg" hidden={!passwordFlag}>
            This input is required.
          </span>
          <br />
        </div>
        Otp
        <div className="input-body">
          <Input type={"text"} onChange={setValueOtp} />
          <span className="error-msg" hidden={!otpFlag}>
            This input is required.
          </span>
        </div>
        <Button
          onClick={sendOtpReq}
          appearance="ghost"
          style={{ marginBottom: 10 }}
        >
          Send OTP
        </Button>
        <Button onClick={submitReq} appearance="primary">
          Login
        </Button>
        <Divider>OR</Divider>
        <div className="footer-login">
        <span>
          Need an account?
          <Button
            onClick={() => {
              console.log("Signup Click");
              setLogin(false);
            }}
            active
            appearance="link"
          >
            <strong>Sign up</strong>
          </Button>
        </span>
        </div>
      </form>
    </div>
  );
};

export default LoginOrganizationUserForm;
