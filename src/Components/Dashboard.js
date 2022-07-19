import React from "react";
import { Container } from "react-bootstrap";



const Dashboard = () => {
  
  return (
    <>
    <br/><br/>
    <Container style={{ width: "600px" }}>
        
      <div className="p-4 box mt-2 text-center">
      <h1 style={{textAlign:'center'}}>Dashboard</h1>
        Hello Welcome Admin
        <br /><br /><br /><br /><br /><br />
      </div>
      </Container>
    </>
  );
};

export default Dashboard;