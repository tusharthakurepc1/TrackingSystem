import { Modal, Button, Placeholder } from 'rsuite';

interface Props{
  openApplication: boolean,
  setOpenApplication: Function
}

const WfhApplicationForm = ({openApplication, setOpenApplication}: Props) => {
  const closeApplication = () => {
    setOpenApplication(false)
  }


  return (
    <>
      <Modal overflow={true} open={openApplication} onClose={closeApplication}>
        <Modal.Header>
          <Modal.Title>Work From Home Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph rows={80} />
        </Modal.Body>
        <Modal.Footer>
          
          <Button onClick={closeApplication} appearance="primary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default WfhApplicationForm;
