import { useState } from 'react';
import {Input, Button, ButtonGroup} from 'rsuite'
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import OrganizationUserServices from '../../services/OrganizationUser';
import { Props } from './type';

const SignupOrganizationUserForm = ({setLogin}: Props) =>{
    const navigate = useNavigate()

    const [firstNameVal, setFirstNameVal] = useState("")
    const [lastNameVal, setLastNameVal] = useState("")
    const [orgVal, setOrgVal] = useState("")

    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")

    const [dobVal, setDobVal] = useState("")
    const [dojVal, setDojVal] = useState("")

    const setValueFirstName = (value: string) =>{
        setFirstNameVal(value)
    }
    const setValueLastName = (value: string) => {
        setLastNameVal(value)
    }
    const setValueOrg = (value: string) =>{
        setOrgVal(value)
    }
    const setValueEmail = (value: string) =>{
        setEmailVal(value)
    }
    const setValuePass = (value: string) => {
        setPasswordVal(value)
    }
    const setValueDob = (value: string) =>{
        setDobVal(value)
    }
    const setValueDoj = (value: string) => {
        setDojVal(value)
    }


    const signupReq = async(event: any) => {
        event.preventDefault()
        const user = {
            _orginizationName: orgVal,
            isAdmin: false,
            firstName: firstNameVal,
            lastName: lastNameVal,
            email: emailVal,
            password: passwordVal,
            dob: dobVal,
            doj: dojVal
        }

        console.log(JSON.stringify(user));

        const data = await OrganizationUserServices.organizationUserSignupRequest(user)

        console.log(data);
            
    }



    return (
        <form>
            <ButtonGroup size='lg' justified style={{marginBottom: 10}}>
                <Button onClick={()=> setLogin(true)} appearance='primary' active >Login</Button>
                <Button onClick={()=> setLogin(false)} appearance='primary' active >Signup</Button>
            </ButtonGroup>
            <h3>Organization User</h3>
            <Input type={"text"} placeholder={"First Name"} onChange={setValueFirstName}/><br />
            <Input type={"text"} placeholder={"Last Name"} onChange={setValueLastName}/><br />

            <Input type={"email"} placeholder={"Email ID"} onChange={setValueEmail}/><br />
            <Input type={"password"} placeholder={"Password"} onChange={setValuePass}/><br />

            <Input type={"date"} placeholder={"Date of Birth"} onChange={setValueDob}/><br />
            <Input type={"date"} placeholder={"Date of Joining"} onChange={setValueDoj}/><br />

            <Input type={"text"} placeholder={"Organization Name"} onChange={setValueOrg}/><br />

            <Button onClick={signupReq} appearance='ghost'>Signup</Button>

        </form>

    )
}


export default SignupOrganizationUserForm