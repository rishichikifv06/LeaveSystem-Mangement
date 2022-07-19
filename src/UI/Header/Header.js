import React, { useState }  from "react";
import {Link} from 'react-router-dom';
import { Navbar,Nav,Container,NavLink } from "react-bootstrap";
import ProtectedRoute from "../../Components/ProtectedRoute";

const Header =()=>{

    return(
      
      <><Navbar bg="dark" variant="dark">
        <h1>Welcome</h1>
      <Container>
      <Navbar.Brand href="#home">Welcome to Apply Leave System</Navbar.Brand>
      <Nav  className="me-auto">
      <ProtectedRoute>
        <NavLink as={Link}  to="/home" >Home</NavLink>
        </ProtectedRoute>

        <ProtectedRoute>
        <NavLink  as={Link} to="/applyleave">Apply Leave</NavLink>
        </ProtectedRoute>

        <ProtectedRoute>
        <NavLink  as={Link} to="/usermanagement">Leave Management</NavLink>
        </ProtectedRoute>
      </Nav>
      </Container>
    </Navbar></>
    );
}

export default Header