import React , {useState } from 'react';
import { Button, Form,Container } from 'react-bootstrap';

import './ApplyLeave.css'


function ApplyLeave(props) {
    

    const [records , setRecords] = useState({
        name:"",
        city:"",
        connection: "",
    })

    // const nameHandler = (event) => {
    //     // setRecords({
    //     //     ...records,
    //     //     name: event.target.value
    //     // });
    //        
    //     // setRecords((oldState) => {
    //     //     return {...oldState,name: event.target.value}
    //     // })
    
    //     setname(event.target.value);
    //    // console.log(event.target.value);
    // }

    // const cityHandler = (event) => {
    //     // setRecords((oldState) => {
    //     //     return {...oldState,city: event.target.value}
    //     // })
    //    setcity(event.target.value);
    //     //console.log(event.target.value);
    // }

    // const connectHandler = (event) => {
    //     // setRecords((oldState) => {
    //     //     return {...oldState,connection: event.target.value}
    //     // })
    //    setconnection(event.target.value);
    //     //console.log(event.target.value);
    // }

    const handleAddFormChange=(event)=>{
        event.preventDefault();
    
        const fieldname=event.target.getAttribute('name');
        const value=event.target.value;
        const newformdata={...records};
        newformdata[fieldname]=value;
        setRecords(newformdata);

      }

    const submitHandler = (event) => {
        event.preventDefault();
        
       records.slno= props.details.length===0?1:props.details[props.details.length-1].slno+1;
        records.status="Pending";
         props.onSave(records);
         event.target[0].value='';
         event.target[1].value='';
         event.target[2].value='';
    //    setname('');
    //    setcity('');
    //    setconnection('');
        alert("Leave Applied Succesfully");
    }

  


    return (<>
       
       <div className="leave">
        <Form onSubmit={submitHandler}>
            <br></br><br></br>
            <h2 > Leave Form</h2><br></br><br></br>
                <Form.Label id="appl" for="name">NAME</Form.Label>
                {/* <input type="number" value={userId} onChange={userIdHandler}  /> */}
                <Form.Control id="Name" name="name" type="text"   onChange={handleAddFormChange}  />
                 <br></br><br></br>
            
                <Form.Label id="appl" for="city">CITY</Form.Label>
                <Form.Control id="City" name="city" type="text"   onChange={handleAddFormChange}/>
                <br></br><br></br>
                <Form.Label id="appl" for="connection">CONNECTION</Form.Label>
                <Form.Control id="Conn" name="connection" type="text"  onChange={handleAddFormChange} />
                <br></br><br></br><br></br>
            <Button size='md' variant='success' id="hf" type="submit">Apply Leave</Button>
            
        </Form>
        </div>
        

        
    </>

    );
}

export default ApplyLeave;



