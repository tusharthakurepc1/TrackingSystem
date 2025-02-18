//module
import { useState, useEffect } from "react";
import { Table, Button, Pagination, Panel } from "rsuite";
import { ToastContainer } from 'react-toastify'
const { Column, HeaderCell, Cell } = Table;

//service
import SystemUserServices from "../../services/SystemUser";

//type
import { OrganizationUserStructure } from "./UsersManage.type";

//import
import OrganizationListModal from "../../molecules/OrganizationListModal";
import OrganizationUserEditModal from "../../molecules/OrganizationUserEditModal";

//css
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
    organization_list: [],
  });

  const [totalData, setTotalData] = useState(10);
  const [userData, setUserData] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  //model open state
  const [openEdit, setOpenEdit] = useState(false);
  const [openOrg, setOpenOrg] = useState(false);


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
    let { firstName, lastName, email, password, dob, organization_list } =
      data;

    setUpdateData({
      _id: "",
      firstName,
      lastName,
      email,
      password,
      dob,
      organization_list,
    });
  };

  

  return (
    <>
      <Panel header="Users Portal">
        <Table data={userData} autoHeight={true}>
          <Column flexGrow={1}>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column flexGrow={2}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Date of Birth</HeaderCell>
            <Cell dataKey="dob" />
          </Column>

          <Column width={120} align="center" fixed="right">
            <HeaderCell>Organization</HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="link"
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
                  appearance="link"
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
      <OrganizationListModal openOrg={openOrg} setOpenOrg={setOpenOrg} flagUpdate={flagUpdate} setFlagUpdate={setFlagUpdate} updateData={updateData}/>

      {/* Modals for Edit*/}
      <OrganizationUserEditModal openEdit={openEdit} setOpenEdit={setOpenEdit} flagUpdate={flagUpdate} setFlagUpdate={setFlagUpdate} updateData={updateData}/>


      <ToastContainer />
    </>
  );
};

export default UsersManage;