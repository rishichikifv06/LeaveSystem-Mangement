import React, { useState } from 'react';



const AuthContext = React.createContext({

token:'',

isUserLoggedIn: false,

login: (token) => {},

logout: () => {}

});



export const AuthContextProvider = (props) => {



const tokenvalue = localStorage.getItem('token');

const [token,setToken] = useState(tokenvalue);



const userIsLoggedIn = !!token;



const loginHandler = (token) => {

setToken(token);

localStorage.setItem('token',token)

}



const logOutHandler = () => {

setToken(null);

localStorage.removeItem('token')

}



const AuthValue = {

token : token,

isUserLoggedIn: userIsLoggedIn,

login:loginHandler,

logout: logOutHandler

}



return (

<AuthContext.Provider value={AuthValue}>

{props.children}

</AuthContext.Provider>

)

}



export default AuthContext;