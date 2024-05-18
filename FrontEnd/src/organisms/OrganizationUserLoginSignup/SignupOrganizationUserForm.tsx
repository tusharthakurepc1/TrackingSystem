//module
import { useState } from "react";
import { Input, Button, Divider } from "rsuite";
import { ToastContainer, toast } from 'react-toastify';

//service
import OrganizationUserServices from "../../services/OrganizationUser";

//helper
import { validateEmail, validateName } from "../../helpers/InputValidations";

//types
import { LoginOrganisationProps } from "./OrganizationUserLoginSignup.type";

//css
import "./OrganizationUserLoginSignup.style.scss";
import 'react-toastify/dist/ReactToastify.css';


const SignupOrganizationUserForm = ({ setLogin }: LoginOrganisationProps) => {

  //state
  const [firstNameVal, setFirstNameVal] = useState("");
  const [firstNameFlag, setFirstNameFlag] = useState(true);

  const [orgVal, setOrgVal] = useState("");
  const [orgFlag, setOrgFlag] = useState(true);

  const [lastNameVal, setLastNameVal] = useState("");
  const [lastNameFlag, setLastNameFlag] = useState(true);

  const [emailVal, setEmailVal] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [dobVal, setDobVal] = useState("");
  const [dobFlag, setDobFlag] = useState(false);

  const [dojVal, setDojVal] = useState("");
  const [dojFlag, setDojFlag] = useState(false);


  //state setter
  const setValueFirstName = (value: string) => {
    validateName(value, setFirstNameFlag)
    setFirstNameVal(value);
  };
  const setValueLastName = (value: string) => {
    validateName(value, setLastNameFlag)
    setLastNameVal(value);
  };
  const setValueOrg = (value: string) => {
    validateName(value, setOrgFlag)
    setOrgVal(value);
  };
  const setValueEmail = (value: string) => {
    validateEmail(value, setEmailFlag)
    setEmailVal(value);
  };
  const setValueDob = (value: string) => {
    validateName(value, setDobFlag)
    setDobVal(value);
  };
  const setValueDoj = (value: string) => {
    validateName(value, setDojFlag)
    setDojVal(value);
  };

  //Signup Request function
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
      isActive: false,
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      password: "",
      dob: dobVal,
      doj: dojVal,
    };

    console.log(JSON.stringify(user));

    const data =
      await OrganizationUserServices.organizationUserSignupRequest(user);

    if(data.status === 200){
      toast.success(data.msg)
      setTimeout(() => {
        setLogin(true);
      }, 1000);
    }
    else{
      toast.error("Account Creation Failed")
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
          <span className="error-msg" hidden={firstNameFlag}>
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
          <span className="error-msg" hidden={lastNameFlag}>
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
          Invalid Email
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
        <span className="error-msg" hidden={orgFlag}>
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

        <ToastContainer />
    </form>
  );
};

export default SignupOrganizationUserForm;