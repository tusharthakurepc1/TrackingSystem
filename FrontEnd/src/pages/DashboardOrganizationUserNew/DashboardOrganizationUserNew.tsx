//module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Message } from "rsuite";
import Cookies from "js-cookie";

//service
import OrganizationUserServices from "../../services/OrganizationUser";

//import
import LeaveApproval from "../../organisms/LeaveApproval";
import OrganizationUserLeaveTable from "../../molecules/OrganizationUserLeaveTable/OrganizationUserLeaveTable";
import CustomNavbar from "../../molecules/Header/Header";
import CalendarLeave from "../../organisms/CalendarLeave";

//type
import { UserStructure } from "./DashboardOrganizationUserNew.type";

//css
import "./DashboardOrganizationUserNew.style.scss";

const DashBoardOrganizationUserNew = () => {
  //type
  const [updatedFlag, setUpdatedFlag] = useState(false);
  const [optionsTab, setOptionsTab] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<UserStructure>({
    email: "",
    firstName: "",
    lastName: "",
    orgName: "",
  });
  const [makeReq, setMakeReq] = useState(true);

  //DashBoard Date Request
  const dashboardReq = async (token: string) => {
    const response =
      await OrganizationUserServices.organizationUserDashBoardRequest(token);

    if (response.status !== 200 || !response.data || !response.orgName) {
      Cookies.remove("accessToken");
      return navigate("/");
    }

    setAdminData({
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      orgName: response.orgName,
    });

    adminResponse(response.data.email, response.orgName);
    
  };

  //Check user is admin or not
  const adminResponse = async (email: string, orgName: string) => {
    const adminResponse = await OrganizationUserServices.checkIsAdmin(
      email,
      orgName
    );
    setIsAdmin(adminResponse.data);
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

      {isAdmin ? (
        <>
          <LeaveApproval
            updatedFlag={updatedFlag}
            setUpdateFlag={setUpdatedFlag}
            email={adminData.email}
            orgName={adminData.orgName}
          />
        </>
      ) : (
        <>
          <div className="navigationButtonGroup">
            <ButtonGroup>
              <Button
                onClick={() => setOptionsTab(1)}
                appearance={optionsTab === 1 ? "primary" : "default"}
              >
                Calendar
              </Button>
              <Button
                onClick={() => setOptionsTab(2)}
                appearance={optionsTab === 2 ? "primary" : "default"}
              >
                Applications
              </Button>
            </ButtonGroup>
          </div>

          {optionsTab === 1 ? (
            <>
              <div className="calendar-body">
                <CalendarLeave
                  email={adminData.email}
                  orgName={adminData.orgName}
                  updatedFlag={updatedFlag}
                  setUpdatedFlag={setUpdatedFlag}
                />
              </div>
            </>
          ) : (
            <>
              <OrganizationUserLeaveTable
                updatedFlag={updatedFlag}
                setUpdateFlag={() => setUpdatedFlag}
                email={adminData.email}
                orgName={adminData.orgName}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default DashBoardOrganizationUserNew;
