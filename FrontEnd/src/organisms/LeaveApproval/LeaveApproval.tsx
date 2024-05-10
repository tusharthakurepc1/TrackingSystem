import { Table, Button, ButtonGroup } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import "./LeaveApproval.style.scss";
import OrganizationUserServices from "../../services/OrganizationUser";

const LeaveApproval = ({ wfhApplication }:  {wfhApplication: never[]}) => {
  const acceptedLeaveReq = async (_id: string) => {
    const response = OrganizationUserServices.acceptedLeaveRequest(_id);
    console.log(response);
  };

  const rejectedLeaveReq = async (_id: string) => {
    const response = OrganizationUserServices.rejectedLeaveRequest(_id);
    console.log(response);
  };

  return (
    <>
      <h1> Leave Requests </h1>
      <div className="table-user">
        <Table data={wfhApplication} height={500}>
          <Column width={60} align="center">
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="orgName" />
          </Column>

          <Column width={200} align="center">
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column width={200} align="center">
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="createdDate" />
          </Column>
          <Column width={200} align="center">
            <HeaderCell>Reason</HeaderCell>
            <Cell dataKey="reason" />
          </Column>

          <Column align="center" width={150}>
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
      </div>
    </>
  );
};

export default LeaveApproval;
