import { useState, useEffect } from "react";
import { Table, Button, Pagination, Radio, RadioGroup, Panel } from "rsuite";
import { Modal, Input } from "rsuite";
import { validateName, validateEmail } from "../../helpers/InputValidations";

const { Column, HeaderCell, Cell } = Table;

//service
import SystemUserServices from "../../services/SystemUser";

//type
import { OrganizationUserStructure } from "./UsersManage.type";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersManage = () => {
  //states
  const [updateData, setUpdateData] = useState<OrganizationUserStructure>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    doj: "",
    organization_list: [""],
  });

  const [totalData, setTotalData] = useState(10);
  const [userData, setUserData] = useState([]);
  const [organizationValue, setOrganizationValue] = useState("");
  const [orgValFlag, setOrgValFlag] = useState(false);
  const [flagUpdate, setFlagUpdate] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  //model open state
  const [openEdit, setOpenEdit] = useState(false);
  const [openOrg, setOpenOrg] = useState(false);

  //state setter
  const setOrgValue = (value: string) => {
    if (value === "Select" || value === "") {
      setOrgValFlag(true);
    } else {
      setOrgValFlag(false);
    }
    setOrganizationValue(value);
  };

  useEffect(() => {
    const getUserData = async () => {
      const result = await SystemUserServices.SystemUserWithOffset(page, limit);
      setTotalData(result.totalData);
      setUserData(result.data);
    };
    getUserData();
  }, [page, limit, flagUpdate]);

  //Make the org user data updated
  const makeUserUpdate = async (data: User | any) => {
    if (!data) {
      return;
    }
    let { firstName, lastName, email, password, dob, doj, orgination_list } =
      data;

    setUpdateData({
      _id: "",
      firstName,
      lastName,
      email,
      password,
      dob,
      doj,
      organization_list: orgination_list,
    });
  };

  //Delete the organization user
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

  //Make the organization user admin
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
      toast.success(`${data.firstName} now admin of ${organizationValue}`);
      setFlagUpdate(!flagUpdate);
      handleOrgClose();
    } else {
      toast.error("Cannot make admin!!");
    }
    setOrganizationValue("");
  };

  //Handle Edit model
  const handleEditClose = () => {
    setOrganizationValue("");
    setOpenEdit(false);
  };

  //close the org model
  const handleOrgClose = () => {
    setOrganizationValue("");
    setOpenOrg(false);
  };

  //user details state
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
  const currentDate = new Date();
  const currentDateFormatted = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1
  }-${
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate()
  }`;

  useEffect(() => {
    setFirstName(updateData.firstName);
    setLastName(updateData.lastName);
    setEmail(updateData.email);
    setDob(updateData.dob);
    setDoj(updateData.doj);
  }, [
    updateData.firstName,
    updateData.lastName,
    updateData.email,
    updateData.dob,
    updateData.doj,
  ]);

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

    if (value > currentDateFormatted) {
      setDobFlag(true);
    } else {
      setDobFlag(false);
    }
  };
  const setDojValue = (value: string) => {
    setDoj(value);
    validateName(value, setDojFlag);
    if (value < dobN) {
      setDojFlag(true);
    } else {
      setDojFlag(false);
    }
  };

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
      firstNameN !== updateData.firstName ||
      lastNameN !== updateData.lastName ||
      emailN !== updateData.email ||
      dobN !== updateData.dob ||
      dojN !== updateData.doj
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
        toast.success("User Updated Sucessfully");
        handleEditClose();
        setFlagUpdate(!flagUpdate);
      } else {
        toast.error("User cannot updated! Something went Wrong");
      }
    }
  };

  return (
    <>
      <Panel header="Users Portal">
        <Table data={userData} autoHeight={true}>
          <Column flexGrow={1}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Date of Birth</HeaderCell>
            <Cell dataKey="dob" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Date of Joining</HeaderCell>
            <Cell dataKey="doj" />
          </Column>

          <Column width={120} align="center" fixed="right">
            <HeaderCell>Organization</HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="primary"
                  onClick={() => {
                    setOpenOrg(true);
                    makeUserUpdate(rowData);
                  }}
                >
                  Show
                </Button>
              )}
            </Cell>
          </Column>
          <Column width={80} fixed="right" align="center">
            <HeaderCell>...</HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="primary"
                  onClick={() => {
                    makeUserUpdate(rowData);
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </Button>
              )}
            </Cell>
          </Column>
        </Table>

        <br />

        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager"]}
          total={totalData}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={setLimit}
        />
      </Panel>

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
              {updateData.organization_list.map((org: string) => (
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

      {/* Modals for Edit*/}
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
            />
            <span className="error-msg" hidden={!dobFlag}>
              Invalid Date of Birth
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
              Invalid Date of Joining
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

      <ToastContainer />
    </>
  );
};

export default UsersManage;