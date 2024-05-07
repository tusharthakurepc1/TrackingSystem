import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ButtonGroup} from 'rsuite'
import "./style.scss"
import Cookies from 'js-cookie'
import { Input, Button } from 'rsuite'
import axios from 'axios'
import { Props } from './type';
import SystemUserServices from '../../services/SystemUser';
import OtpService from '../../services/SendMail';


const LoginSystemUserForm = ({setLogin}: Props) =>{
    const navigate = useNavigate();
    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")
    const [otpVal, setOtpVal] = useState("")

    const setValueEmail = (value: string) =>{
        setEmailVal(value)
    }
    const setValuePass = (value: string) => {
        setPasswordVal(value)
    }
    const setValueOtp = (value: string) =>{
        setOtpVal(value)
    }

    const returnToken = async(username: string, password: string, otp: string) => {
        const api = await SystemUserServices.SystemUserLoginRequest({email: username, password, otp})
        console.log(api);
    }


    const submitReq = async(event: any) => {
        event.preventDefault()
        const OTP_URL = "http://localhost:5500/sysuser-login";
        const user = {
            email: emailVal,
            password: passwordVal,
            otp: otpVal
        }
        console.log(JSON.stringify(user));


        try{
            const data = await SystemUserServices.SystemUserLoginRequest(user)

            if(data.accessToken){
                Cookies.set('accessToken', data.accessToken)
                navigate("/sysuser-dashboard")
            }
            
        }catch(err){
            console.log("Can't login", err);
        }

    }

    const sendOtpReq = async(event: any) => {
        event.preventDefault()
        
        try{
            const resp = await OtpService.sendOtpReq({emailVal})
            console.log("Otp Sent Sucessfylly", resp);            
        }catch(err){
            console.log("Can't send OTP.", err);
        }
    }
    return (
        <div className='form'>
            <form>
                <ButtonGroup size='lg' justified style={{marginBottom: 10}}>
                    <Button onClick={()=> setLogin(true)} appearance='primary' active >Login</Button>
                    <Button onClick={()=> setLogin(false)} appearance='primary' active >Signup</Button>
                </ButtonGroup>
                <h3>System User</h3>

                <Input type={"email"} placeholder={"Email ID"} onChange={setValueEmail} /><br />
                <Input type={"password"} placeholder={"Password"} onChange={setValuePass} /><br />

                <Input type={"text"} placeholder={"OTP"} onChange={setValueOtp} /><br />
                <Button onClick={sendOtpReq} appearance='ghost' active style={{marginBottom: 10}}>Send OTP</Button>
                
                <Button onClick={submitReq} appearance='ghost' active >Login</Button>

            </form>

            
        </div>
    )
}

export default LoginSystemUserForm