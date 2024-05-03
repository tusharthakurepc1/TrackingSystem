import React, { useState } from 'react';
import Button from '../atoms/Button'
import { useNavigate } from 'react-router-dom';
import './style.scss'

const UserTile = (props) => {
    const navigate = useNavigate()
    let { _id, firstName, lastName, email, dob, doj, orgination_list } = props.item;
    const [organizationValue, setOrganizationValue] = useState("");
    const [orgList, setOrgList] = useState(orgination_list)

    const deleteUser = async () => {
        if(organizationValue === 'Select'){
            return
        }

        const URL = "http://localhost:5500/user-delete"

        const response = await fetch(URL, {

            method: "POST", 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                _id,
                email,
                organizationValue
            })
        })
        const result = await response.json()
        console.log(result);

        if(result.user.acknowledged === true){
            console.log("Delete Ack: ",result);
            navigate("/temp")
        }

    }

    const changeOrgValue = (event) => {
        setOrganizationValue(event.target.value)
    }

    return (
        <tr>
            <td>{firstName} {lastName}</td>
            <td>{email}</td>
            <td>{dob}</td>
            <td>{doj}</td>
            <td>
                
                <select onChange={changeOrgValue}>
                    <option value={"Select"}>Select</option>
                    {
                        orgList.map((value)=>(
                            <option value={value}>{value}</option>
                        ))
                    }
                </select>
            </td>
            <td><Button content={"Update"} /></td>
            <td><Button content={"Delete"} onClickRef={deleteUser}/></td>
            
        </tr>
    )
}

export default UserTile;