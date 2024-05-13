import { useState } from "react";
import { Input, Button, Divider } from "rsuite";
import "./OrganizationUserLoginSignup.style.scss";
import { useNavigate } from "react-router-dom";
import OrganizationUserServices from "../../services/OrganizationUser";
import { Props } from "./OrganizationUserLoginSignup.type";


const SignupOrganizationUserForm = ({ setLogin }: Props) => {
  const navigate = useNavigate();

  const [firstNameVal, setFirstNameVal] = useState("");
  const [firstNameFlag, setFirstNameFlag] = useState(false);

  const [orgVal, setOrgVal] = useState("");
  const [orgFlag, setOrgFlag] = useState(false);

  const [lastNameVal, setLastNameVal] = useState("");
  const [lastNameFlag, setLastNameFlag] = useState(false);

  const [emailVal, setEmailVal] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [passwordVal, setPasswordVal] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);

  const [dobVal, setDobVal] = useState("");
  const [dobFlag, setDobFlag] = useState(false);

  const [dojVal, setDojVal] = useState("");
  const [dojFlag, setDojFlag] = useState(false);

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
  const setValueOrg = (value: string) => {
    if (value === "") setOrgFlag(true);
    else setOrgFlag(false);

    setOrgVal(value);
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
  const setValueDoj = (value: string) => {
    if (value === "") setDojFlag(true);
    else setDobFlag(false);

    setDojVal(value);
  };

  const signupReq = async () => {

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
    if(dojVal === ''){
      setDojFlag(true)
      return;
    }
    if(orgVal === ''){
      setOrgFlag(true)
      return;
    }


    const user = {
      _orginizationName: orgVal,
      isAdmin: false,
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      password: passwordVal,
      dob: dobVal,
      doj: dojVal,
    };

    console.log(JSON.stringify(user));

    const data =
      await OrganizationUserServices.organizationUserSignupRequest(user);

    if(data.status === 200){
      setLogin(true);
      
    }
  };

  return (
    <form>
      <div className="header-login">
        <h4>Signup Organization User</h4>
      </div>
      <br />
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
      <div className="input-login">
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
        Password
        <Input
          type={"password"}
          onChange={setValuePass}
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
        />
        <span className="error-msg" hidden={!dobFlag}>
          This input is required.
        </span>
        <br />
      </div>
      <div className="input-body">
        Date of Joining
        <Input
          type={"date"}
          onChange={setValueDoj}
          onFocus={function () {
            
          }}
        />
        <span className="error-msg" hidden={!dojFlag}>
          This input is required.
        </span>
        <br />
      </div>

      <div className="input-body">
        Organization
        <Input
          type={"text"}
          onChange={setValueOrg}
        />
        <span className="error-msg" hidden={!orgFlag}>
          This input is required.
        </span>
        <br />
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
          Login
        </Button>
        </span>
        </div>

      
    </form>
  );
};

export default SignupOrganizationUserForm;