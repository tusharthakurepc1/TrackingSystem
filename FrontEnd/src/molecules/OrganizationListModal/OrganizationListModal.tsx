//module
import { useState } from "react";
import { Button, Modal, RadioGroup, Radio } from "rsuite";
import { OrganizationListModelProps } from "./OrganizationListModal.type";
import { ToastContainer, toast } from 'react-toastify';

//service
import SystemUserServices from "../../services/SystemUser";

//css
import 'react-toastify/dist/ReactToastify.css';


const OrganizationListModal = ({openOrg, setOpenOrg, flagUpdate, setFlagUpdate, updateData}: OrganizationListModelProps) => {
  //states
  // const [openOrg, setOpenOrg] = useState(false);
  const [organizationValue, setOrganizationValue] = useState("");
  const [orgValFlag, setOrgValFlag] = useState(false);

  
  const handleOrgClose = () => {
    setOrganizationValue("");
    setOpenOrg(false);
  };

  //state setter
  const setOrgValue = (value: string) => {
    if (value === "Select" || value === "") {
      setOrgValFlag(true);
    } else {
      setOrgValFlag(false);
    }
    setOrganizationValue(value);
  };


  const makeUserAdmin = async (data: User | any) => {
    if (organizationValue === "" || organizationValue === "Select") {
      setOrgValFlag(true);
      return;
    }
    if (!data) {
      toast.error("Can't find data");
    }

    console.log(data);

    let { email } = data;
    if (
      organizationValue === "Select" ||
      !data.organization_list.includes(organizationValue)
    ) {
      return;
    }
    console.log(email, organizationValue);
    const response = await SystemUserServices.MakeUserAdminReq({
      email,
      organizationValue,
    });

    console.log(response);

    if (response.status === 200) {
      // toast.success(`${data.firstName} now admin of ${organizationValue}`);
      
      // handleOrgClose();
      // setFlagUpdate(!flagUpdate);
    } else {
      toast.error("Cannot make admin!!");
    }
    setOrganizationValue("");
  };

  const deleteUser = async (data: User | any) => {
    if (organizationValue === "" || organizationValue === "Select") {
      setOrgValFlag(true);
      return;
    }
    if (!data) {
      toast.error("Can't find data");
    }

    let { _id, email } = data;

    console.log(data.organization_list);

    if (
      organizationValue === "Select" ||
      !data.organization_list.includes(organizationValue)
    ) {
      return;
    }

    const response = await SystemUserServices.UserDelete({
      _id,
      email,
      organizationValue,
    });

    console.log(response);

    if (response.status === 200) {
      toast.success(
        `${data.firstName} deleted sucessfully from ${organizationValue}`
      );
      handleOrgClose();
      setFlagUpdate(!flagUpdate);
    } else {
      toast.error("Deleted Unsucessfully!!");
    }
    setOrganizationValue("");
  };

  return (
    <>
      {/* Modal for Organization List */}
      <Modal overflow={true} open={openOrg} onClose={handleOrgClose}>
        <Modal.Header>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile-item">
            <RadioGroup
              name="radio-group"
              value={organizationValue}
              onChange={setOrgValue}
            >
              {updateData && updateData.organization_list.map((org: string) => (
                <Radio key={org} value={org}>
                  {org}
                </Radio>
              ))}
            </RadioGroup>
            <span className="error-msg" hidden={!orgValFlag}>
              This input is required.
            </span>
          </div>
          <Button
            style={{ marginLeft: 20 }}
            appearance="primary"
            onClick={() => {
              makeUserAdmin(updateData);
            }}
          >
            Make Admin
          </Button>

          <Button
            style={{ marginLeft: 20 }}
            appearance="primary"
            color="red"
            onClick={() => {
              deleteUser(updateData);
            }}
          >
            Delete
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOrgClose} appearance="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

{/* <OrganizationListModal openOrg={openOrg} setOpenOrg={setOpenOrg} updateData={updateData} flagUpdate={flagUpdate} setFlagUpdate={setUpdateData}  /> */}


export default OrganizationListModal;
