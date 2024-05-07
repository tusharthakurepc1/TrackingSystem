import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home/Home';
import CustomNav from '../molecules/Header/Header';
// import SignupOrganizationUserForm from '../organisms/OrganizationUser/SignupOrganizationUserForm';
// import LoginOrganizationUserForm from '../organisms/OrganizationUser/LoginOrganizationUserForm';
// import SignupSystemUserForm from './organisms/SignupSystemUserForm';
// import LoginSystemUserForm from '../organisms/SystemUser/LoginSystemUserForm';
import DashBoardOrganizationUser from '../organisms/OrganizationUser/DashboardOrganizationUser'
import DashBoardSystemUser from '../organisms/SystemUser/DashboardSystemUser'
import DumpRoute from '../organisms/DumpRoute';
import OrganizationUser from '../molecules/OrganizationUser/OrganizationUser'
import SystemUser from '../molecules/SystemUser/SystemUser';

const WFHRoutes = () =>{
    const [activeKey, setActiveKey] = useState(null);

    return (
        <div>
            <BrowserRouter>
                <CustomNav active={activeKey} onSelect={setActiveKey} />
                <Routes>
                    {/* Home Route */}
                    <Route path='/' element={ <Home/> }/>  

                    {/* User's DashBoard */}
                    <Route path='/user-login' element={ <OrganizationUser/> } />
                    <Route path='/user-dashboard' element={ <DashBoardOrganizationUser/> }/>

                    <Route path='/sysuser-login' element={ <SystemUser /> } />
                    <Route path='/sysuser-dashboard' element={ <DashBoardSystemUser/> } />

                    {/* Dump */}
                    <Route path='/temp' element={<DumpRoute />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default WFHRoutes;