import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SystemUserLoginSignup.style.scss";
import Cookies from "js-cookie";
import { Input, Button, Divider } from "rsuite";
import { Props } from "./SystemUserLoginSignup.type";
import SystemUserServices from "../../services/SystemUser";
import OtpService from "../../services/SendMail";
import {validateEmail} from '../../helpers/InputValidations'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SystemUserLoginSignup.style.scss";

const LoginSystemUserForm = ({ setLogin }: Props) => {
  const navigate = useNavigate();

  const [emailVal, setEmailVal] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [otpVal, setOtpVal] = useState("");
  const [otpFlag, setOtpFlag] = useState(false);

  const setValueEmail = (value: string) => {
    setEmailVal(value);
    validateEmail(value, setEmailFlag)
  };
  
  const setValueOtp = (value: string) => {
    const inputValue = value;
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 6);
    setOtpVal(truncatedValue);

    if (value === "") {
      setOtpFlag(true);
    } else {
      setOtpFlag(false);
    }
  };

  const returnToken = async (
    username: string,
    password: string,
    otp: string
  ) => {
    const api = await SystemUserServices.SystemUserLoginRequest({
      email: username,
      password,
      otp,
    });
    console.log(api);
  };

  const submitReq = async () => {
    if (emailVal === "") {
      setEmailFlag(true);
      return;
    }

    if (otpVal === "") {
      setOtpFlag(true);
      return;
    }

    const user = {
      email: emailVal,
      password: "",
      otp: otpVal,
    };

    const data = await SystemUserServices.SystemUserLoginRequest(user);
    
    if (data.data && data.accessToken) {
      toast.success("Login Sucessfull")
      setTimeout(() => {
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("user", data.user);
        navigate("/sysuser-dashboard");
      }, 1000);
    }

    if(!data.data){
      toast.error("Invalid Credentials")
    }

    
  };

  const sendOtpReq = async () => {
    if (emailVal === "") {
      setEmailFlag(true);
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
          <h4>Login System User</h4>
        </div>
        <br></br>

        <div className="input-body">
          Email
          <Input
            type={"email"}
            onChange={setValueEmail}
          />
          <span className="error-msg" hidden={!emailFlag}>
            This input is required.
          </span>
          <br />
        </div>

        <div className="input-body">
          Otp
          <Input type={"number"} value={otpVal} onChange={setValueOtp} />
          <span className="error-msg" hidden={!otpFlag}>
            This input is required.
          </span>
          <br />
        </div>

        <Button
          onClick={sendOtpReq}
          appearance="ghost"
          active
          style={{ marginBottom: 10 }}
        >
          Send OTP
        </Button>

        <Button onClick={submitReq} appearance="primary" active>
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
              <strong>Signup</strong>
            </Button>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginSystemUserForm;
