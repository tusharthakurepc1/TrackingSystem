//module
import { useEffect, useState } from "react";
import { Calendar, Modal, Button, Input } from "rsuite";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

//service
import OrganizationServices from "../../services/Organization";
import WFHApplicationServices from "../../services/WfhApplication";

//type
import { CalendarLeaveProps, Application } from "./CalendarLeave.type";
import {OrganizationData} from '../../typings/Organization'

//css
import "react-toastify/dist/ReactToastify.css";
import "./CalendarLeave.style.scss";

const CalendarLeave = ({
  email,
  orgName,
  updatedFlag,
  setUpdatedFlag,
}: CalendarLeaveProps) => {
  const [date, setDate] = useState(new Date());

  //state
  const [allApplication, setAllApplication] = useState<Application[]>([]);
  const [openApplication, setOpenApplication] = useState(false);

  const [reason, setReason] = useState("");
  const [orgData, setOrgData] = useState<OrganizationData>({
    isActive: true,
    name: "",
    max_wfh: 0,
    userEmail: [],
    admin: ""
  })
  const [totalLeavesAvailed, setTotalLeaveAvailed] = useState(0);

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
      
      const orgResult = await OrganizationServices.getOrganizationData(orgName);
      // console.log(orgResult);
      if(orgResult.data){
        setOrgData(orgResult.data)
      }

      // console.log("Application from Calendar, ", result.data);
      if (result.data) {
        //set all the application to the state
        setAllApplication(result.data);


        //count the leave you availed
        let count = 0;
        result.data.forEach((el: Application)=>{
          const matchedDate = new Date(el.createdDate);
          
          if(matchedDate.getMonth() === date.getMonth())
            if(el.status === 1 || el.status === 3)
              count += 1;
        })

        //assign the total wfh application by the organization
        setTotalLeaveAvailed(count)
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
        else if (status === 3)  return "pending";
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
    if(totalLeavesAvailed >= orgData.max_wfh){
      toast.error("You have used all your leave!!");
      return;
    }
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

  //update the Date accourding to the calendar
  const checkWfhLeaves = async (event: Date) => {
    setDate(event)
    setUpdatedFlag(!updatedFlag)
  }

  return (  
    <>
      {/* {orgData.max_wfh}
      {totalLeavesAvailed} */}
      <Calendar
        bordered
        renderCell={renderCell}
        onSelect={(date: Date) => {
          isValidApplication(date);
        }}
        cellClassName={setCellClassName}
        onChange={checkWfhLeaves}
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
