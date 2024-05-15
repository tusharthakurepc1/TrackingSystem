import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SystemUserServices from "../../services/SystemUser";
import { Input, Button } from "rsuite";
import "./OrganizationUserProfileUpdate.style.scss";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  formFlag: boolean;
  setFormFlag: Function;
}

const OrganizationUserProfileUpdate = ({
  firstName,
  lastName,
  email,
  password,
  dob,
  formFlag,
  setFormFlag,
}: Props) => {
  const prevObj = { firstName, lastName, email, password, dob };
  
  const [firstNameN, setFirstName] = useState("");
  const [lastNameN, setLastName] = useState("");
  const [emailN, setEmail] = useState("");
  const [passwordN, setPassword] = useState("");
  const [dobN, setDob] = useState("");

  useEffect(()=>{
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setPassword(password)
    setDob(dob)
    
  }, [firstName, lastName, email, password, dob])

  const [passwordVisibleFlag, setPasswordVisibleFlag] = useState(false);

  const setFirstNameValue = (value: string) => {
    setFirstName(value);
  };
  const setLastNameValue = (value: string) => {
    setLastName(value);
  };
  const setEmailValue = (value: string) => {
    setEmail(value);
  };
  const setPasswordValue = (value: string) => {
    setPassword(value);
  };

  const navigate = useNavigate();

  const updateProfile = async () => {
    console.log(lastNameN);
    
    if (
      firstNameN !== firstName ||
      lastNameN !== lastName ||
      emailN !== email
    ) {
      //Make Call
      console.log(prevObj);

      const updateUser = {
        isAdmin: false,
        firstName: firstNameN,
        lastName: lastNameN,
        email: emailN,
        password: passwordN,
        dob: dobN,
      };

      const response = await SystemUserServices.updateSystemUser(
        prevObj.email,
        updateUser
      );
      if (response.status === 200) {
        alert(response.data.msg);
      }
    }
  };

  if (formFlag)
    return (
      <>
        <div className="background-float-form custom-update-style" >
          <div className="float-form">
            <div className="header-form">
              <h4>Update Form</h4>
            </div>

            <div className="name-grp profile-item">
              <Input
                type="text"
                size="lg"
                value={firstNameN}
                style={{ width: 200 }}
                onChange={setFirstNameValue}
              />
              <Input
                type="text"
                size="lg"
                value={lastNameN}
                style={{ width: 200 }}
                onChange={setLastNameValue}
              />
            </div>
            <Input
              type="text"
              size="lg"
              value={emailN}
              style={{ width: 400 }}
              className="profile-item"
              onChange={setEmailValue}
            />
            <div className="profile-item password-grp">
              {!passwordVisibleFlag ? (
                <>
                  <Input
                    type="password"
                    size="lg"
                    readOnly={true}
                    value={passwordN}
                    style={{ width: 350 }}
                    onChange={setPasswordValue}
                  />
                  <Button
                    startIcon={<FaEye />}
                    size="lg"
                    onClick={() => {
                      setPasswordVisibleFlag(true);
                    }}
                  />
                </>
              ) : (
                <>
                  <Input
                    type="text"
                    size="lg"
                    value={passwordN}
                    style={{ width: 350 }}
                    onChange={setPasswordValue}
                  />
                  <Button
                    startIcon={<FaEyeSlash />}
                    size="lg"
                    onClick={() => {
                      setPasswordVisibleFlag(false);
                    }}
                  />
                </>
              )}
            </div>
            <div className="fotter-form">
              <Button
                appearance="primary"
                onClick={updateProfile}
                size="lg"
                style={{ width: 400, marginBottom: 15 }}
              >
                Update
              </Button>
              <Button
                appearance="ghost"
                onClick={() => {
                  setFormFlag(false);
                }}
                size="lg"
                style={{ width: 400 }}
              >
                Close
              </Button>
            </div>

          </div>
        </div>
      </>
    );
};

export default OrganizationUserProfileUpdate;
