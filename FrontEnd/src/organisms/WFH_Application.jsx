import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const WFH_Application = ({availedDate, formFlag, setFormFlag, orgData}) => {
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
            navigate("/")
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
            {orgVal}
            <form className='float-form'>
                    <h3>Work From Home Application</h3>
    
                    <select className='orgname-dropdown' onChange={setValueOrg}>
                        <option value={"Select"}>Organization Name</option>
                        {
                            orgData.map((value)=>{
                                return <option value={value}>{value}</option>
                            })
                        }
                    </select>

                    <Input type={"text"} content={"Reason"} setValue={setValueReason} />
                    
                    <Button content={"Submit"} onClickRef={applicationReq}/>
                    <Button content={"Cancel"} onClickRef={()=>{setFormFlag(false)}} />
    
                </form>

            </div>
        )
    }
}

export default WFH_Application;
