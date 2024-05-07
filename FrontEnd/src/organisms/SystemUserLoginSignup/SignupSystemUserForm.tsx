import {useState} from 'react';
import "./style.scss"

import {Button, ButtonGroup, Input} from 'rsuite'
import WFHApplicationServices from '../../services/WFHApplication';
import { Props } from './type';

const SignupSystemUserForm = ({setLogin}: Props) =>{
    const [firstNameVal, setFirstNameVal] = useState("")
    const [lastNameVal, setLastNameVal] = useState("")

    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")

    const [dobVal, setDobVal] = useState("")

    const setValueFirstName = (value: string) =>{
        setFirstNameVal(value)
    }
    const setValueLastName = (value: string) => {
        setLastNameVal(value)
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
    

    const signupReq = async(event: any) => {
        event.preventDefault()
        const user = {
            firstName: firstNameVal,
            lastName: lastNameVal,
            email: emailVal,
            password: passwordVal,
            dob: dobVal,
        }

        //Api call from Services
        const data = await WFHApplicationServices.wFHApplicationSignupRequest(user)
        console.log(data);
    }



    return (
        <form>
            <ButtonGroup size='lg' justified style={{marginBottom: 10}}>
                <Button onClick={()=> setLogin(true)} appearance='primary' active >Login</Button>
                <Button onClick={()=> setLogin(false)} appearance='primary' active >Signup</Button>
            </ButtonGroup>
            <h3>System User</h3>
            <Input type={"text"} placeholder={"First Name"} onChange={setValueFirstName} name=''/><br />
            <Input type={"text"} placeholder={"Last Name"} onChange={setValueLastName} name=''/><br />

            <Input type={"email"} placeholder={"Email ID"} onChange={setValueEmail} name=''/><br />
            <Input type={"password"} placeholder={"Password"} onChange={setValuePass} name=''/><br />

            <Input type={"date"} placeholder={"Date of Birth"} onChange={setValueDob} name=''/>

            <Button onClick={signupReq} appearance='ghost'>Signup</Button>

        </form>
    )
}


export default SignupSystemUserForm