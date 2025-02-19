//module
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Input, Divider } from "rsuite";

//service
import WFHApplicationServices from "../../services/WfhApplication";

//type
import { SystemUserSignupProps } from "./SystemUserLoginSignup.type";

//helper
import {validateEmail} from '../../helpers/InputValidations'

//css
import "./SystemUserLoginSignup.style.scss";
import 'react-toastify/dist/ReactToastify.css';

const SignupSystemUserForm = ({ setLogin }: SystemUserSignupProps) => {
  const currentDate = new Date().toISOString().split("T")[0];
  
  //state
  const [firstNameVal, setFirstNameVal] = useState("");
  const [firstNameFlag, setFirstNameFlag] = useState(false);

  const [lastNameVal, setLastNameVal] = useState("");
  const [lastNameFlag, setLastNameFlag] = useState(false);

  const [emailVal, setEmailVal] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [dobVal, setDobVal] = useState("");
  const [dobFlag, setDobFlag] = useState(false);

  //state setter
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
    validateEmail(value, setEmailFlag)
    setEmailVal(value);
  };
  const setValueDob = (value: string) => {
    setDobVal(value);
  };

  //Signup Request function
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
    if(dobVal === ''){
      setDobFlag(true)
      return;
    }


    const user = {
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      password: "",
      dob: dobVal,
    };

    //Api call from Services
    const data = await WFHApplicationServices.wFHApplicationSignupRequest(user);
    
    if(data.status === 200){
      toast.success("Account Created Sucessfully")
      setTimeout(() => {
        setLogin(true);
      }, 1000);
    }
    else if(data.name && data.name === "ZodError"){
      toast.error(data.issues[0].message)
    }
    else{
      toast.error("Account Creation Failed")
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
        Date of birth
        <Input
          type={"date"}
          onChange={setValueDob}
          max={currentDate}
        />
        <span className="error-msg" hidden={!dobFlag}>
          Invalid Date of Birth
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
        <ToastContainer />
    </form>
  );
};

export default SignupSystemUserForm;
