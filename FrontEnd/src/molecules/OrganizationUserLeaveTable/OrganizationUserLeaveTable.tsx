//module
import { useEffect, useState } from "react";
import { Table, Pagination } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

//services
import OrganizationUserServices from "../../services/OrganizationUser";

//type
import { OrgUserLeaveTableProps } from "./OrganizationUserLeaveTable.type";

const OrganizationUserLeaveTable = ({updatedFlag, setUpdateFlag, email, orgName }: OrgUserLeaveTableProps) => {

  //state
  const [isLoading, setIsLoading] = useState(true);
  const [wfhApplication, setWfhApplication] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalData, setTotalData] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    const applicationReq = async () => {
      const response =
        await OrganizationUserServices.getAllEmailOrganizationApplication(
          orgName,
          email,
          page.toString(),
          limit.toString()
        );
      
      setIsLoading(false);
      setUpdateFlag(!updatedFlag)
      setTotalData(response.data.totalApplication)
      setWfhApplication(response.data.applicationRes);
    };
    applicationReq();
  }, [updatedFlag, totalData, page]);

  return (
    <>
      <h1> Work From Home Applications </h1>
      <div className="table-user">
        <Table data={wfhApplication} autoHeight={true} loading={isLoading}>
          <Column flexGrow={1} align="center">
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="createdDate">
              {
                rowData => new Date(rowData.createdDate).toLocaleString().split(",")[0]
              }
            </Cell>
          </Column>
          <Column flexGrow={2} align="center">
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
          <Column flexGrow={3} align="center">
            <HeaderCell>Approved By</HeaderCell>
            <Cell dataKey="approvedBy" />
          </Column>
          <Column flexGrow={2} align="center" >
            <HeaderCell>Rejected Reason</HeaderCell>
            <Cell dataKey="rejectedReason" />
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
  )
}

export default OrganizationUserLeaveTable;