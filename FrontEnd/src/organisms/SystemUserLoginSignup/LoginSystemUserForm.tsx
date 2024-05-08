import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Form } from "rsuite";
import "./style.scss";
import Cookies from "js-cookie";
import { Input, Button } from "rsuite";
import { Props } from "./type";
import SystemUserServices from "../../services/SystemUser";
import OtpService from "../../services/SendMail";
import Toast from "../../atoms/Toast";

const LoginSystemUserForm = ({ loginFlag, setLogin }: Props) => {
  const navigate = useNavigate();

  const [emailVal, setEmailVal] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [passwordVal, setPasswordVal] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);

  const [otpVal, setOtpVal] = useState("");
  const [otpFlag, setOtpFlag] = useState(false);

  const setValueEmail = (value: string) => {
    setEmailVal(value);
    if (value === "") {
      setEmailFlag(true);
    } else {
      setEmailFlag(false);
    }
  };
  const setValuePass = (value: string) => {
    setPasswordVal(value);
    if (value === "") {
      setPasswordFlag(true);
    } else {
      setPasswordFlag(false);
    }
  };
  const setValueOtp = (value: string) => {
    setOtpVal(value);
    if (value === "") {
      setOtpFlag(true);
    } else {
      setOtpFlag(false);
    }
  };

  const returnToken = async (
    username: string,
    password: string,
    otp: string,
  ) => {
    const api = await SystemUserServices.SystemUserLoginRequest({
      email: username,
      password,
      otp,
    });
    console.log(api);
  };

  const submitReq = async () => {
    // if (!emailFlag || !passwordFlag || !otpFlag) {
    //   return;
    // }

    const user = {
      email: emailVal,
      password: passwordVal,
      otp: otpVal,
    };
    console.log(JSON.stringify(user));

    try {
      const data = await SystemUserServices.SystemUserLoginRequest(user);

      if (data.accessToken) {
        Cookies.set("accessToken", data.accessToken);
        console.log("Login Notify Call");

        navigate("/sysuser-dashboard");
      }
    } catch (err) {
      console.log("Can't login", err);
    }
  };

  const sendOtpReq = async () => {
    try {
      const resp = await OtpService.sendOtpReq({ emailVal });
      console.log("Otp Sent Sucessfylly", resp);
    } catch (err) {
      console.log("Can't send OTP.", err);
    }
  };

  return (
    <div className="form">
      <form>
        <div className="button-grp">
          <Button
            className={loginFlag ? "button-nav primary" : "button-nav default"}
            onClick={() => {
              console.log("Login Click");

              setLogin(true);
            }}
            active
          >
            Login
          </Button>
          <Button
            className={!loginFlag ? "button-nav primary" : "button-nav default"}
            onClick={() => {
              console.log("Signup Click");

              setLogin(false);
            }}
            active
          >
            Signup
          </Button>
        </div>
        <h3>System User</h3>

        <div className="input-body">
          <Input
            type={"email"}
            placeholder={"Email ID"}
            onChange={setValueEmail}
          />
          <span className="error-msg" hidden={!emailFlag}>
            This input is required.
          </span>
          <br />
        </div>

        <div className="input-body">
          <Input
            type={"password"}
            placeholder={"Password"}
            onChange={setValuePass}
          />
          <span className="error-msg" hidden={!passwordFlag}>
            This input is required.
          </span>
          <br />
        </div>

        <div className="input-body">
          <Input type={"text"} placeholder={"OTP"} onChange={setValueOtp} />
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
      </form>
    </div>
  );
};

export default LoginSystemUserForm;
