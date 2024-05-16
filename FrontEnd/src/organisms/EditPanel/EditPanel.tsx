import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SystemUserServices from "../../services/SystemUser";
import { Input, Button, Dropdown } from "rsuite";
import "./EditPanel.style.scss";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  organizationList: [string];
  editFlag: boolean;
  setEditFlag: Function;
}

const EditPanel = ({
  firstName,
  lastName,
  email,
  password,
  dob,
  organizationList,
  editFlag,
  setEditFlag,
}: Props) => {

  const [organizationListN, setOrganizationListN] = useState([''])
  
  useEffect(()=>{
    console.log(organizationList);
    
    setOrganizationListN(organizationList);
  }, organizationList)
  
  

  if (editFlag)
    return (
      <>
        <div className="background-float-form custom-update-style" >
          <div className="float-form">
            <div className="header-form">
              <h4>Edit</h4>
            </div>

            <Dropdown data={organizationListN.map(
              item => ({ label: item, value: item })
            )}>

            </Dropdown>
            
            <div className="fotter-form">
              <Button
                appearance="ghost"
                onClick={() => {
                  setEditFlag(false);
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

export default EditPanel;
