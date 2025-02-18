//module
import { useState, useEffect } from "react";
import { Modal, Input, Button } from "rsuite";
import { toast } from "react-toastify";

//service
import SystemUserServices from "../../services/SystemUser";

//type
import { OrganizationUserEditModelProps } from "./OrganizationUserEditModal.type";

//import
import { validateName, validateEmail } from "../../helpers/InputValidations";

//css
import "react-toastify/dist/ReactToastify.css";

const OrganizationUserEditModal = ({
  openEdit,
  setOpenEdit,
  flagUpdate,
  setFlagUpdate,
  updateData,
}: OrganizationUserEditModelProps) => {
  //states
  const [firstNameN, setFirstName] = useState("");
  const [firstNameFlag, setFirstNameFlag] = useState(true);

  const [lastNameN, setLastName] = useState("");
  const [lastNameFlag, setLastNameFlag] = useState(true);

  const [emailN, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [dobN, setDob] = useState("");
  const [dobFlag, setDobFlag] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];

  //user details state setter
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

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  //update the User Profile
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

    if (
      firstNameN !== updateData.firstName ||
      lastNameN !== updateData.lastName ||
      emailN !== updateData.email ||
      dobN !== updateData.dob
    ) {
      //Make Call

      const updateUser = {
        isAdmin: false,
        firstName: firstNameN,
        lastName: lastNameN,
        email: emailN,
        password: "",
        dob: dobN,
        doj: ""
      };

      const response = await SystemUserServices.updateSystemUser(
        email,
        updateUser
      );
      if (response.status === 200) {
        toast.success("User Updated Sucessfully");
        handleEditClose();
        setFlagUpdate(!flagUpdate);
      } 
      else if(response.name && response.name === "ZodError"){
        toast.error(response.issues[0].message)
      }
      else {
        toast.error("User cannot updated! Something went Wrong");
      }
    }
  };

  useEffect(() => {
    setFirstName(updateData.firstName);
    setLastName(updateData.lastName);
    setEmail(updateData.email);
    setDob(updateData.dob);
  }, [
    updateData.firstName,
    updateData.lastName,
    updateData.email,
    updateData.dob,
  ]);

  return (
    <>
      <Modal overflow={false} open={openEdit} onClose={handleEditClose}>
        <Modal.Header>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="name-grp profile-item">
            <div style={{ marginRight: 20 }}>
              First Name
              <Input
                type="text"
                size="lg"
                value={firstNameN}
                style={{ width: 190 }}
                onChange={setFirstNameValue}
              />
              <span className="error-msg" hidden={firstNameFlag}>
                This input is required.
              </span>
            </div>
            <div>
              Last Name
              <Input
                type="text"
                size="lg"
                value={lastNameN}
                style={{ width: 190 }}
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
              max={currentDate}
            />
            <span className="error-msg" hidden={!dobFlag}>
              Invalid Date of Birth
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            appearance="primary"
            onClick={() => {
              updateProfile(updateData.email);
            }}
          >
            Update
          </Button>
          <Button onClick={handleEditClose} appearance="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrganizationUserEditModal;
