import React, { useState } from 'react';
import {registerdb} from "../user/apiUser"
import { useHistory } from "react-router-dom";

function Register(props){
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confPass, setConfPass] = useState('');

    return (
        <div className="centerPage">
        <div className="container registerPage">
            <h1>Gelieve te registreren</h1>
            <form onSubmit={handleSubmit} className="wite">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" id="username" onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                
                <label htmlFor="confpassword">Confirm password</label>
                <input type="password" placeholder="Confirm Password" id="confpassword" onChange={(e) => setConfPass(e.target.value)}/>

                <button>Maak account</button>
            </form>
            </div>
        </div>
    );
    /**
     * When a user submits the form,
     * 1. preventDefault: https://www.w3schools.com/jsref/event_preventdefault.asp
     * 2. TODO: check if pass and confirm pass is the same
     * 3. registerdb calls the api
     * 4.1. TODO: Clear fields when input is wrong
     * 4.2. redirect to home page when login is succesfull
     * 
     */
    async function handleSubmit(e)
    {
        e.preventDefault();
        const result = await registerdb(email, password, username, confPass)
        console.log(result === true)        
        if(result === true){
            history.push("/login");

        }
    }


}

export default Register;
