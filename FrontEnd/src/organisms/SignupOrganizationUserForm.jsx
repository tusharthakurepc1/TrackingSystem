import React, {useState} from 'react';
import Input from '../atoms/Input'
import "./style.scss"
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';

const SignupOrganizationUserForm = () =>{
    const navigate = useNavigate()

    const [firstNameVal, setFirstNameVal] = useState("")
    const [lastNameVal, setLastNameVal] = useState("")
    const [orgVal, setOrgVal] = useState("")

    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")

    const [dobVal, setDobVal] = useState("")
    const [dojVal, setDojVal] = useState("")

    const setValueFirstName = (value) =>{
        setFirstNameVal(value.target.value)
    }
    const setValueLastName = (value) => {
        setLastNameVal(value.target.value)
    }
    const setValueOrg = (value) =>{
        setOrgVal(value.target.value)
    }
    const setValueEmail = (value) =>{
        setEmailVal(value.target.value)
    }
    const setValuePass = (value) => {
        setPasswordVal(value.target.value)
    }
    const setValueDob = (value) =>{
        setDobVal(value.target.value)
    }
    const setValueDoj = (value) => {
        setDojVal(value.target.value)
    }


    const signupReq = async(event) => {
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

        try{
            const headers = {
                'Content-Type': 'application/json'
            }

            var response = await axios.post(`http://localhost:5500/user-signup`, JSON.stringify(user), headers);
            const data = response.data
            console.log(data);
            // if(data.msg){
            //     alert(data.msg)
            // }
            // if(response.status === 200){
            //     navigate("/")
            // }
            

        }catch(err){
            console.log(err);
        }

    }



    return (
        <form>
            <h3>Orginization User</h3>
            <Input type={"text"} content={"First Name"} setValue={setValueFirstName}/><br />
            <Input type={"text"} content={"Last Name"} setValue={setValueLastName}/><br />

            <Input type={"email"} content={"Email ID"} setValue={setValueEmail}/><br />
            <Input type={"password"} content={"Password"} setValue={setValuePass}/><br />

            <Input type={"date"} content={"Date of Birth"} setValue={setValueDob}/>
            <Input type={"date"} content={"Date of Joining"} setValue={setValueDoj}/><br />

            <Input type={"text"} content={"Organization Name"} setValue={setValueOrg}/><br />

            <Button onClickRef={signupReq} content={"Signup"} />

        </form>

    )
}


export default SignupOrganizationUserForm