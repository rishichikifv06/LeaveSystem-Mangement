import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDKzhzrc_Yg54swPhdZ8Jg83cRNOgJjb5g",
    authDomain: "newproject-28484.firebaseapp.com",
    projectId: "newproject-28484",
    storageBucket: "newproject-28484.appspot.com",
    messagingSenderId: "66596329607",
    appId: "1:66596329607:web:57381741f5c5c49011c022"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;