import { useState } from 'react'
import axios from 'axios'
import { Table, Button, SelectPicker, ButtonGroup } from 'rsuite';
const {Column, HeaderCell, Cell } = Table;
import WFHApplicationServices  from '../../services/WFHApplication'
import { UserStructure } from './type';
import './style.scss'



const ApplicationRow = (props: any)=> {
    let {_id, orgName, email, createdDate, reason, status} = props.application
    let formattedDate = createdDate.split("T")[0]
    const [newStatus, setNewStatus] = useState<number>(status)

    const acceptedLeaveReq = async () => {
        setNewStatus(1)
        //Leave Accepted Service
        const response = await WFHApplicationServices.acceptedLeaveReq(_id);
        console.log(response);

    }
    const rejectedLeaveReq = async () => {
        setNewStatus(2);
        //Leave Rejected Service
        const response = await WFHApplicationServices.rejectedLeaveReq(_id)
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
                    <Button value={"Approve"} onClick={acceptedLeaveReq}/>
                    <Button value={"Reject"} onClick={rejectedLeaveReq}/>
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

const LeaveApproval = ({wfhApplication}: any) => {
    let {_id} = wfhApplication
    // const [newStatus, setNewStatus] = useState<number>(status)

    const acceptedLeaveReq = async () => {
        // setNewStatus(1);
        const URL = "http://localhost:5500/application-status";

        const headers = {
            'Content-Type': 'application/json',
        }
        const post_dashboard_api = await axios.post(URL, JSON.stringify({_id, statusValue: 1}), {headers})
        const response = post_dashboard_api.data;

        console.log(response);

    }

    const rejectedLeaveReq = async () => {
        // setNewStatus(2);
        const URL = "http://localhost:5500/application-status";

        const headers = {
            'Content-Type': 'application/json'
        }
        const post_dashboard_api = await axios.post(URL, JSON.stringify({_id, statusValue: 2}), {headers})
        const response = post_dashboard_api.data;

        console.log(response);
    }

    return (
        <>
            <h1> Leave Requests </h1>
            <div className='table-user'>

            <Table
                data={wfhApplication}
                height={500}
            >
                <Column width={60} align="center">
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey='orgName' />
                </Column>

                <Column width={200} align="center">
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey='email'/>
                </Column>
                <Column width={200} align="center">
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey= 'createdDate' />
                </Column>
                <Column width={200} align="center">
                    <HeaderCell>Reason</HeaderCell>
                    <Cell dataKey='reason'/>
                </Column>

                <Column align='center' width={150} >
                    <HeaderCell>Status</HeaderCell>
                    <Cell style={{ padding: '6px' }}>
                        
                        {
                            rowData => (
                                rowData.status === 3 ?
                                    <ButtonGroup>
                                        <Button onClick={()=>{acceptedLeaveReq}} appearance='ghost' active style={{padding: '3px 5px'}}>Accept</Button>
                                        <Button onClick={()=>{rejectedLeaveReq}} appearance='ghost' active style={{padding: '3px 5px'}}>Reject</Button>
                                    </ButtonGroup>
                                :
                                <>
                                    {
                                        rowData.status === 1 ? <>Leave Approved</>
                                        : <>Leave Rejected </>
                                    }
                                </>
                                
                            )
                        }
                    </Cell>
                </Column>

            </Table>

            
            </div>

        </>
    )
}

export default LeaveApproval;