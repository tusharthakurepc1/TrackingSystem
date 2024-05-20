//module
import { useState, useEffect } from "react";
import { Button, Dropdown } from "rsuite";
import "./EditPanel.style.scss";

//type
import { EditPanelProps } from "./EditPanel.type";

const EditPanel = ({
  firstName,
  lastName,
  email,
  password,
  dob,
  organizationList,
  editFlag,
  setEditFlag,
}: EditPanelProps) => {

  //state
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
