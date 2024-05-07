import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WFH_Application from '../Form_Application/WFH_Application'
import LeaveApproval from '../LeaveApproval/LeaveApproval';
import './style.scss'
import {Button} from 'rsuite'
import axios from 'axios'
import { ApplicationStructure, UserStructure } from './type';
import OrganizationUserServices from '../../services/OrganizationUser';
import WFHApplicationServices from '../../services/WFHApplication';



const DashBoardOrganizationUser = () => {
    const [currDate, setCurrDate] = useState(new Date())
    const [availedDate, setAvailedDate] = useState("");
    const [formFlag, setFormFlag] = useState(false);
    const [leaveFlag, setLeafFlag] = useState(false);

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState<UserStructure>({email: "", firstName: "", lastName: ""})
    const [orgData, setOrgData] = useState([])
    const [adminOrgData, setAdminOrgData] = useState([])
    const [makeReq, setMakeReq] = useState(true)
    const [allApplication, setAllApplication] = useState([])
    const [wfhApplication, setWfhApplication] = useState([])

    
    const dashboardReq = async (token: string) => {
        //DB request for getting DashBoard Data
        const response = await OrganizationUserServices.organizationUserDashBoardRequest(token);
        console.log(response);

        if(!response.user || !response.user.orgination_list){
            return navigate("/")
        }
        console.log("Dashboard Req: ",response);
        
        setAdminData(response.user);
        setOrgData(response.user.orgination_list)
        console.log("Org List: ",response.user.orgination_list);
        applicationReq(response.user.orgination_list, response.user)
        setAllApplication(response.allApplications)
    }

    const applicationReq = async (orgList: any, admin: any) => {

        const data = await WFHApplicationServices.wFHApplicationFetch({orgList, email: admin.email})

        console.log("Application Req: ",data);
        setAdminOrgData(data.data)
        setWfhApplication(data.applications)
    }
    
    
    const dayClickReq = async (date: Date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let monthStr: string;
        let day = date.getDate();
        let dayStr: string;
        
        if(month < 10){
            monthStr = '0' + month;
        }
        else {
            monthStr = '' + month
        }
        if(day < 10){
            dayStr = '0' + day;
        }
        else{
            dayStr = '' + day;
        }
        
        const dateFormatted: string = year +"-" + monthStr +"-" + dayStr
        console.log(dateFormatted);
        setAvailedDate(dateFormatted)
        setFormFlag(true);
    }
    
 

    const token: string | undefined = Cookies.get("accessToken")
    if(!token){
        navigate("/");
    }
    if(makeReq){
        if(typeof token === 'string'){
            dashboardReq(token)
        }
        setMakeReq(false)
    }

    return (
        <>  
            <h1> Hello {adminData.firstName} {adminData.lastName} </h1>
            <p> {adminData.email} </p>
            
            <WFH_Application availedDate={availedDate} formFlag={formFlag} setFormFlag={setFormFlag} orgData={orgData}/>

            <div className='calendar-body'>
                <Calendar 
                    value={currDate}
                    tileClassName={
                        ({date}: any)=>{
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
                                allApplication.find((el: ApplicationStructure) => el.createdDate.split("T")[0] === newDate && el.status === 3)
                            ){
                                return 'highlight-yellow'
                            }

                            if(
                                allApplication.find((el: ApplicationStructure) => el.createdDate.split("T")[0] === newDate && el.status === 2)
                            ){
                                return 'highlight-red'
                            }

                            if(
                                allApplication.find((el: ApplicationStructure) => el.createdDate.split("T")[0] === newDate && el.status === 1)
                            ){
                                return 'highlight-green'
                            }

                        }
                    }

                    onClickDay={dayClickReq}
                    />
            </div>
            {
                adminOrgData.length <= 0 ?
                <>
                    
                </>
                :
                <>
                    <Button onClick={()=>{setLeafFlag(true)}} value={"Approve Leave"} appearance='ghost' active style={{margin: 10}}> Approve Leave</Button>
                    { 
                        leaveFlag ? 
                        <LeaveApproval adminOrgData={adminOrgData} wfhApplication={wfhApplication} /> 
                        :
                        <>  </>
                    }
                </>
            }

        </>
    )

} 

export default DashBoardOrganizationUser

