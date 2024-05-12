import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Table, Button, SelectPicker } from "rsuite";
import { UserStructure, SystemUserStructure } from "./DashBoardSystemUser.type";
import SystemUserServices from "../../services/SystemUser";
import { Message } from 'rsuite';
import "./DashboardSystemUser.style.scss";
import CustomNavbar from "../../molecules/Header/Header";

const { Column, HeaderCell, Cell } = Table;

const DashBoardSystemUser = () => {
  const [adminData, setAdminData] = useState<SystemUserStructure>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
  });
  const [userData, setUserData] = useState([]);
  const [makeReq, setMakeReq] = useState(true);
  const [organizationValue, setOrganizationValue] = useState("");
  const [user, setUser] = useState<User | any>();

  const dashboardReq = async (token: string) => {
    const response = await SystemUserServices.SystemUserDashBoardRequest(token);

    console.log(response.data);
    if (!response.data.user || !response.data.orgData) {
      return <h1> Page not found </h1>;
    }
    setAdminData(response.data.user);
    setUserData(response.data.orgData);
  };

  
  const deleteUser = async (data: User | any) => {
    if (!data) {
      console.log("Data undefined", data);
      return;
    }
    let { _id, email } = data;

    if (organizationValue === "Select") {
      return;
    }

    const response = await SystemUserServices.UserDelete({
      _id,
      email,
      organizationValue,
    });
    

    if(response.data.msg){
      alert(response.data.msg)
    }
    if (response.status === 200) {
      navigate("/temp");
    }
  };


  const makeUserAdmin = async (data: User | any) => {
    if (!data) {
      return;
    }
    
    let { email } = data;
    if (organizationValue === "Select") {
      return;
    }
    console.log(email, organizationValue);
    const response = await SystemUserServices.MakeUserAdminReq({
      email,
      organizationValue,
    });
    
    if(response.data.msg){
      alert(response.data.msg)
    }
  };

  const navigate = useNavigate();

  useEffect(()=> {
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
  }, [])


  return (
    <>
      <CustomNavbar isVisible={true}/>
      <Message>
        Welcome <strong>{adminData.firstName},</strong> you logged as a System User
      </Message>

      <div className="table-user">
        <Table data={userData}
          height={300}
        > 
          <Column width={100} align="center">
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={100} align="center">
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>
          <Column align="center">
            <HeaderCell>Date of Birth</HeaderCell>
            <Cell dataKey="dob" />
          </Column>
          <Column align="center">
            <HeaderCell>Date of Joining</HeaderCell>
            <Cell dataKey="doj" />
          </Column>
          <Column align="center">
            <HeaderCell>Organization</HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <SelectPicker
                  onChange={(value: string | undefined | void | null) => {
                    if (typeof value === "string") {
                      setOrganizationValue(value);
                    }
                    console.log(value);
                  }}
                  data={rowData.orgination_list.map((org: string) => ({
                    label: org,
                    value: org,
                  }))}
                ></SelectPicker>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell> </HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="ghost"
                  onClick={() => {
                    console.log(`${rowData}`);
                  }}
                >
                  Update
                </Button>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell> </HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="ghost"
                  onClick={() => {
                    makeUserAdmin(rowData);
                  }}
                >
                  Make Admin
                </Button>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell> </HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="ghost"
                  onClick={() => {
                    deleteUser(rowData);
                  }}
                >
                  Delete
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    </>
  );
};

export default DashBoardSystemUser;
