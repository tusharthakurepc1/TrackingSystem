import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SignupOrganizationUserForm from './organisms/SignupOrganizationUserForm';
import LoginOrganizationUserForm from './organisms/LoginOrganizationUserForm';
import SignupSystemUserForm from './organisms/SignupSystemUserForm';
import LoginSystemUserForm from './organisms/LoginSystemUserForm';
import DashBoardOrganizationUser from './organisms/DashboardOrganizationUser'
import DashBoardSystemUser from './organisms/DashboardSystemUser';
import DumpRoute from './organisms/DumpRoute';

const WFHRoutes = () =>{
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Home Route */}
                    <Route path='/' element={ <Home/> }/>        

                    {/* User's DashBoard */}
                    <Route path='/user-dashboard' element={ <DashBoardOrganizationUser/> }/>
                    <Route path='/sysuser-dashboard' element={ <DashBoardSystemUser/> } />

                    {/* Dump */}
                    <Route path='/temp' element={<DumpRoute />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default WFHRoutes;