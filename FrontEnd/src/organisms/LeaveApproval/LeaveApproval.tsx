//module
import { useState, useEffect } from "react";
import { Table, Button, ButtonGroup, Pagination } from "rsuite";
import { Modal, Input, DateRangePicker } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
const { Column, HeaderCell, Cell } = Table;
import { FaFilter } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

//service
import OrganizationUserServices from "../../services/OrganizationUser";
import WFHApplicationServices from "../../services/WfhApplication";

//type
import { FilterQuery, LeaveApprovalProps } from "./LeaveApproval.type";

//css
import "./LeaveApproval.style.scss";
import "react-toastify/dist/ReactToastify.css";
import { DateRange } from "rsuite/esm/DateRangePicker";

const LeaveApproval = ({
  updatedFlag,
  setUpdateFlag,
  email,
  orgName,
}: LeaveApprovalProps) => {

  //states
  const [isLoading, setIsLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState<FilterQuery>({
    email: "",
    approvedBy: "",
    status: "",
    reason: "",
    availedAt: "",
  });

  const [dateRange, setDateRange] = useState<[Date?, Date?]>([])


  const [wfhApplication, setWfhApplication] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(10);

  const [rejectReason, setRejectReason] = useState("");
  const [ID, setID] = useState("");
  const [rejectionReasonForm, setRejectionReasonForm] = useState(false);


  //state setter
  const handleClose = () => setRejectionReasonForm(false);

  const setValueRejectReason = (value: string) => {
    setRejectReason(value);
  };

  const [updateLeaveComp, setupdateLeaveComp] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const applicationReq = async () => {
      setIsLoading(true);
      const response = await WFHApplicationServices.getWfhApplicationsFiltered(
        orgName,
        page,
        limit,
        filterQuery,
        dateRange
      );
      // console.log(response.data);
      setWfhApplication(response.data.applicationRes);
      setTotalData(response.data.totalApplication);
      setIsLoading(false);

      console.log("Filter Api Call");
      
    };

    applicationReq();

  }, [updateLeaveComp, updatedFlag, page, limit]);

  //Rejection Form setter
  const openRejectReasonForm = (_id: string) => {
    setRejectionReasonForm(true);
    setID(_id);
  };

  // Accept leave request
  const acceptedLeaveReq = async (_id: string) => {
    const response = await OrganizationUserServices.acceptedLeaveRequest(
      _id,
      email
    );
    if (response.status === 200) {
      toast.success("Leave Approved");
      setupdateLeaveComp(!updateLeaveComp);
    } else {
      toast.error("Something wrong with Leave accepted!");
    }
    setUpdateFlag(!updatedFlag);
  };

  // Reject leave request
  const rejectedLeaveReq = async () => {
    if (ID === "" || !ID || rejectReason === "" || !rejectReason) {
      toast.error("Fill all the details");
      return;
    }

    const response = await OrganizationUserServices.rejectedLeaveRequest(
      ID,
      email,
      rejectReason
    );
    if (response.status === 200) {
      toast.success("Leave Rejected");
      setupdateLeaveComp(!updateLeaveComp);
    } else {
      toast.error("Something wrong with Leave rejected!");
    }
    setUpdateFlag(!updatedFlag);
    setID("");
    handleClose();
  };

  //Filter Api Request
  const filterRequest = async () => {
    setIsLoading(true);
    const response = await WFHApplicationServices.getWfhApplicationsFiltered(
      orgName,
      page,
      limit,
      filterQuery,
      dateRange
    );
    console.log(response.data);
    setTotalData(response.data.totalApplication);
    setWfhApplication(response.data.applicationRes);
    setIsLoading(false);
  };

  const removeFilter = async () => {
    
    setFilterQuery({
      email: "",
      availedAt: "",
      reason: "",
      status: "",
      approvedBy: "",
    })

    setDateRange([])
    setUpdateFlag(!updatedFlag)

  }

  return (
    <>
      <h1> Leave Requests </h1>

      <Modal overflow={true} open={rejectionReasonForm} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-body">
            Reason
            <Input
              type={"text"}
              onChange={setValueRejectReason}
              style={{ marginBottom: 10 }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={rejectedLeaveReq} appearance="primary" active>
            Submit
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="filterBlock">
        <Input
          className="filterItem"
          placeholder="Email"
          value={filterQuery.email}
          onChange={(e) => {
            const value = e;
            setFilterQuery((prevState) => ({
              ...prevState,
              email: value,
            }));
          }}
        />
        <DateRangePicker 
          className="datePicker filterItem"
          format="yyyy-MM-dd HH:mm:ss"
          onChange={(
            value: DateRange | null 
          )=> {
            if(value){
              setDateRange(value)
            }
          }
          }
        />
        <Input
          className="filterItem"
          value={filterQuery.reason}
          placeholder="Reason"
          onChange={(e) => {
            const value = e;
            setFilterQuery((prevState) => ({
              ...prevState,
              reason: value,
            }));
          }}
        />
        <Input
          className="filterItem"
          value={filterQuery.status}
          placeholder="Status"
          onChange={(e) => {
            const value = e;
            setFilterQuery((prevState) => ({
              ...prevState,
              status: value,
            }));
          }}
        />
        <Input
          className="filterItem"
          value={filterQuery.approvedBy}
          placeholder="Approved by"
          onChange={(e) => {
            const value = e;
            setFilterQuery((prevState) => ({
              ...prevState,
              approvedBy: value,
            }));
          }}
        />
        <Button
          className="filterItem"
          appearance="primary"
          style={{ width: 200 }}
          onClick={filterRequest}
        >
          <FaFilter />
        </Button>
        <Button
          className="filterItem"
          appearance="primary"
          style={{ width: 200 }}
          onClick={removeFilter}
        >
          <MdOutlineCancel style={{fontSize: 20}}/>
        </Button>
      </div>

      <div>
        <Table data={wfhApplication} autoHeight={true} loading={isLoading}>
          <Column flexGrow={1} align="center" resizable={true}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" className="overflowContent"/>
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Availed At</HeaderCell>
            <Cell dataKey="createdDate">
              {(rowData) =>
                new Date(rowData.createdDate).toLocaleString().split(",")[0]
              }
            </Cell>
          </Column>
          <Column flexGrow={1} align="center" resizable={true}>
            <HeaderCell>Reason</HeaderCell>
            <Cell dataKey="reason" className="overflowContent"/>
          </Column>
          <Column align="center" flexGrow={1} resizable={true}>
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
                        openRejectReasonForm(rowData._id);
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
          <Column flexGrow={1} align="center" resizable={true}>
            <HeaderCell>Approved By</HeaderCell>
            <Cell dataKey="approvedBy" className="overflowContent"/>
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
      <br />

      <ToastContainer />
    </>
  );
};

export default LeaveApproval;
