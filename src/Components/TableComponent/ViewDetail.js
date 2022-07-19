import { React,useState} from "react";
import {Button,  Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import './TableComponent.css'

const Example=(props)=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const details=props.details;
  
  const result = details.filter(item => {
    return item.slno == props.slno;
});
   

  return (
    <>
      <Button variant="outline-dark" id="vww"   size="sm" onClick={handleShow}>
        VIEW DETAIL
      </Button>

      <Modal  size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
        <Modal.Header style={{backgroundColor:'lightblue'}} closeButton>
          <Modal.Title style={{paddingLeft:'100px'}}>Employee details</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <div style={{paddingLeft:'100px'}}>
        <h5 >SLNO :  {result[0].slno}</h5>
        <h5 >NAME : {result[0].name}</h5>
        <h5 >CITY :  {result[0].city}</h5>
        <h5 >CONNECTION : {result[0].connection}</h5>
        <h5 >STATUS : {result[0].status}</h5>
        </div>
        </Modal.Body>
        <Modal.Footer style={{paddingRight:'200px'}}>
          <Button style={{padding:'4px 35px'}} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;