import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import UserTile from '../molucules/UserTile'
import './style.scss'

const DashBoardSystemUser =  () =>{
    const [adminData, setAdminData] = useState({})
    const [userData, setUserData] = useState([])
    const [makeReq, setMakeReq] = useState(true)
    
    const dashboardReq = async (token) => {
        const URL = "http://localhost:5500/sysuser-dashboard"

        const post_dashboard_api = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `BEARER ${token}`
            },
            body: JSON.stringify({})
        })
        const response = await post_dashboard_api.json()
        console.log(response.user);
        console.log(response.user_data);

        if(!response.user || !response.user_data){
            return <h1> Page not found </h1>
        }
        setAdminData(response.user);
        setUserData(response.user_data);

        // if(!response.user || !response.user_data){
        //     return <h1>Data not Found</h1>
        // }
    }

    

    const navigate = useNavigate()
    const token = Cookies.get("accessToken")
    if(!token){
        navigate("/sysuser-login");
    }
    if(makeReq){
        dashboardReq(token)
        setMakeReq(false)
    }


    return (
        <>
            <h1>Hello {adminData.firstName}</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Data of Birth</th>
                    <th>Date of Joining</th>
                    <th>Organization</th>
                    <th></th>
                    <th></th>
                </tr>

                {
                    userData.map((item) => (
                        <UserTile item={item}/>
                    ))
                }
            </table>         


        </>
    )
}

export default DashBoardSystemUser