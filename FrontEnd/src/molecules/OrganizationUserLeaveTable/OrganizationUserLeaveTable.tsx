import { useEffect, useState } from "react";
import { Table, Button, ButtonGroup, Pagination } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import OrganizationUserServices from "../../services/OrganizationUser";

interface Props {
  updatedFlag: boolean
  email: string;
  orgData: string[];
}

const OrganizationUserLeaveTable = ({updatedFlag, email, orgData }: Props) => {
  const [wfhApplication, setWfhApplication] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [totalData, setTotalData] = useState(10);

  useEffect(() => {
    const applicationReq = async () => {
      const response =
        await OrganizationUserServices.organizationUserApplications(
          orgData,
          email,
          page,
          limit
        );
        
      console.log("HELLO: ",response.data);
      
      setTotalData(response.data.totalApplication)
      setWfhApplication(response.data.applicationRes);
    };
    applicationReq();
  }, [updatedFlag]);

  return (
    <>
      <h1> Work From Home Applications </h1>
      <div className="table-user">
        <Table data={wfhApplication} autoHeight={true}>
          <Column flexGrow={1} align="center">
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="orgName" />
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
          <Column flexGrow={1} align="center">
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status">
            {(rowData) =>
                rowData.status === 3 ? (
                  <>Pending</>
                ) : (
                  <>
                    {rowData.status === 1 ? (
                      <>Approved</>
                    ) : (
                      <>Rejected </>
                    )}
                  </>
                )
              }
            </Cell>
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Approved By</HeaderCell>
            <Cell dataKey="approvedBy" />
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
          limitOptions={[5, 10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={setLimit}
        />
      </div>


    </>
  )
}

export default OrganizationUserLeaveTable;