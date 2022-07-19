import React from "react";
import { Button,Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const {  user } = useUserAuth();

  
  return (
    <>
    <br/><br/>
    <Container style={{ width: "600px" }}>
      <div className="p-4 box mt-8 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      </Container>
    </>
  );
};

export default Home;
