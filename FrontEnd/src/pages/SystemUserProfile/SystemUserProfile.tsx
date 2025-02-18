import { useState, useEffect } from "react";
import CustomNavbar from "../../molecules/Header/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SystemUserServices from "../../services/SystemUser";
import { Input, Button } from 'rsuite'
import './SystemUserProfile.style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail, validateName } from "../../helpers/InputValidations";

const SystemUserProfile = () => {
  const [firstNameN, setFirstName] = useState("");
  const [firstNameFlag, setFirstNameFlag] = useState(true);

  const [lastNameN, setLastName] = useState("");
  const [lastNameFlag, setLastNameFlag] = useState(true);

  const [emailN, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [dobN, setDob] = useState("");
  const [dobFlag, setDobFlag] = useState(false);

  const [prevObj, setPrevObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
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
      await SystemUserServices.SystemUserDashBoardRequest(token);
    
    const { firstName, lastName, email, dob } = responseOrgData.data.user
      
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setDob(dob)
    
    setPrevObj({firstName, lastName, email, dob})

  }

  const updateProfile = async () => {
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

    if(firstNameN !== prevObj.firstName || lastNameN !== lastNameN || emailN !== prevObj.email || dobN !== prevObj.dob){
        //Make Call
        console.log(prevObj);

        const updateUser = {
          isAdmin: false,
          firstName: firstNameN,
          lastName: lastNameN,
          email: emailN,
          password: "",
          dob: dobN,
          doj: ""
        }
  
        const response = await SystemUserServices.updateSystemUserData(prevObj.email, updateUser)
        console.log(response);
        
        if(response.status === 200){
          const msg = response.data.msg;
          toast.success(msg);
          Cookies.remove('accessToken')
          Cookies.remove('user')
          navigate('/')
        }
        else if(response.status === 205){
          const msg = response.data.msg;
          toast.error(msg);
        }
        else{
          toast.error("Something went wrong")
        }
    }
  }
  
  

  return(
    <>
      <CustomNavbar isVisible={true}/>
        <div className="header-profile">
          <h2>Profile</h2>
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




          <Button appearance="primary" onClick={updateProfile} size="lg" style={{width: 400}}>Update</Button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}


export default SystemUserProfile;
