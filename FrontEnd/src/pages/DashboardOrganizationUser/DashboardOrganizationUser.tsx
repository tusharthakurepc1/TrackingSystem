import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import WFH_Application from "../../organisms/FormApplication/WfhApplication";
import LeaveApproval from "../../organisms/LeaveApproval/LeaveApproval";
import "./DashboardOrganizationUser.style.scss";
import { Button, Message } from "rsuite";
import { ApplicationStructure, UserStructure } from "./DashboardOrganizationUser.type";
import OrganizationUserLeaveTable from '../../molecules/OrganizationUserLeaveTable/OrganizationUserLeaveTable'
import OrganizationUserServices from "../../services/OrganizationUser";
import WFHApplicationServices from "../../services/WfhApplication";
import CustomNavbar from "../../molecules/Header/Header";

const DashBoardOrganizationUser = () => {
  const [currDate, setCurrDate] = useState<Date>(new Date());
  const [availedDate, setAvailedDate] = useState("");
  const [formFlag, setFormFlag] = useState(false);
  const [leaveFlag, setLeafFlag] = useState(false);

  const [updatedFlag, setUpdatedFlag] = useState(false);    
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<UserStructure>({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [orgData, setOrgData] = useState([]);
  const [adminOrgData, setAdminOrgData] = useState([]);
  const [makeReq, setMakeReq] = useState(true);
  const [allApplication, setAllApplication] = useState([]);
  // const [wfhApplication, setWfhApplication] = useState([]);


  const calendarUpdate = () => {
    console.log("Calendar Update");
    
  }
  const dashboardReq = async (token: string) => {
    const response =
      await OrganizationUserServices.organizationUserDashBoardRequest(token);

    console.log(response);
    
    if (response.status !== 200 || !response.data) {
      Cookies.remove("accessToken")
      return navigate("/");
    }

    setAdminData(response.data);
    setOrgData(response.data.orgination_list);
    applicationReq(response.data.orgination_list, response.data.email);
  };

  const applicationReq = async (orgList: Array<string>, email: string) => {
    const response = await WFHApplicationServices.wFHApplicationFetch({
      orgList,
      email,
    });

    console.log("Application Req: ", response.data);
    setAdminOrgData(response.data.result);
    // setWfhApplication(response.data.applicationRes);
    setAllApplication(response.data.allEmailApplications);
  };

  const dayClickReq = async (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthStr: string;
    let day = date.getDate();
    let dayStr: string;

    if (month < 10) {
      monthStr = "0" + month;
    } else {
      monthStr = "" + month;
    }
    if (day < 10) {
      dayStr = "0" + day;
    } else {
      dayStr = "" + day;
    }

    const dateFormatted: string = year + "-" + monthStr + "-" + dayStr;
    setAvailedDate(dateFormatted);
    setFormFlag(true);
  };

  useEffect(()=> {
    const token: string | undefined = Cookies.get("accessToken");
    // console.log(token);
    
    if (!token) {
      navigate("/");
    }
    if (makeReq) {
      if (typeof token === "string") {
        dashboardReq(token);
      }
      setMakeReq(false);
    }
  },[])

  interface DateProp {
    date: Date;
  }

  return (
    <>
      <CustomNavbar isVisible={true}/>
      <Message>
        Welcome <strong>{adminData.firstName},</strong> you logged as a Organization User
      </Message>
      
      <WFH_Application
        updatedFlag={updatedFlag}
        setUpdatedFlag={setUpdatedFlag}
        availedDate={availedDate}
        formFlag={formFlag}
        setFormFlag={setFormFlag}
        orgData={orgData}
      />

      <div className="calendar-body">
        <Calendar
          value={currDate}
          onChange={calendarUpdate}
          tileClassName={({ date }: DateProp) => {
            let day = date.getDate();
            let dayStr: string;
            let month = date.getMonth() + 1;
            let monthStr: string;
            if (date.getMonth() < 10) {
              monthStr = "0" + month;
            } else {
              monthStr = "" + month;
            }
            if (date.getDate() < 10) {
              dayStr = "0" + day;
            } else {
              dayStr = "" + day;
            }

            const newDate = date.getFullYear() + "-" + monthStr + "-" + dayStr;

            if (
              allApplication.find(
                (el: ApplicationStructure) =>
                  el.createdDate.toString().split("T")[0] === newDate &&
                  el.status === 3,
              )
            ) {
              return "highlight-yellow";
            }

            if (
              allApplication.find(
                (el: ApplicationStructure) =>
                  el.createdDate.toString().split("T")[0] === newDate &&
                  el.status === 2,
              )
            ) {
              return "highlight-red";
            }

            if (
              allApplication.find(
                (el: ApplicationStructure) =>
                  el.createdDate.toString().split("T")[0] === newDate &&
                  el.status === 1,
              )
            ) {
              return "highlight-green";
            }
          }}
          onClickDay={dayClickReq}
        />
      </div>
      {adminOrgData.length <= 0 ? (
        <>
          <Button
            onClick={() => {
              setLeafFlag(true);
            }}
            value={"Approve Leave"}
            appearance="ghost"
            active
            style={{ margin: 10 }}
          >
            {" "}
            All Applications
          </Button>
          {leaveFlag ? (
            <OrganizationUserLeaveTable
              updatedFlag={updatedFlag}
              email={adminData.email}
              orgData={orgData}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              setLeafFlag(true);
            }}
            value={"Approve Leave"}
            appearance="ghost"
            active
            style={{ margin: 10 }}
          >
            {" "}
            Approve Leave
          </Button>
          {leaveFlag ? (
            <LeaveApproval
              updatedFlag={updatedFlag}
              email={adminData.email}
              orgData={orgData}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default DashBoardOrganizationUser;
