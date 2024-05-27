//module
// import socket from "../../socket";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Message } from "rsuite";

//service
import SystemUserServices from "../../services/SystemUser";

//import
import CustomNavbar from "../../molecules/HeaderSystemUser/HeaderSystemUser";
import OrganizationManage from "../../organisms/OrganizationManage";
import UsersManage from "../../organisms/UsersManage";

//type
import { SystemUserStructure } from "./DashBoardSystemUser.type";

const DashBoardSystemUser = () => {
  const navigate = useNavigate();

  //states
  const [adminData, setAdminData] = useState<SystemUserStructure>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    organization_list: [""],
  });
  const [makeReq, setMakeReq] = useState(true);
  const [optionsTab, setOptionsTab] = useState(1);

  useEffect(() => {
    const token: string | undefined = Cookies.get("accessToken");

    if (!token) {
      navigate("/sysuser-login");
    }
    if (makeReq) {
      if (typeof token === "string") {
        dashboardReq(token);
      }
      setMakeReq(false);
    }
  }, []);

  //Dashboard request function
  const dashboardReq = async (token: string) => {
    const response = await SystemUserServices.SystemUserDashBoardRequest(token);

    if (!response.data.user || !response.data.orgData) {
      return <h1> Page not found </h1>;
    }
    setAdminData(response.data.user);
  };

  return (
    <>
      <CustomNavbar isVisible={true} />
      <Message>
        Welcome <strong>{adminData.firstName},</strong> you logged as a System
        User
      </Message>

      <div className="navigationButtonGroup">
        <ButtonGroup>
          <Button
            onClick={() => setOptionsTab(1)}
            appearance={optionsTab === 1 ? "primary" : "default"}
          >
            Users
          </Button>
          <Button
            onClick={() => setOptionsTab(2)}
            appearance={optionsTab === 2 ? "primary" : "default"}
          >
            Organizations
          </Button>
        </ButtonGroup>
      </div>

      {optionsTab === 1 ? <UsersManage /> : <OrganizationManage />}

    </>
  );
};

export default DashBoardSystemUser;
