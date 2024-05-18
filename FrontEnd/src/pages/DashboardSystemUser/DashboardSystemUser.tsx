import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Pagination,
  Radio, 
  RadioGroup
} from "rsuite";
import {
  OrganizationUserStructure,
  SystemUserStructure,
} from "./DashBoardSystemUser.type";
import SystemUserServices from "../../services/SystemUser";
import { Message } from "rsuite";
import "./DashboardSystemUser.style.scss";
import CustomNavbar from "../../molecules/HeaderSystemUser/HeaderSystemUser";
import socket from "../../socket";
const { Column, HeaderCell, Cell } = Table;
import { Modal, Input } from "rsuite";
import { validateEmail, validateName } from "../../helpers/InputValidations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashBoardSystemUser = () => {
  const [adminData, setAdminData] = useState<SystemUserStructure>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    organization_list: [""],
  });
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
  const [makeReq, setMakeReq] = useState(true);
  const [organizationValue, setOrganizationValue] = useState("");
  const [orgValFlag, setOrgValFlag] = useState(false)
  const flagUpdate = false;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // const [userOrgList, setUserOrgList] = useState<[UserWithOrg]>([
  //   { email: "demo123@gmail.com", orgName: "" },
  // ]);

  const setOrgValue = (value: string) => {
    if(value === 'Select' || value === ''){
      setOrgValFlag(true);
    }
    else{
      setOrgValFlag(false);
    }
    setOrganizationValue(value);
  }

  useEffect(() => {
    socket.on("hello", () => {
      console.log("Connection Hear");
    });

    const getUserData = async () => {
      const result = await SystemUserServices.SystemUserWithOffset(page, limit);

      setTotalData(result.totalData);
      setUserData(result.data);

      //   (el)=> {
      //     return el.email === 'manasvi108@gmail.com'
      //   }
      // ));
    };
    getUserData();
  }, [page, limit, flagUpdate]);

  const dashboardReq = async (token: string) => {
    const response = await SystemUserServices.SystemUserDashBoardRequest(token);

    if (!response.data.user || !response.data.orgData) {
      return <h1> Page not found </h1>;
    }
    setAdminData(response.data.user);
  };

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

  const deleteUser = async (data: User | any) => {
    if(organizationValue === '' || organizationValue === 'Select'){
      setOrgValFlag(true)
      return;
    }
    if (!data) {
      toast.error("Can't find data")
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
    
    if(response.status === 200){
      toast.success(`${data.firstName} deleted sucessfully from ${organizationValue}`)
    }
    else{
      toast.error("Deleted Unsucessfully!!")
    }
    setOrganizationValue("")
  };

  const makeUserAdmin = async (data: User | any) => {
    if(organizationValue === '' || organizationValue === 'Select'){
      setOrgValFlag(true)
      return;
    }
    if (!data) {
      toast.error("Can't find data")
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
    
    if(response.status === 200){
      toast.success(`${data.firstName} now admin of ${organizationValue}`)
    }
    else{
      toast.error("Cannot make admin!!")
    }
    setOrganizationValue("")
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token: string | undefined = Cookies.get("accessToken");

    if (!token) {
      navigate("/sysuser-login");
    }
    if (makeReq) {
      if (typeof token === "string") {
        dashboardReq(token);
      }
      setMakeReq(false);
    }
  }, []);

  const [openEdit, setOpenEdit] = useState(false);
  const handleEditClose = () => {
    setOrganizationValue("")
    setOpenEdit(false);
  }

  const [openOrg, setOpenOrg] = useState(false);
  const handleOrgClose = () => {
    setOrganizationValue("")
    setOpenOrg(false);
  }

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
        toast.success("User Updated Sucessfully")
      }
      else{
        toast.error("User cannot updated! Something went Wrong")
      }
    }
  };

  return (
    <>
      <CustomNavbar isVisible={true} />
      <Message>
        Welcome <strong>{adminData.firstName},</strong> you logged as a System
        User
      </Message>

      {/* Model for Organization List */}
      <Modal overflow={true} open={openOrg} onClose={handleOrgClose}>
        <Modal.Header>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {organizationValue} */}
          <div className="profile-item">
            <RadioGroup name="radio-group" value={organizationValue} onChange={setOrgValue}>
              {
                updateData.organization_list.map((org: string) => <Radio key={org} value={org}>{org}</Radio>)
              }
            </RadioGroup>
            <span className="error-msg" hidden={!orgValFlag}>
              This input is required.
            </span>
          </div>
          <Button
            style={{marginLeft: 20}}
            appearance="primary"
            onClick={()=> {makeUserAdmin(updateData)}}
          > 
            Make Admin
          </Button>

          <Button
            style={{marginLeft: 20}}
            appearance="primary"
            color="red"
            onClick={()=> {deleteUser(updateData)}}
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
      <Modal overflow={true} open={openEdit} onClose={handleEditClose}>
        <Modal.Header>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

                
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" onClick={()=> {updateProfile(updateData.email)}}>
            Update
          </Button>
          <Button onClick={handleEditClose} appearance="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="table-user">
        <Table data={userData} autoHeight={true}>
          <Column align="center" flexGrow={1}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column align="center" flexGrow={1}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column align="center" flexGrow={1}>
            <HeaderCell>Date of Birth</HeaderCell>
            <Cell dataKey="dob" />
          </Column>
          <Column align="center" flexGrow={1}>
            <HeaderCell>Date of Joining</HeaderCell>
            <Cell dataKey="doj" />
          </Column>
          
          <Column align="center" flexGrow={1}>
            <HeaderCell>Organization</HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                appearance="primary"
                onClick={() => {
                  setOpenOrg(true)
                  makeUserUpdate(rowData);
                }}
              >
                Show
              </Button>
                
              )}
            </Cell>
          </Column>
          <Column align="center" flexGrow={1}>
            <HeaderCell> </HeaderCell>
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
      </div>
      <ToastContainer />
    </>
  );
};

export default DashBoardSystemUser;
