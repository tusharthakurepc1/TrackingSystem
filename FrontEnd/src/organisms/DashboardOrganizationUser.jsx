import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import ApplicationTile from '../molucules/ApplicationTile'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.scss'


const DashBoardOrganizationUser = () => {
    const [orgVal, setOrgVal] = useState("")
    const [dateVal, setDateVal] = useState("")
    const setValueOrg = (value) =>{
        setOrgVal(value.target.value)
    }
    const setValueDate = (value) => {
        setDateVal(value.target.value)
    }


    const navigate = useNavigate()
    const [adminData, setAdminData] = useState({})
    const [orgData, setOrgData] = useState([])
    const [makeReq, setMakeReq] = useState(true)
    const [allApplication, setAllApplication] = useState([])
    
    const dashboardReq = async (token) => {
        const URL = "http://localhost:5500/user-dashboard"

        const post_dashboard_api = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `BEARER ${token}`
            },
            body: JSON.stringify({})
        })
        const response = await post_dashboard_api.json()
        console.log(response);

        if(!response.user || !response.user.orgination_list){
            return navigate("/user-login")
        }
        setAdminData(response.user);
        setOrgData(response.user.orgination_list)
    }

    const applicationReq = async (event) => {
        event.preventDefault()
        const URL = "http://localhost:5500/application"

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `BEARER ${token}`
            },
            body: JSON.stringify({
                date: dateVal,
                orgName: orgVal
            })
        })
        const data = await response.json();
        console.log(data);
    }

    
    

    const token = Cookies.get("accessToken")
    if(!token){
        navigate("/user-login");
    }
    if(makeReq){
        dashboardReq(token)
        setMakeReq(false)
    }

    return (
        <>  
            <h1> Hello {adminData.firstName} {adminData.lastName} </h1>
            <p> {adminData.email}</p>
            <p>You working on: </p>
            <ul>
            {
                orgData.map((value)=>(
                    <li key={value}>{value}</li>
                ))
            }
            </ul> 

            <form>
                <h3>Work From Home Application</h3>

                <Input type={"text"} content={"Organization Name"} setValue={setValueOrg}/><br />
                <Input type={"date"} content={"Date"} setValue={setValueDate}/>

                <Button content={"Signup"} onClickRef={applicationReq}/>

            </form>

            <Calendar className={"calendar-outer"}/>

        </>
    )

}

export default DashBoardOrganizationUser

