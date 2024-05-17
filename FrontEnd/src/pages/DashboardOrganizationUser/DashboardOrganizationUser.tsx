import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "react-calendar/dist/Calendar.css";
import LeaveApproval from "../../organisms/LeaveApproval/LeaveApproval";
import "./DashboardOrganizationUser.style.scss";
import { Button, Message } from "rsuite";
import {UserStructure} from "./DashboardOrganizationUser.type";
import OrganizationUserLeaveTable from "../../molecules/OrganizationUserLeaveTable/OrganizationUserLeaveTable";
import OrganizationUserServices from "../../services/OrganizationUser";
import WFHApplicationServices from "../../services/WfhApplication";
import CustomNavbar from "../../molecules/Header/Header";
import CalendarLeave from "../../organisms/CalendarLeave";

const DashBoardOrganizationUser = () => {
  // const [leaveFlag, setLeafFlag] = useState(false);
  const [updatedFlag, setUpdatedFlag] = useState(false);

  const [optionsTab, setOptionsTab] = useState(1);
  

  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<UserStructure>({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [orgData, setOrgData] = useState([]);
  const [adminOrgData, setAdminOrgData] = useState([]);
  const [makeReq, setMakeReq] = useState(true);

  const dashboardReq = async (token: string) => {
    const response =
      await OrganizationUserServices.organizationUserDashBoardRequest(token);

    console.log(response);

    if (response.status !== 200 || !response.data) {
      Cookies.remove("accessToken");
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

    console.log("Application Req: ", response.data.allEmailApplications);
    setAdminOrgData(response.data.result);
    // setAllApplication(response.data.allEmailApplications);
  };

  
  useEffect(() => {
    const token: string | undefined = Cookies.get("accessToken");
    if (!token) {
      navigate("/");
    }
    if (makeReq) {
      if (typeof token === "string") {
        dashboardReq(token);
      }
      setMakeReq(false);
    }
  }, [updatedFlag]);


  return (
    <>
      <CustomNavbar isVisible={true} />
      <Message>
        Welcome <strong>{adminData.firstName},</strong> you logged as a
        Organization User
      </Message>
      
      {/* adminOrgData.length > 0  :: admin  */}
      {
        adminOrgData.length > 0 ? 
        <>
          <LeaveApproval
            updatedFlag={updatedFlag}
            setUpdateFlag={setUpdatedFlag}
            email={adminData.email}
            orgData={orgData}
          />
        </> : 
        <>
          <div className="navigationButtonGroup">
            <Button onClick={()=> setOptionsTab(1)} appearance="primary" className="navigationButton">Calendar</Button> 
            <Button onClick={()=> setOptionsTab(2)} appearance="primary" className="navigationButton">Applications</Button>
          </div>

          {
            optionsTab === 1 ? 
            <> 
              <div className="calendar-body">
                <CalendarLeave  email={adminData.email} orgList={orgData} updatedFlag={updatedFlag} setUpdatedFlag={setUpdatedFlag}/>
              </div>
            </> : 
            <>
              <OrganizationUserLeaveTable
                updatedFlag={updatedFlag}
                setUpdateFlag={setUpdatedFlag}
                email={adminData.email}
                orgData={orgData}
              />
            </>
          }
          
        </>
      }  
    </>
  );
};

export default DashBoardOrganizationUser;
