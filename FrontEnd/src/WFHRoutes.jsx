import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SignupOrganizationUserForm from './organisms/SignupOrganizationUserForm';
import LoginOrganizationUserForm from './organisms/LoginOrganizationUserForm';
import SignupSystemUserForm from './organisms/SignupSystemUserForm';
import LoginSystemUserForm from './organisms/LoginSystemUserForm';

const WFHRoutes = () =>{
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Home Route */}
                    <Route path='/' element={ <Home/> }/>        

                    {/* Organization User Routes */}
                    <Route path='/user-signup' element={<SignupOrganizationUserForm/>} />
                    <Route path='/user-login' element={<LoginOrganizationUserForm/>} />

                    {/* System User Routes */}
                    <Route path='/sysuser-signup' element={<SignupSystemUserForm/>} />
                    <Route path='/sysuser-login' element={<LoginSystemUserForm/>} />

                    

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default WFHRoutes;