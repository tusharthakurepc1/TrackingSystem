import { useState } from "react";
import { Input, Button, ButtonGroup } from "rsuite";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import OrganizationUserServices from "../../services/OrganizationUser";
import { Props } from "./type";

const SignupOrganizationUserForm = ({ loginFlag, setLogin }: Props) => {
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

    console.log(data);
  };

  return (
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
      <h3>Organization User</h3>
      <div className="input-body">
        <Input
          type={"text"}
          placeholder={"First Name"}
          onChange={setValueFirstName}
        />
        <span className="error-msg" hidden={!firstNameFlag}>
          This input is required.
        </span>
        <br />
      </div>
      <div className="input-body">
        <Input
          type={"text"}
          placeholder={"Last Name"}
          onChange={setValueLastName}
        />
        <span className="error-msg" hidden={!lastNameFlag}>
          This input is required.
        </span>
        <br />
      </div>
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
        <Input
          type={"date"}
          placeholder={"Date of Birth"}
          onChange={setValueDob}
        />
        <span className="error-msg" hidden={!dobFlag}>
          This input is required.
        </span>
        <br />
      </div>
      <div className="input-body">
        <Input
          type={"date"}
          placeholder={"Date of Joining"}
          onChange={setValueDoj}
        />
        <span className="error-msg" hidden={!dojFlag}>
          This input is required.
        </span>
        <br />
      </div>

      <div className="input-body">
        <Input
          type={"text"}
          placeholder={"Organization Name"}
          onChange={setValueOrg}
        />
        <span className="error-msg" hidden={!orgFlag}>
          This input is required.
        </span>
        <br />
      </div>

      <Button onClick={signupReq} appearance="ghost">
        Signup
      </Button>
    </form>
  );
};

export default SignupOrganizationUserForm;
