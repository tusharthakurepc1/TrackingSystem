//modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "../pages/Home";
import DashBoardOrganizationUserNew from "../pages/DashboardOrganizationUserNew"
import DashBoardSystemUser from "../pages/DashboardSystemUser";
import OrganizationUser from "../pages/OrganizationUser";
import SystemUser from "../pages/SystemUser/SystemUser";
import OrganizationUserProfile from '../pages/OrganizationUserProfile'
import SystemUserProfile from '../pages/SystemUserProfile'


const RoutesComponent = () => {
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
            element={<DashBoardOrganizationUserNew />}
          />

          {/* System User */}
          <Route path="/sysuser-login" element={<SystemUser />} />
          <Route path="/sysuser-dashboard" element={<DashBoardSystemUser />} />
          
          {/* User Profile */}
          <Route path="/profile" element={<OrganizationUserProfile />}/>
          <Route path="/sysprofile" element={<SystemUserProfile />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutesComponent;
