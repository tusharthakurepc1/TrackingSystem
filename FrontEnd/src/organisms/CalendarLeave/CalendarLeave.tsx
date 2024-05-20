//module
import { useEffect, useState } from "react";
import { Calendar, Modal, Button, Input } from "rsuite";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

//service
import WFHApplicationServices from "../../services/WfhApplication";

//type
import { CalendarLeaveProps, Application } from "./CalendarLeave.type";

//css
import "react-toastify/dist/ReactToastify.css";
import "./CalendarLeave.style.scss";

const CalendarLeave = ({
  email,
  orgName,
  updatedFlag,
  setUpdatedFlag,
}: CalendarLeaveProps) => {
  //state
  const [allApplication, setAllApplication] = useState<Application[]>([]);
  const [openApplication, setOpenApplication] = useState(false);

  const [reason, setReason] = useState("");

  const [dateVal, setDateVal] = useState<string>("");

  //states setter
  const setValueReason = (value: string) => {
    setReason(value);
  };

  const closeApplication = () => {
    setOpenApplication(false);
  };

  useEffect(() => {
    const getApplications = async () => {
      const result = await WFHApplicationServices.getWfhApplications(
        orgName,
        email
      );
      // console.log("Application from Calendar, ", result.data);
      if (result.data) {
        setAllApplication(result.data);
      }
    };

    getApplications();
  }, [email, updatedFlag]);

  //Display reason to Calender cell
  const renderCell = (date: Date) => {
    for (let i = 0; i < allApplication.length; i++) {
      const matchedDate = new Date(allApplication[i].createdDate);
      if (
        matchedDate.getDate() === date.getDate() &&
        matchedDate.getMonth() === date.getMonth()
      ) {
        return <p>{allApplication[i]["reason"]}</p>;
      }
    }
  };

  //Apply the style to Calendar cell grid
  const setCellClassName = (date: Date): string | undefined => {
    for (let i = 0; i < allApplication.length; i++) {
      const matchedDate = new Date(allApplication[i].createdDate);
      if (
        matchedDate.getDate() === date.getDate() &&
        matchedDate.getMonth() === date.getMonth()
      ) {
        const status = allApplication[i].status;
        if (status === 1) return "completed";
        else if (status === 2) return "rejected";
        else if (status === 3) return "pending";
        else return "";
      }
    }
  };

  //Apply Request to application
  const applicationReq = async () => {
    if (reason === "") {
      toast.error("Fill all the details");
      return;
    }

    const token: string | undefined = Cookies.get("accessToken");

    if (typeof token === "string") {
      const data = await WFHApplicationServices.wFHApplicationInsert(
        dateVal,
        orgName,
        reason,
        token
      );
      console.log(data);
      setUpdatedFlag(!updatedFlag);
      setReason("");
      closeApplication();
    }
  };

  //Check is the cell already having an application or not
  const isValidApplication = async (date: Date) => {
    for (let i = 0; i < allApplication.length; i++) {
      const matchedDate = new Date(allApplication[i].createdDate);
      if (
        matchedDate.getDate() === date.getDate() &&
        matchedDate.getMonth() === date.getMonth()
      ) {
        toast.error("You already applied on that day!");
        return;
      }
    }

    setDateVal(date.toString());
    setOpenApplication(true);
  };

  return (
    <>
      <Calendar
        bordered
        renderCell={renderCell}
        onSelect={(date: Date) => {
          isValidApplication(date);
        }}
        cellClassName={setCellClassName}
      />

      <Modal overflow={true} open={openApplication} onClose={closeApplication}>
        <Modal.Header>
          <Modal.Title>Work From Home Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-body">
            Reason
            <Input
              type={"text"}
              onChange={setValueReason}
              style={{ marginBottom: 10 }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={applicationReq} appearance="primary" active>
            Submit
          </Button>
          <Button onClick={closeApplication} appearance="primary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CalendarLeave;
