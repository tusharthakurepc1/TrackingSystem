import React, {useState} from 'react';
import Input from '../atoms/Input'
import "./style.scss"
import Button from '../atoms/Button';

const SignupSystemUserForm = () =>{
    const [firstNameVal, setFirstNameVal] = useState("")
    const [lastNameVal, setLastNameVal] = useState("")

    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")

    const [dobVal, setDobVal] = useState("")

    const setValueFirstName = (value) =>{
        setFirstNameVal(value.target.value)
    }
    const setValueLastName = (value) => {
        setLastNameVal(value.target.value)
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
    

    const signupReq = async(event) => {
        event.preventDefault()
        const user = {
            firstName: firstNameVal,
            lastName: lastNameVal,
            email: emailVal,
            password: passwordVal,
            dob: dobVal,
        }

        console.log(user);

        try{
            var ack = await fetch(`http://localhost:5500/sysuser-signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            console.log("Done");
        }catch(err){
            console.log(err);
        }

    }



    return (
        <form>
            <h3>System User</h3>
            <Input type={"text"} content={"First Name"} setValue={setValueFirstName}/><br />
            <Input type={"text"} content={"Last Name"} setValue={setValueLastName}/><br />

            <Input type={"email"} content={"Email ID"} setValue={setValueEmail}/><br />
            <Input type={"password"} content={"Password"} setValue={setValuePass}/><br />

            <Input type={"date"} content={"Date of Birth"} setValue={setValueDob}/>

            <Button onClickRef={signupReq} content={"Signup"} />

        </form>
    )
}


export default SignupSystemUserForm