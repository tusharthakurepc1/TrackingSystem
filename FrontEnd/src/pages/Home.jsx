import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import SignupOrganizationUserForm from '../organisms/SignupOrganizationUserForm'
import LoginOrganizationUserForm from '../organisms/LoginOrganizationUserForm'
import './style.scss'

const Home = () => {
    return (
        <div>
            <h1> Work From Home Tracking System </h1>
            <Link to="/user-login" className='link'>Login Organization User</Link>
            <Link to={"/user-signup"} className='link'>Signup Organization User</Link>
            <Link to={"/sysuser-signup"} className='link'>Signup System User</Link>
            <Link to={"/sysuser-login"} className='link'>Login System User</Link>
            
        </div>
    )
}

export default Home