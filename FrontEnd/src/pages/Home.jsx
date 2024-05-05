import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import SystemUser from '../molucules/SystemUser'
import OrganizationUser from '../molucules/OrganizationUser'
import SignupOrganizationUserForm from '../organisms/SignupOrganizationUserForm'
import LoginOrganizationUserForm from '../organisms/LoginOrganizationUserForm'
import './style.scss'

const Home = () => {
    const [flag, setFlag] = useState(false);
    return (
        <div className='home-container'>
            <h1 className='home-heading'><strong>Work From Home Tracking System System</strong></h1>
            <div className='form-body' >
                <div className='form-buttons'>
                    <Button className="button-head" content={"System User"} onClickRef={()=> setFlag(true)}/>
                    <Button className="button-head" content={"Organization User"} onClickRef={()=> setFlag(false)}/>
                </div>

                {
                    flag ? <SystemUser />
                    : <OrganizationUser />
                }

            </div>


        </div>
    )
}

export default Home