import { useState } from "react";
import "./SystemUserLoginSignup.style.scss";

import { Button, Input, Divider } from "rsuite";
import WFHApplicationServices from "../../services/WfhApplication";
import { Props } from "./SystemUserLoginSignup.type";

const SignupSystemUserForm = ({ loginFlag, setLogin }: Props) => {
  const [firstNameVal, setFirstNameVal] = useState("");
  const [firstNameFlag, setFirstNameFlag] = useState(false);

  const [lastNameVal, setLastNameVal] = useState("");
  const [lastNameFlag, setLastNameFlag] = useState(false);

  const [emailVal, setEmailVal] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [passwordVal, setPasswordVal] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);

  const [dobVal, setDobVal] = useState("");
  const [dobFlag, setDobFlag] = useState(false);

  const setValueFirstName = (value: string) => {
    if (value === "") setFirstNameFlag(true);
    else setFirstNameFlag(false);

    setFirstNameVal(value);
  };
  const setValueLastName = (value: string) => {
    if (value === "") setLastNameFlag(true);
    else setLastNameFlag(false);

    setLastNameVal(value);
  };
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
  const setValueDob = (value: string) => {
    if (value === "") setDobFlag(true);
    else setDobFlag(false);

    setDobVal(value);
  };

  const signupReq = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if(firstNameVal === ''){
      setFirstNameFlag(true)
      return;
    }
    if(lastNameVal === ''){
      setLastNameFlag(true)
      return;
    }
    if(emailVal === ''){
      setEmailFlag(true)
      return
    }
    if(passwordVal === ''){
      setPasswordFlag(true)
      return;
    }
    if(dobVal === ''){
      setDobFlag(true)
      return;
    }


    const user = {
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      password: passwordVal,
      dob: dobVal,
    };

    //Api call from Services
    const data = await WFHApplicationServices.wFHApplicationSignupRequest(user);
    
    if(data.status === 200){
      alert(data.data.msg)
    }

  };

  return (
    <form>
      <div className="header-login">
        <h4>Signup System User</h4>
      </div><br />

      <div className="full-name">
        <div className="firstName">
          First Name
          <Input
            type={"text"}
            onChange={setValueFirstName}
          />
          <span className="error-msg" hidden={!firstNameFlag}>
            This input is required.
          </span>
          <br />
        </div>
        <div className="lastName">
          Last Name
          <Input
            type={"text"}
            onChange={setValueLastName}
          />
          <span className="error-msg" hidden={!lastNameFlag}>
            This input is required.
          </span>
          <br />
        </div>
      </div>
      <div className="input-body">
        Email
        <Input
          type={"email"}
          onChange={setValueEmail}
          name=""
        />
        <span className="error-msg" hidden={!emailFlag}>
          This input is required.
        </span>
        <br />
      </div>
      <div className="input-body">
        Password
        <Input
          type={"password"}
          onChange={setValuePass}
          name=""
        />
        <span className="error-msg" hidden={!passwordFlag}>
          This input is required.
        </span>
        <br />
      </div>
      <div className="input-body">
        Date of birth
        <Input
          type={"date"}
          onChange={setValueDob}
          name=""
        />
        <span className="error-msg" hidden={!dobFlag}>
          This input is required.
        </span>
      </div>

      <Button onClick={signupReq} appearance="primary">
        Signup
      </Button>

      <Divider>OR</Divider>
        <div className="footer-login">
        <span>
          Already a user?
      <Button
          
          onClick={() => {
            console.log("Login Click");

            setLogin(true);
          }}
          active
          appearance="link"
        >
          <strong>Login</strong>
        </Button>

        </span>
        </div>
    </form>
  );
};

export default SignupSystemUserForm;
