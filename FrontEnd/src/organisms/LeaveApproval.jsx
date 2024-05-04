import React, { useState } from 'react'
import Button from '../atoms/Button'


const ApplicationRow = (props)=> {
    let {_id, orgName, email, createdDate, reason, status} = props.application
    let formattedDate = createdDate.split("T")[0]
    const [newStatus, setNewStatus] = useState(status)

    const acceptedLeaveReq = async () => {
        setNewStatus(newStatus => 1);

        const URL = "http://localhost:5500/application-status";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id,
                statusValue: 1,
            })
        })

        console.log(response);

    }
    const rejectedLeaveReq = async () => {
        setNewStatus(2);

        const URL = "http://localhost:5500/application-status";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id,
                statusValue: 2,
            })
        })

        console.log(response);
    }

    return <tr>
        <td>{orgName}</td>
        <td>{email}</td>
        <td>{formattedDate}</td>
        <td>{reason}</td>
        <td>
            {
                newStatus === 3 ? 
                <>
                    <Button content={"Approve"} onClickRef={acceptedLeaveReq}/>
                    <Button content={"Reject"} onClickRef={rejectedLeaveReq}/>
                </>
                :
                <>
                    {
                        newStatus === 1 ? <>Leave Approved</>
                        : <>Leave Rejected </>
                    }
                </>
            }
            
        </td>
    </tr>
}

const LeaveApproval = ({adminOrgData, wfhApplication}) => {
    return (
        <>
            <h1> Leave Component </h1>

            <table>
                <tr>
                    <th>Organization name</th>
                    <th>Email</th>
                    <th>Leave date</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>

                {
                    wfhApplication.map((application) => (
                        <ApplicationRow application={application}/>
                    ))
                }

            </table>

        </>
    )
}

export default LeaveApproval;