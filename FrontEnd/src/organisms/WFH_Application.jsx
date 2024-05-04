import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const WFH_Application = ({availedDate, formFlag, setFormFlag}) => {
    const navigate = useNavigate()
    const [orgVal, setOrgVal] = useState("")
    const [dateVal, setDateVal] = useState(availedDate)
    const [reason, setReason] = useState("")

    useEffect(()=>{
        setDateVal(availedDate)
    }, [availedDate])

    const setValueOrg = (value) =>{
        setOrgVal(value.target.value)
    }
    const setValueReason = (value) => {
        setReason(value.target.value)
    }

    const applicationReq = async (event) => {
        event.preventDefault()
        const URL = "http://localhost:5500/application"
        const token = Cookies.get("accessToken")
        if(!token){
            navigate("/user-login")
        }

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `BEARER ${token}`
            },
            body: JSON.stringify({
                createdDate: dateVal,
                orgName: orgVal,
                reason: reason
            })
        })

        const data = await response.json();
        console.log(data);
        
        alert(data.msg)
        setFormFlag(false);
    }

    
    if(formFlag){
        return (
            <div className='background-float-form'>
            {dateVal}
            <form className='float-form'>
                    <h3>Work From Home Application</h3>
    
                    <Input type={"text"} content={"Organization Name"} setValue={setValueOrg}/><br />
                    <Input type={"text"} content={"Reason"} setValue={setValueReason} />
                    
                    <Button content={"Submit"} onClickRef={applicationReq}/>
                    <Button content={"Cancel"} onClickRef={()=>{setFormFlag(false)}} />
    
                </form>

            </div>
        )
    }
}

export default WFH_Application;
