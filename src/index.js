import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter  } from 'react-router-dom';
import { AuthContextProvider } from './Authcontext';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <AuthContextProvider >
   <BrowserRouter> 
  
  <React.StrictMode>
    <UserAuthContextProvider>
    <App />
    </UserAuthContextProvider>
      
  </React.StrictMode>
  
    </BrowserRouter> 

  // </AuthContextProvider>
);
reportWebVitals();


