import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Table, Button, SelectPicker, Pagination } from "rsuite";
import { SystemUserStructure, UserWithOrg } from "./DashBoardSystemUser.type";
import SystemUserServices from "../../services/SystemUser";
import { Message } from 'rsuite';
import "./DashboardSystemUser.style.scss";
import CustomNavbar from "../../molecules/HeaderSystemUser/HeaderSystemUser";
import socket from '../../socket'
import OrganizationUserProfileUpdate from "../OrganizationUserProfileUpdate/OrganizationUserProfileUpdate";

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
  const [updateData, setUpdateData] = useState<SystemUserStructure>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
  });

  const [formFlag, setFormFlag] = useState(false);
  const [totalData, setTotalData] = useState(10);
  const [userData, setUserData] = useState([]);
  const [makeReq, setMakeReq] = useState(true);
  const [organizationValue, setOrganizationValue] = useState("");
  const [flagUpdate, setFlagUpdate] = useState(false);

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const [userOrgList, setUserOrgList] = useState<[UserWithOrg]>([{email: "demo123@gmail.com", orgName: ""}]);

  useEffect(()=> {
    socket.on('hello', ()=> {
    console.log("Connection Hear");      
  })

  // const setValueOrganization = (value: string) => {
  //   console.log(userOrgList.find(
  //     (el)=> {
  //       return el.email === 'manasvi108@gmail.com'
  //     }
  //   ));
  // }
    

  const getUserData = async () => {
    const result = await SystemUserServices.SystemUserWithOffset(page, limit);
      // console.log("API response: ",result);
      setTotalData(result.totalData)
      setUserData(result.data)

      const tempData = result.data.map((el: any)=> ({email: el.email, orgName: ""}));
      setUserOrgList(tempData)
      console.log(tempData);
      

      // console.log(userOrgList.find(
      //   (el)=> {
      //     return el.email === 'manasvi108@gmail.com'
      //   }
      // ));

      
      
    }
    getUserData();

  }, [page, limit, flagUpdate])

  const dashboardReq = async (token: string) => {
    const response = await SystemUserServices.SystemUserDashBoardRequest(token);


    if (!response.data.user || !response.data.orgData) {
      return <h1> Page not found </h1>;
    }
    setAdminData(response.data.user);
  };


  const makeUserUpdate = async (data: User | any) => {
    if(!data){
      return;
    }
    let {firstName, lastName, email, password, dob} = data;

    setUpdateData({
      _id: "",
      firstName,
      lastName,
      email,
      password,
      dob
    })
    setFormFlag(true)

  }
  
  const deleteUser = async (data: User | any) => {
    if (!data) {
      console.log("Data undefined", data);
      return;
    }
    let { _id, email } = data;

    if (organizationValue === "Select" || !data.orgination_list.includes(organizationValue)) {
      return;
    }

    const response = await SystemUserServices.UserDelete({
      _id,
      email,
      organizationValue,
    });
    

    if(response.data.msg){
      alert(response.data.msg)
      setFlagUpdate(!flagUpdate)
    }
  };

  const makeUserAdmin = async (data: User | any) => {
    if (!data) {
      return;
    }
    
    let { email } = data;
    if (organizationValue === "Select" || !data.orgination_list.includes(organizationValue)) {
      return;
    }
    console.log(email, organizationValue);
    const response = await SystemUserServices.MakeUserAdminReq({
      email,
      organizationValue,
    });
    
    if(response.data.msg){
      alert(response.data.msg)
      setFlagUpdate(!flagUpdate);
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

{/* {userOrgList.length} */}
      <OrganizationUserProfileUpdate 
        firstName={updateData.firstName}
        lastName={updateData.lastName}
        email={updateData.email}
        password={updateData.password}
        dob={updateData.dob}
        formFlag={formFlag}
        setFormFlag={setFormFlag}
      />

      <div className="table-user">
        <Table data={userData}
          autoHeight={true}
        > 
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
          <Column align="center" flexGrow={1}>
            <HeaderCell> </HeaderCell>
            <Cell style={{ padding: "6px" }}>
            {(rowData) => ( 
              <Button
                appearance="ghost"
                onClick={() => {
                  makeUserUpdate(rowData)   
                }}
              >
                Update
              </Button>
              )}
            </Cell>
          </Column>
          <Column align="center" flexGrow={1}>
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
          <Column align="center" flexGrow={1}>
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
          layout={['total', '-', 'limit', '|', 'pager']}
          total={totalData}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={setLimit}
        />
      </div>  
    </>
  );
};

export default DashBoardSystemUser;
