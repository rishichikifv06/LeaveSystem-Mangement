import React , {useState} from 'react';
//import TableDiv from './Table/Table';
import { Button, Form,Table } from 'react-bootstrap';
import Example from './ViewDetail'

import 'bootstrap/dist/css/bootstrap.min.css'
import './TableComponent.css'



//import './TableComponent.css';

function TableComponent(props) {
    // const [searchTitle,SetSearchTitle] = useState('ee');

    const [searchResult,setSearchResult] = useState(props.details);
    
    // useEffect(()=> {
    //     alert('tilte chnaged');
    // },[title,searchResult])

    
   
   
    const [showform,SetVisible] = useState(false);

    // const [title,changeTitle] = useState(props.title)

   
    // const headers = Object.keys(props.details[0]).map(item =>
    //     <th key={item}>{item.toUpperCase()}</th>
    // );

    const filterHandler = (e) => {
      
        let results;
      if(e.type==='change'){
            const searchText = e.target.value;
          if (searchText.length != 0) {
             results = props.details.filter(item => {
                return item.name.toLowerCase().includes(searchText.toLowerCase())||item.slno==searchText;
          }); 
          }else{
             results=searchResult;
          }
      }else if(e.target.value==='P') {
          results=props.details.filter(item=>{
            return item.status==="Pending";
        });
      }else if(e.target.value==='A') {
          results=props.details.filter(item=>{
            return item.status==="Approved";
        });
      }else if(e.target.value==='R') {
          results=props.details.filter(item=>{
            return item.status==="Rejected";
        });
      }else if(e.target.value==='C') {
        results=props.details;

    }
        setSearchResult(results); 
    }
     
    const showConfirm = (id) => {
        const result = searchResult.filter(item => {
            return item.slno === id;
        });
        alert("Name : "+result[0].name+" "+"\nstatus : "+result[0].status);
    }
    
    

    

     
    
   
    
    const showFormHandler = () => {
        const visible = !showform;
        SetVisible(visible);
    }

    

    // const updateTitleHandler = () => {
    //     //props.title = 'updated';
    //     changeTitle('updated');
    //     console.log('clicked');
    // }

    const saveHandler = (newrecord) => {
        props.onSave(newrecord);
        setSearchResult([...props.details,newrecord]);
        
    }

    const OnDelete=(item)=>{
      const records=props.details.filter((e)=>{
        return e!==item;
      })
      setSearchResult(records);
      props.OnDelete(records);
    }

    const OnAccept=(item,type)=>{
      const records=props.details.filter((e)=>{
        return e==item;
      })
      const newrecord=records[0];
      newrecord.status=type;
      const newrecords=[...searchResult];
      const index=searchResult.findIndex((e)=>e.slno===item.slno);
      newrecords[index]=newrecord;
      setSearchResult(newrecords);
      props.OnAccept(newrecord);
    }

    const fetchLeaves=()=>{
      fetch('https://reactjs-82283-default-rtdb.firebaseio.com/leaves.json').then(data=>{
        return data.json();
      }).then(data=>{
        let newdata=[];
        for(const key in data){
          newdata.push(data[key]);
        }
        console.log(newdata);
       setSearchResult(newdata);
      })
     }
     function CountNo(status){
      let count=0;
      if(status==="total"){
        count=props.details.length;
        return count;
      }
       count=props.details.filter(item=>{return item.status===status;}).length;
     
      return count;
     }
    
     
     

    return (
        <div>
          
            {/* <h1 style={{color: title === 'jk' ? 'green' : 'red'}}>JK React Course</h1>
            
            <h1 className={`title ${title === 'jk' ? 'greenClass' : 'redClass'}`}>JK React Course</h1>
            
            {title === 'jk' ? (<><h1>{title}</h1><h1>No Update for title so far.....</h1></>) : <h1>{title}</h1> }
            <Button variant="success" id="hff" onClick={updateTitleHandler}>Update Title</Button><br/><br/> */}
          
            {/* <Button id="fet" onClick={fetchLeaves}>Fetch Data</Button> */}
           
          {/* {'  '} <Button variant="success"  id="hff" onClick={showFormHandler}> Leave Form</Button>
            {showform ? <ApplyLeave details={props.details} onSave={saveHandler} /> : ''}
            <br/><br/> */}
         <div className='row'>
         <div id="blc" >
          <h6 style={{paddingLeft:'150px',paddingTop:'8px',color:'gray'}}>Pending</h6>
          <h3 style={{paddingLeft:'110px'}}>Count({CountNo("Pending")})</h3>
          <hr style= {{ marginTop:'2px',marginBottom: '0.35em' ,borderWidth: '1px'}}></hr>
          <h6 style={{paddingLeft:'60px',paddingTop:'5px',margin:'0px',color:'gray'}}>Pending Count</h6>
         </div>

         <div id="acnt">
          <h6 style={{paddingLeft:'150px',paddingTop:'8px',color:'gray'}}>Approved</h6>
          <h3 style={{paddingLeft:'110px'}}>Count({CountNo("Approved")})</h3>
          <hr style= {{ marginTop:'0.35em',marginBottom: '0.35em' ,borderWidth: '1px'}}></hr>
          <h6 style={{paddingLeft:'55px',paddingTop:'5px',margin:'0px',color:'gray'}}>Approved Count</h6>
         </div>

         <div id="acnt">
          <h6 style={{paddingLeft:'150px',paddingTop:'8px',color:'gray'}}>Rejected</h6>
          <h3 style={{paddingLeft:'110px'}}>Count({CountNo("Rejected")})</h3>
          <hr style= {{ marginTop:'0.35em',marginBottom: '0.35em' ,borderWidth: '1px'}}></hr>
          <h6 style={{paddingLeft:'55px',paddingTop:'5px',margin:'0px',color:'gray'}}>Rejected Count</h6>
         </div>
         
         <div id="acnt">
          <h6 style={{paddingLeft:'150px',paddingTop:'8px',color:'gray'}}>Summary</h6>
          <h3 style={{paddingLeft:'110px'}}>Count({CountNo("total")})</h3>
          <hr style= {{ marginTop:'0.35em',marginBottom: '0.35em' ,borderWidth: '1px'}}></hr>
          <h6 style={{paddingLeft:'70px',paddingTop:'5px',margin:'0px',color:'gray'}}>Summary</h6>
         </div>
         </div>
         <br></br><br></br>
        <div className='container'>
            <Button size="sm" variant="warning" id="btnn" value={'P'} onClick={filterHandler}>PENDING</Button>   
            <Button size="sm" variant="success" id="btn" value={'A'} onClick={filterHandler}>APPROVED</Button> 
            <Button size="sm" variant="danger" id="btn" value={'R'} onClick={filterHandler}>REJECTED</Button>
            <Button size="sm" variant="secondary" id="btn" value={'C'} onClick={filterHandler}>CLEAR ALL</Button>  
            <Form.Label  id="Frml" >Search</Form.Label> 
            <Form.Control id="Frmc"  type="text" onChange={filterHandler} placeholder='Search Name or ID'  /><br/>
            <br/>
        <Table  striped  hover size="sm">
          <thead>
            <tr>
                {/* {headers} <th>Action</th> */}
                <th>SLNO</th>
                <th>NAME</th>
                <th>CITY</th>
                <th>CONNECTION</th>
                <th>STATUS</th>
                <th style={{paddingLeft:'115px'}}> ACTION</th>
            </tr>
            </thead>
            <tbody>
        {props.details.length===0?"No record to display":
         searchResult.map(item=>{
            return(
            //<tr  key={item.slno}  style={{backgroundColor:item.status==="Rejected"?'light-danger':'white'}}>
            <tr  key={item.slno} >
            <td >{item.slno}</td>
            <td >{item.name}</td>
            <td >{item.city}</td>
            <td>{item.connection}</td>
            <td>{item.status}</td>
            <td> {item.status==='Pending'?(
            <><Button variant="success" size="sm" onClick={()=>{OnAccept(item,'Approved')}} id="acc">ACCEPT</Button> 
            <Button variant="danger" size="sm" onClick={()=>{OnAccept(item,'Rejected')}} id="acc">REJECT</Button>
            <Example  slno={item.slno} details={props.details}></Example></>)
            :(<><span> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</span>
            <Example slno={item.slno} details={props.details}></Example></>)}</td>
          
            <td>{<Button variant="outline-danger" size="sm" onClick={()=>{OnDelete(item)}} >DELETE</Button>}</td>
           
            </tr>
         )})}
         </tbody>
        </Table>
       
        </div>
        </div>
    );
}

export default TableComponent;
