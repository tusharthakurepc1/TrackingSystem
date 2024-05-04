import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input'
import "./style.scss"
import Button from '../atoms/Button';
import DashBoardOrganizationUser from './DashboardOrganizationUser';
import Cookie from 'js-cookie'

const LoginOrganizationUserForm = () =>{

    const navigate = useNavigate();
    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")
    const [otpVal, setOtpVal] = useState("")

    const setValueEmail = (value) =>{
        setEmailVal(value.target.value)
    }
    const setValuePass = (value) => {
        setPasswordVal(value.target.value)
    }
    const setValueOtp = (value) =>{
        setOtpVal(value.target.value)
    }

    const submitReq = async(event) => {
        event.preventDefault()
        // returnToken(emailVal, passwordVal, otpVal)
        const OTP_URL = "http://localhost:5500/user-login";
        const user = {
            email: emailVal,
            password: passwordVal,
            otp: otpVal
        }

        try{
            const resp = await fetch(OTP_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await resp.json()
            if(data.msg){
                alert(data.msg)
            }
            if(data.accessToken){
                Cookie.set("accessToken", data.accessToken)
                navigate("/user-dashboard")
            }
            
        }catch(err){
            console.log("Can't send OTP.", err);
            alert("Invalid Credentials")
        }

    }

    const sendOtpReq = async(event) => {
        event.preventDefault()
        const OTP_URL = "http://localhost:5500/mail";

        try{
            const resp = await fetch(OTP_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailVal})
            })
            console.log("Otp Sent Sucessfylly", resp);            
        }catch(err){
            console.log("Can't send OTP.", err);
        }


    }
    return (
        <div className='form'>
            <form>
                <h3>Orginization User</h3>

                <Input type={"email"} content={"Email ID"} setValue={setValueEmail}/><br />
                <Input type={"password"} content={"Password"} setValue={setValuePass}/><br />

                <Input type={"text"} content={"OTP"} setValue={setValueOtp}/><br />
                <Button content={"Send OTP"} onClickRef={sendOtpReq}/>
                
                <Button onClickRef={submitReq} content={"Login"}/>

            </form>

            
        </div>
    )
}

export default LoginOrganizationUserForm