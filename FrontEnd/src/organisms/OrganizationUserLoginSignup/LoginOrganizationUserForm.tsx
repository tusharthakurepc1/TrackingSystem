import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Divider } from "rsuite";
import "./OrganizationUserLoginSignup.style.scss";
import Cookies from "js-cookie";
import { Props } from "./OrganizationUserLoginSignup.type";
import OrganizationUserServices from "../../services/OrganizationUser";
import OtpService from "../../services/SendMail";
import { validateEmail, validateOtp } from "../../helpers/InputValidations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    setEmailVal(value);
    validateEmail(value, setEmailFlag);
  };
  const setValuePass = (value: string) => {
    if (value === "") setPasswordFlag(true);
    else setPasswordFlag(false);

    setPasswordVal(value);
  };
  const setValueOtp = (value: string) => {
    
    if (value === "") {
      setOtpFlag(true);
    } else {
      setOtpFlag(false);
    }
    validateOtp(value, setOtpVal)
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
    
    
    if (data.data && data.accessToken) {
      toast.success("Login Sucessfull")
      setTimeout(() => {
        Cookies.set("accessToken", data.accessToken);
        navigate("/user-dashboard");
      }, 1000);
    }

    if(!data.data){
      toast.error("Invalid Credentials")
    }
  };

  //Otp request to server
  const sendOtpReq = async () => {
    if (emailVal === "") {
      setEmailFlag(true);
      return;
    }
    if (passwordVal === "") {
      setPasswordFlag(true);
      return;
    }

    const result = await OtpService.sendOtpReq({ emailVal });
    console.log(result);
    if(result && result.status === 200){
      toast.success("Check your mail")
    }
    else{
      toast.error("Invalid Email!!!")
    }
    
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
          <Input type={"number"} value={otpVal} onChange={setValueOtp} />
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
      <ToastContainer />
    </div>
  );
};

export default LoginOrganizationUserForm;
