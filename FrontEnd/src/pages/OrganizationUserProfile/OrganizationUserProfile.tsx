import { useState, useEffect } from "react";
import CustomNavbar from "../../molecules/Header/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import OrganizationUserServices from "../../services/OrganizationUser";
import SystemUserServices from "../../services/SystemUser";
import { Input, Button } from 'rsuite'
import './OrganizationUserProfile.style.scss'
import { validateName, validateEmail } from "../../helpers/InputValidations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrganizationUserProfile = () => {
  const [firstNameN, setFirstName] = useState("");
  const [firstNameFlag, setFirstNameFlag] = useState(true);

  const [lastNameN, setLastName] = useState("");
  const [lastNameFlag, setLastNameFlag] = useState(true);

  const [emailN, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [dobN, setDob] = useState("");
  const [dobFlag, setDobFlag] = useState(false);

  const [dojN, setDoj] = useState("");
  const [dojFlag, setDojFlag] = useState(false);
  const [prevObj, setPrevObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    doj: ""
  })

  
  const setFirstNameValue = (value: string) => {
    setFirstName(value);
    validateName(value, setFirstNameFlag);
  };
  const setLastNameValue = (value: string) => {
    setLastName(value);
    validateName(value, setLastNameFlag);
  };
  const setEmailValue = (value: string) => {
    setEmail(value);
    validateEmail(value, setEmailFlag);
  };
  const setDobValue = (value: string) => {
    setDob(value);
    validateName(value, setDobFlag);
  };
  const setDojValue = (value: string) => {
    setDoj(value);
    validateName(value, setDojFlag);
  };

  const navigate = useNavigate()
  const [makeReq, setMakeReq] = useState(true);

  useEffect(()=> {
    const token: string | undefined = Cookies.get("accessToken");
    if (!token) {
      navigate("/");
    }
    if (makeReq) {
      if (typeof token === "string") {
        profileReq(token);
      }
      setMakeReq(false);
    }
  },[])

  const profileReq = async (token: string) => {
    const responseOrgData =
      await OrganizationUserServices.organizationUserRequest(token);
     
    const { firstName, lastName, email, password, dob, doj } = responseOrgData.data
      
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setDob(dob)
    setDoj(doj)
    
    setPrevObj({firstName, lastName, email, password, dob, doj})

  }

  const updateProfile = async (email: string) => {
    if (firstNameN === "") {
      setFirstNameFlag(false);
      return;
    }
    if (lastNameN === "") {
      setLastNameFlag(false);
      return;
    }
    if (emailN === "") {
      setEmailFlag(true);
      return;
    }
    if (dobN === "") {
      setDobFlag(true);
      return;
    }
    if (dojN === "") {
      setDojFlag(true);
      return;
    }
    
    if (
      firstNameN !== prevObj.firstName ||
      lastNameN !== prevObj.lastName ||
      emailN !== prevObj.email ||
      dobN !== prevObj.dob ||
      dojN !== prevObj.doj
    ) {
      //Make Call

      const updateUser = {
        isAdmin: false,
        firstName: firstNameN,
        lastName: lastNameN,
        email: emailN,
        password: "",
        dob: dobN,
        doj: dojN,
      };

      const response = await SystemUserServices.updateSystemUser(
        email,
        updateUser
      );
      
      if (response.status === 200) {
        toast.success("User Updated Sucessfully")
      }
      else{
        toast.error("User cannot updated! Something went Wrong")
      }
    }
  };
  
  

  return(
    <>
      <CustomNavbar isVisible={true}/>
      <div className="header-profile">
          <h2>Profile </h2>
        </div>
      <div className="profile-body">
        <div className="profile">

        <div className="name-grp profile-item">
            <div>
              <Input
                type="text"
                size="lg"
                value={firstNameN}
                style={{ width: 200 }}
                onChange={setFirstNameValue}
              />
              <span className="error-msg" hidden={firstNameFlag}>
                This input is required.
              </span>
            </div>
            <div>
              <Input
                type="text"
                size="lg"
                value={lastNameN}
                style={{ width: 200 }}
                onChange={setLastNameValue}
              />
              <span className="error-msg" hidden={lastNameFlag}>
                This input is required.
              </span>
            </div>
          </div>
          <div className="profile-item">
            Email
            <Input
              type="text"
              size="lg"
              value={emailN}
              style={{ width: 400 }}
              onChange={setEmailValue}
            />
            <span className="error-msg" hidden={!emailFlag}>
              This input is required.
            </span>
          </div>

          <div className="profile-item">
            Date of Birth
            <Input
              type="date"
              size="lg"
              value={dobN}
              style={{ width: 400 }}
              onChange={setDobValue}
            />
            <span className="error-msg" hidden={!dobFlag}>
              This input is required.
            </span>
          </div>

          <div className="profile-item">
            Date of Joining
            <Input
              type="date"
              size="lg"
              value={dojN}
              style={{ width: 400 }}
              onChange={setDojValue}
            />
            <span className="error-msg" hidden={!dojFlag}>
              This input is required.
            </span>
          </div>

          <Button appearance="primary" onClick={()=> {updateProfile(prevObj.email)}} size="lg" style={{width: 400}}>Update</Button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}


export default OrganizationUserProfile;
