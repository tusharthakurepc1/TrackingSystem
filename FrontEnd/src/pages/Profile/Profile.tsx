import { useState, useEffect } from "react";
import CustomNavbar from "../../molecules/Header/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import OrganizationUserServices from "../../services/OrganizationUser";
import { Input, Button } from 'rsuite'
import './Profile.style.scss'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


const Profile = () => {
  const [firstNameN, setFirstName] = useState("")
  const [lastNameN, setLastName] = useState("")
  const [emailN, setEmail] = useState("")
  const [passwordN, setPassword] = useState("")
  const [prevObj, setPrevObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [passwordVisibleFlag, setPasswordVisibleFlag] = useState(false);
  
  const setFirstNameValue = (value: string) => {
    setFirstName(value)
  }
  const setLastNameValue = (value: string) => {
    setLastName(value)
  }
  const setEmailValue = (value: string) => {
    setEmail(value)
  }
  const setPasswordValue = (value: string) => {
    setPassword(value)
  }

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
      
    
    const { firstName, lastName, email, password } = responseOrgData.user
      
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setPassword(password)
    
    setPrevObj({firstName, lastName, email, password})

  }

  const updateProfile = () => {
    // console.log(JSON.stringify(prevObj));
    if(firstNameN !== prevObj.firstName || lastNameN !== lastNameN || emailN !== prevObj.email){
        //Make Call
        console.log(prevObj);

    }


  }
  
  

  return(
    <>
      <CustomNavbar isVisible={true}/>
      <div className="profile-body">
        <div className="profile">

          

          <div className="name-grp profile-item" >
            <Input type="text" size="lg" value={firstNameN} style={{width: 200}} onChange={setFirstNameValue}/>
            <Input type="text" size="lg" value={lastNameN} style={{width: 200}} onChange={setLastNameValue}/>
          </div>
          <Input type="text" size="lg" value={emailN} style={{width: 400}} className="profile-item" onChange={setEmailValue}/>
          <div className="profile-item password-grp">
            {
              !passwordVisibleFlag? <>
                <Input type="password" size="lg" value={passwordN} style={{width: 350}} onChange={setPasswordValue}/>            
                <Button startIcon={<FaEye />} size="lg" onClick={()=> {setPasswordVisibleFlag(true)}}/>
              </>
              :
              <>
                <Input type="text" size="lg" value={passwordN} style={{width: 350}} onChange={setPasswordValue}/>
                <Button startIcon={<FaEyeSlash/>} size="lg" onClick={()=> {setPasswordVisibleFlag(false)}}/>
              </>
            }
          </div>

          <Button appearance="primary" onClick={updateProfile} size="lg" style={{width: 400}}>Update</Button>
        </div>
      </div>
    </>
  )
}


export default Profile;
