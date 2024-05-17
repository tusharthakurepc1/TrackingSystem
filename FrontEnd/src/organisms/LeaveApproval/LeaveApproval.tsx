import { Table, Button, ButtonGroup, Pagination } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import "./LeaveApproval.style.scss";
import OrganizationUserServices from "../../services/OrganizationUser";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  updatedFlag: boolean;
  setUpdateFlag: Function;
  email: string;
  orgName: string;
}

const LeaveApproval = ({ updatedFlag, setUpdateFlag, email, orgName }: Props) => {
  const [wfhApplication, setWfhApplication] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(10);

  const [updateLeaveComp, setupdateLeaveComp] = useState(false);

  useEffect(() => {
    const applicationReq = async () => {
      const response = await OrganizationUserServices.getAllOrganizationApplication(
          orgName,
          page.toString(),
          limit.toString()
        );
      console.log("Application ans: ",response.data);

      
      setTotalData(response.data.totalApplication)
      setWfhApplication(response.data.applicationRes);
    };

    applicationReq();
  }, [totalData, updateLeaveComp, updatedFlag, page]);

  const acceptedLeaveReq = async (_id: string) => {
    const response = await OrganizationUserServices.acceptedLeaveRequest(_id, email);
    if (response.status === 200) {
      toast.success("Leave Approved")
      setupdateLeaveComp(!updateLeaveComp)
    }
    else{
      toast.error("Something wrong with Leave accepted!");
    }
    setUpdateFlag(!updatedFlag)
  };

  const rejectedLeaveReq = async (_id: string) => {
    const response = await OrganizationUserServices.rejectedLeaveRequest(_id, email);
    if (response.status === 200) {
      toast.success("Leave Rejected");
      setupdateLeaveComp(!updateLeaveComp)
    }
    else{
      toast.error("Something wrong with Leave rejected!");
    }
    setUpdateFlag(!updatedFlag)
  };

  return (
    <>
      <h1> Leave Requests </h1>
      <div className="table-user">
        <Table data={wfhApplication} autoHeight={true}>
          <Column flexGrow={1} align="center">
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="orgName" />
          </Column>

          <Column flexGrow={1} align="center">
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="createdDate">
              {
                rowData => new Date(rowData.createdDate).toLocaleString().split(",")[0]
              }
            </Cell>
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Reason</HeaderCell>
            <Cell dataKey="reason" />
          </Column>

          <Column align="center" flexGrow={1}>
            <HeaderCell>Status</HeaderCell>
            <Cell style={{ padding: "6px" }}>
              {(rowData) =>
                rowData.status === 3 ? (
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        acceptedLeaveReq(rowData._id);
                      }}
                      appearance="ghost"
                      active
                      style={{ padding: "3px 5px" }}
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => {
                        rejectedLeaveReq(rowData._id);
                      }}
                      appearance="ghost"
                      active
                      style={{ padding: "3px 5px" }}
                    >
                      Reject
                    </Button>
                  </ButtonGroup>
                ) : (
                  <>
                    {rowData.status === 1 ? (
                      <>Leave Approved</>
                    ) : (
                      <>Leave Rejected </>
                    )}
                  </>
                )
              }
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

export default LeaveApproval;
