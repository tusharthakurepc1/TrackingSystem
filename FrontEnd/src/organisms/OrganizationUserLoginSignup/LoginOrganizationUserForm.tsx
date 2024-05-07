import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, ButtonGroup, Button } from "rsuite";
import "./style.scss";
import Cookie from "js-cookie";
import { Props } from "./type";
import OrganizationUserServices from "../../services/OrganizationUser";
import OtpService from "../../services/SendMail";



const LoginOrganizationUserForm = ({ setLogin }: Props) => {
  const navigate = useNavigate();
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [otpVal, setOtpVal] = useState("");

  const setValueEmail = (value: string) => {
    setEmailVal(value);
  };
  const setValuePass = (value: string) => {
    setPasswordVal(value);
  };
  const setValueOtp = (value: string) => {
    setOtpVal(value);
  };


  //Submit request to server
  const submitReq = async (event: any) => {
    event.preventDefault();
    const data = await OrganizationUserServices.organizationUserLoginRequest({email: emailVal, password: passwordVal, otp: otpVal})

    console.log(data);
    
    if (data.accessToken) {
      Cookie.set("accessToken", data.accessToken);
      navigate("/user-dashboard");
    }
    
  };

  //Otp request to server
  const sendOtpReq = async (event: any) => {
    event.preventDefault();
    await OtpService.sendOtpReq({emailVal})
  };

  
  return (
    <div className="form">
      <form>
        <ButtonGroup size="lg" justified style={{ marginBottom: 10 }}>
          <Button onClick={() => setLogin(true)} appearance="primary" active>
            Login
          </Button>
          <Button onClick={() => setLogin(false)} appearance="primary" active>
            Signup
          </Button>
        </ButtonGroup>
        <h3>Organization User</h3>
        <Input
          type={"email"}
          placeholder={"Email ID"}
          onChange={setValueEmail}
        />
        <br />
        <Input
          type={"password"}
          placeholder={"Password"}
          onChange={setValuePass}
        />
        <br />

        <Input type={"text"} placeholder={"OTP"} onChange={setValueOtp} />
        <br />
        <Button
          onClick={sendOtpReq}
          appearance="ghost"
          style={{ marginBottom: 10 }}
        >
          Send OTP
        </Button>

        <Button onClick={submitReq} appearance="ghost">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginOrganizationUserForm;
