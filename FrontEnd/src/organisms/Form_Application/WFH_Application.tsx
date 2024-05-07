import { useState, useEffect } from 'react';
import {Button, Input, SelectPicker} from 'rsuite'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Props } from './type';
import './style.scss'


const WFH_Application = ({availedDate, formFlag, setFormFlag, orgData}: Props) => {
    const navigate = useNavigate()
    const [orgVal, setOrgVal] = useState("none")
    const [dateVal, setDateVal] = useState(availedDate)
    const [reason, setReason] = useState("")

    useEffect(()=>{
        setDateVal(availedDate)
    }, [availedDate])

    const setValueOrg = (value: string) =>{
        setOrgVal(value)
    }
    const setValueReason = (value: string) => {
        setReason(value)
    }

    const applicationReq = async (event: any) => {
        event.preventDefault()
        const URL = "http://localhost:5500/application"
        const token = Cookies.get("accessToken")
        if(!token){
            navigate("/")
        }

        const headers = {
            'Content-Type': 'application/json',
            'authorization': `BEARER ${token}`
        }
        const response = await axios.post(URL, JSON.stringify({createdDate: dateVal, orgName: orgVal, reason: reason}), {headers})
        const data = response.data;

        console.log(data);
        setFormFlag(false);
    }

    
    if(formFlag){
        return (
            <div className='background-float-form'>
            
            <form className='float-form'>
                    <h3>Work From Home Application</h3>
            
                    <SelectPicker style={{marginBottom: 10, marginTop: 10}} label="Select" onChange={(value: (string | undefined | void | null))=>{
                        if(typeof value === 'string'){
                            setValueOrg(value)
                        }
                        console.log(value);  
                    }} data={orgData.map((el)=>({label: el, value: el}))}>
                    </SelectPicker>

                    <Input type={"text"} placeholder={"Reason"} onChange={setValueReason} style={{marginBottom: 10}}/>
                    
                    <Button onClick={applicationReq} appearance='ghost' active style={{marginBottom: 10, marginTop: 10}}>Submit</Button>
                    <Button onClick={()=>{setFormFlag(false)}} appearance='ghost' active>Cancel</Button>
    
                </form>

            </div>
        )
    }
}

export default WFH_Application;
