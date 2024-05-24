//module
import { useEffect, useState } from "react";
import { Modal, Panel, Table, Button, Input } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

//service
import OrganizationServices from "../../services/Organization";

//type
import { Organization } from "../../typings/Organization";
import { OrganizationData, OrganizationFlags } from './OrganizationManage.type'

//css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrganizationManage = () => {

  //state
  const [allOrganization, setAllOrganization] = useState<Organization[]>([]);
  const [flagUpdate, setFlagUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [orgDetails, setOrgDetails] = useState<OrganizationData>({name: "", max_wfh: ""})
  const [orgFlags, setOrgFlags] = useState<OrganizationFlags>({name: false, max_wfh: false});

  //state setters
  const setOrgName = (value: string) => {
    if(!value || value === ''){
      let newFlags: OrganizationFlags = {
        ...orgFlags,
        name: true
      } 
      setOrgFlags(newFlags)
    }
    else{
      let newFlags: OrganizationFlags = {
        ...orgFlags,
        name: false
      } 
      setOrgFlags(newFlags)
    }

    let newData: OrganizationData = {
      ...orgDetails,
      name: value
    }

    setOrgDetails(newData)
  }
  const setOrgWfh = (value: string) => {
    if(!value || value === ''){
      let newFlags: OrganizationFlags = {
        ...orgFlags,
        max_wfh: true
      } 
      setOrgFlags(newFlags)
    }
    else{
      let newFlags: OrganizationFlags = {
        ...orgFlags,
        max_wfh: false
      } 
      setOrgFlags(newFlags)
    }


    let newData: OrganizationData = {
      ...orgDetails,
      max_wfh: value
    }

    setOrgDetails(newData)
  }

  //organization create helper function
  const createOrganizationHelper = async () => {
    //Validation of orgname and max_wfh 
    if(!orgDetails.name || orgDetails.name === ''){
      let newFlags: OrganizationFlags = {
        ...orgFlags,
        max_wfh: true
      } 
      setOrgFlags(newFlags)
      return;
    }
    if(!orgDetails.max_wfh || orgDetails.max_wfh === ''){
      let newFlags: OrganizationFlags = {
        ...orgFlags,
        max_wfh: true
      } 
      setOrgFlags(newFlags)
      return;
    }

    const response = await OrganizationServices.addOrganization(orgDetails);

    console.log(response);
    if(response.status && response.status === 200){
      toast.success(response.data.msg)
    }
    else{
      toast.error(response.data.msg)
    }

    setOrgDetails({name: "", max_wfh: ""})
    setFlagUpdate(!flagUpdate)
    handleClose()
  }

  const removeOrganizationData = async (_id: string, orgName: string) => {
    const response = await OrganizationServices.removeOrganization(_id, orgName);

    console.log(response.data)
    if(response.status && response.status === 200){
      toast.success(response.data.msg)
    }
    else{
      toast.error(response.data.msg)
    }
    setFlagUpdate(!flagUpdate)
  }

  useEffect(() => {
    const fetchOrganizationData = async () => {
      const response = await OrganizationServices.getAllOrganizationData();

      console.log(response.data);
      if (response.data) {
        setAllOrganization(response.data);
      }
    };

    fetchOrganizationData();
  }, [flagUpdate]);

  return (
    <>
      <Panel header="Organization Portal">
        <Button appearance="primary" onClick={handleOpen}>
          Add Organization
        </Button>
        <Table
          height={400}
          data={allOrganization}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          <Column flexGrow={1}>
            <HeaderCell>Organization</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Work From Home</HeaderCell>
            <Cell dataKey="max_wfh" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Employee Count</HeaderCell>
            <Cell>
              {rowData => (
                <span >
                  {rowData.userEmail.length}
                </span>
              )}
            </Cell>
          </Column>

          <Column flexGrow={2}>
            <HeaderCell>Admin</HeaderCell>
            <Cell dataKey="admin" />
          </Column>

          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => {
                    removeOrganizationData(rowData._id, rowData.orgName)
                  }}
                >
                  Delete
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </Panel>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile-item">
            Organization Name
            <Input
              type="text"
              size="lg"
              value={orgDetails.name}
              style={{ width: 400 }}
              onChange={setOrgName}
            />
            <span className="error-msg" hidden={!orgFlags.name}>
              Invalid Organization Name
            </span>
          </div>

          <div className="profile-item">
            Maximum work from home
            <Input
              type="number"
              size="lg"
              value={orgDetails.max_wfh}
              style={{ width: 400 }}
              onChange={setOrgWfh}
            />
            <span className="error-msg" hidden={!orgFlags.max_wfh}>
              Invalid work from home!!
            </span>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createOrganizationHelper} appearance="primary">
            Create
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer />
    </>
  );
};

export default OrganizationManage;
