import React, { useEffect, useState,Suspense,useContext } from 'react';
import Header from './UI/Header/Header';
import {Routes, Router, Route ,Redirect  , Switch, Navigate, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {  Row, Col } from "react-bootstrap";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
//import { UserAuthContextProvider } from "./context/UserAuthContext";
import Dashboard from './Components/Dashboard'
import {Link} from 'react-router-dom';
import { Navbar,Nav,Container,NavLink ,Button} from "react-bootstrap";
import { useUserAuth } from "./context/UserAuthContext";


const TableComponent=React.lazy(()=>import('./Components/TableComponent/TableComponent'));
const ApplyLeave=React.lazy(()=>import('./Components/ApplyLeave/ApplyLeave'));

function App() {
  //localStorage.removeItem("details");

  const myStyle={
    backgroundImage: 
"url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    height:'100vh',
    // marginTop:'-70px',
    // fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  
  
    const  { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }
     
  let detail;
  debugger;
  if(localStorage.getItem("details")!=null){
  
  detail=[
    {
      "slno":1,
      "name": "Abhi",
      "city": "India",
      "connection": "Good",
      "status": "Pending"
    },
    {
      "slno":2,
      "name": "Abhishek",
      "city": "India",
      "connection": "Very Strong",
      "status": "Approved"
    },
   
]
}else{
 
 detail=JSON.parse(localStorage.getItem("details"));
}
  const [details,setdetails] = useState(detail);
  
  useEffect(()=>{
    localStorage.setItem("details",JSON.stringify(details));
  },[details]);


 
  const compnayname = 'jk';

  async function addleave(details){
    await fetch('https://reactjs-82283-default-rtdb.firebaseio.com/leaves.json',{
      method:'POST',
      body:JSON.stringify(details),
      headers:{
      'content-type':'application/json'
      }
    });
    //console.log(await response.json());
  }



  const saveHandler = (newrecord) => {
    setdetails([...details,newrecord]);
    //addleave(newrecord);
  }
  

  const OnDelete=(item)=>{
   setdetails(item);
   localStorage.setItem("details",JSON.stringify(details));
  }

  const OnAccept=(newrecord)=>{
    const newrecords=[...details];
      const index=details.findIndex((e)=>e.slno===newrecord.slno);
      newrecords[index]=newrecord;
      setdetails(newrecords);
    }

  // return React.createElement('div',{},React.createElement('h1',{},'Welcome to'),React.createElement('p',{},'same'));
  // return React.createElement('div',{},'');
  // return React.createElement('h1',{},'welcome to');
  // return React.createElement('p',{},'same');
  //details={details}
  return <>
   <div style={myStyle}>
       <Navbar expand='lg' className='gap-3 px-3' bg="dark" variant="dark">
      <Navbar.Brand href="#home">WebSiteName</Navbar.Brand>
      <Nav  className="me-auto">
        <NavLink as={Link}  to="/home" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }>Home</NavLink>
       {user && user.email!='admin@gmail.com'? <NavLink  as={Link} to="/applyleave" element={
                  <ProtectedRoute>
                    <ApplyLeave details={details} onSave={saveHandler}/>
                  </ProtectedRoute>
                }>Apply Leave</NavLink>:''    
       }
       {user && user.email=='admin@gmail.com'?
        <NavLink as={Link}  to="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }>Dashboard</NavLink>:''
       }
     { user && user.email=='admin@gmail.com'? <NavLink  as={Link} to="/usermanagement" element={
                  <ProtectedRoute>
                    <TableComponent details={details} OnAccept={OnAccept} onSave={saveHandler} OnDelete={OnDelete} title={compnayname} name="sample name"/>
                  </ProtectedRoute>
                }>Leave Management</NavLink>:''
              
            }  
      </Nav>
      
     {user? <Navbar.Collapse className="justify-content-end gap-3 px-3">
     
          <Navbar.Text>
            Signed in as: <a href="#login">{user && user.email}</a>
          </Navbar.Text> 
          <Button variant="outline-light" >{
            user.email=='admin@gmail.com'?'Admin':'User' 
          }</Button>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>:''
       }
        
      </Navbar>
      <br/>
  <Container >
      <Row>
        <Col>

        {/* <UserAuthContextProvider> */}
        <Suspense>
            <Routes>
          
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/applyleave"
                element={
                  <ProtectedRoute>
                    <ApplyLeave details={details} onSave={saveHandler}/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usermanagement"
                element={
                  <ProtectedRoute>
                    <TableComponent details={details} OnAccept={OnAccept} onSave={saveHandler} OnDelete={OnDelete} title={compnayname} name="sample name"/>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
             
            </Routes>
            </Suspense>
          {/* </UserAuthContextProvider> */}
        </Col>
      </Row>
    </Container>



    {/* <Router> */}
      {/* <Switch> */}
  {/* <Suspense> */}
    {/* {authContext.isUserLoggedIn &&
     <Route path='/applyleave' element={<ApplyLeave details={details} onSave={saveHandler}/>}/>
    } */}
    {/* {authContext.isUserLoggedIn?<Route path='/applyleave' element={<ApplyLeave details={details} onSave={saveHandler}/>}/>:<Route path='/' element={<SignUp/>}/> }
   */}
    {/* <Route path='/' element={<SignUp/>}/>
    <Route path='/applyleave' >
    {authContext.isUserLoggedIn && <ApplyLeave details={details} onSave={saveHandler}/>}
    </Route> */}
{/*    
   <Route path="/" >
   <SignUp   Onlogin={Onlogin}/>
   </Route>
   { authContext.isUserLoggedIn &&
  <Route path='/applyleave' exact >
    <ApplyLeave details={details} onSave={saveHandler}/>
    </Route> 
    }
   <Route path='/applyleave' exact >
  {authContext.isUserLoggedIn && <ApplyLeave details={details} onSave={saveHandler}/>}
  {!authContext.isUserLoggedIn && <Redirect to='/'/> }
  </Route> */}
   {/* {authContext.isUserLoggedIn && 
  <Route path="/usermanagement" exact>
  <TableComponent details={details} onSave={saveHandler} OnDelete={OnDelete} title={compnayname} name="sample name"/>
  </Route>
  } 
  <Route path="/usermanagement" exact>
  {authContext.isUserLoggedIn &&  <TableComponent details={details} onSave={saveHandler} OnDelete={OnDelete} title={compnayname} name="sample name"/>}
  {!authContext.isUserLoggedIn && <Navigate replace to="/" /> }
  </Route> */}
  {/* </Suspense> */}
  {/* </Switch> */}
  {/* </Router> */}
  </div>
  
 </>
}

export default App;
