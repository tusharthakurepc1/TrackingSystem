import React, {useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WFH_Application from './WFH_Application';
import LeaveApproval from './LeaveApproval';
import './style.scss'
import Button from '../atoms/Button';


const DashBoardOrganizationUser = () => {
    const [currDate, setCurrDate] = useState(new Date())
    const [availedDate, setAvailedDate] = useState("");
    const [formFlag, setFormFlag] = useState(false);
    const [leaveFlag, setLeafFlag] = useState(false);

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState({})
    const [orgData, setOrgData] = useState([])
    const [adminOrgData, setAdminOrgData] = useState([])
    const [makeReq, setMakeReq] = useState(true)
    const [allApplication, setAllApplication] = useState([])
    const [wfhApplication, setWfhApplication] = useState([])
    
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
        console.log(response.user.orgination_list);
        applicationReq(response.user.orgination_list, response.user)
        setAllApplication(response.allApplications)
    }

    
    
    const dayClickReq = async (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        
        if(month < 10){
            month = '0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }
        
        const dateFormatted = year +"-" + month +"-" + day
        console.log(dateFormatted);
        setAvailedDate(dateFormatted)
        setFormFlag(true);
    }
    
    const applicationReq = async (orgList, admin) => {
        const URL = "http://localhost:5500/org-getadmin"

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orgList,
                email: admin.email
            })
        })
        const data = await response.json();
        console.log(data);
        setAdminOrgData(data.data)
        setWfhApplication(data.applications)
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
            
            <WFH_Application availedDate={availedDate} formFlag={formFlag} setFormFlag={setFormFlag}/>

            <div className='calendar-body'>
                <Calendar 
                    value={currDate}
                    tileClassName={
                        ({date})=>{
                            let day = date.getDate()
                            let month = date.getMonth() + 1
                            if(date.getMonth() < 10){
                                month = '0' + month
                            }
                            if(date.getDate() < 10){
                                day = '0' + day;
                            }

                            const newDate = date.getFullYear()+"-"+month+"-"+day

                            if(
                                allApplication.find(el => el.createdDate.split("T")[0] === newDate && el.status === 3)
                            ){
                                return 'highlight-yellow'
                            }

                            if(
                                allApplication.find(el => el.createdDate.split("T")[0] === newDate && el.status === 2)
                            ){
                                return 'highlight-red'
                            }

                            if(
                                allApplication.find(el => el.createdDate.split("T")[0] === newDate && el.status === 1)
                            ){
                                return 'highlight-green'
                            }

                            
                            
                        }
                    }

                    onClickDay={dayClickReq}
                    />
            </div>

            {
                adminOrgData.length === 0 ?
                <>
                    
                </>
                :
                <>
                    <Button content={"Approve Leave"} onClickRef={()=>{setLeafFlag(true)}}/>
                    { 
                        leaveFlag ? 
                        <LeaveApproval adminOrgData={adminOrgData} wfhApplication={wfhApplication} /> 
                        :
                        <> </>
                    }
                </>
            }

        </>
    )

} 

export default DashBoardOrganizationUser

