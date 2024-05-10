import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
// import SignupOrganizationUserForm from '../organisms/OrganizationUser/SignupOrganizationUserForm';
// import LoginOrganizationUserForm from '../organisms/OrganizationUser/LoginOrganizationUserForm';
// import SignupSystemUserForm from './organisms/SignupSystemUserForm';
// import LoginSystemUserForm from '../organisms/SystemUser/LoginSystemUserForm';
import DashBoardOrganizationUser from "../pages/DashboardOrganizationUser/DashboardOrganizationUser";
import DashBoardSystemUser from "../pages/DashboardSystemUser/DashboardSystemUser";
import DumpRoute from "../organisms/DumpRoute";
import OrganizationUser from "../pages/OrganizationUser/OrganizationUser";
import SystemUser from "../pages/SystemUser/SystemUser";
import Profile from '../pages/Profile/Profile'
import { useState, useContext, createContext } from "react";


const WFHRoutes = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const setLogin = (value: boolean) => {
  //   setIsLoggedIn(value)
  // }

  return (
    <div>
      <BrowserRouter>

        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* User's DashBoard */}
          <Route path="/user-login" element={<OrganizationUser />} />
          <Route
            path="/user-dashboard"
            element={<DashBoardOrganizationUser />}
          />

          {/* System User */}
          <Route path="/sysuser-login" element={<SystemUser />} />
          <Route path="/sysuser-dashboard" element={<DashBoardSystemUser />} />


          {/* User Profile */}
          <Route path="/profile" element={<Profile />}/>

          {/* Dump */}
          <Route path="/temp" element={<DumpRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default WFHRoutes;
