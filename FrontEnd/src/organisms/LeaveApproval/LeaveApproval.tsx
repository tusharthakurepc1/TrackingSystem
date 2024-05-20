//module
import { useState, useEffect } from "react";
import { Table, Button, ButtonGroup, Pagination } from "rsuite";
import { Modal, Input } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
const { Column, HeaderCell, Cell } = Table;
import { FaFilter } from "react-icons/fa";

//service
import OrganizationUserServices from "../../services/OrganizationUser";
import WFHApplicationServices from "../../services/WfhApplication";

//type
import { FilterQuery, LeaveApprovalProps } from "./LeaveApproval.type";

//css
import "./LeaveApproval.style.scss";
import "react-toastify/dist/ReactToastify.css";

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
        filterQuery
      );
      console.log(response.data);
      setTotalData(response.data.totalApplication);
      setWfhApplication(response.data.applicationRes);
      setIsLoading(false);
    };

    applicationReq();
  }, [totalData, updateLeaveComp, updatedFlag, page]);

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
      filterQuery
    );
    console.log(response.data);
    setTotalData(response.data.totalApplication);
    setWfhApplication(response.data.applicationRes);
    setIsLoading(false);
  };

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

      {/* {JSON.stringify(filterQuery)} */}
      <div className="filterBlock">
        <Input
          placeholder="Email"
          onChange={(e) => {
            const value = e;
            setFilterQuery((prevState) => ({
              ...prevState,
              email: value,
            }));
          }}
        />
        <Input
          placeholder="Availed Date"
          type="date"
          onChange={(e: string) => {
            // const date = new Date(e)
            const value = e;
            setFilterQuery((prevState) => ({
              ...prevState,
              availedAt: value,
            }));
          }}
        />
        <Input
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
          appearance="primary"
          style={{ width: 200 }}
          onClick={filterRequest}
        >
          <FaFilter />
        </Button>
      </div>

      <div>
        <Table data={wfhApplication} autoHeight={true} loading={isLoading}>
          <Column flexGrow={1} align="center">
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column flexGrow={1} align="center">
            <HeaderCell>Availed At</HeaderCell>
            <Cell dataKey="createdDate">
              {(rowData) =>
                new Date(rowData.createdDate).toLocaleString().split(",")[0]
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
