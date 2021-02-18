import React, { useState } from 'react';
import {registerdb} from "../user/apiUser"
import { useHistory } from "react-router-dom";

function Register(props){
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <div className="containter">
            <h1>Gelieve in te loggen</h1>
            <form onSubmit={handleSubmit} className="wite">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="username">username</label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="password">password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                
                <label htmlFor="confpassword">confirm password</label>
                <input type="password" id="confpassword" onChange={console.log("")}/>

                <button>login</button>
            </form>
            
        </div>
    );
    /**
     * When a user submits the form,
     * 1. preventDefault: https://www.w3schools.com/jsref/event_preventdefault.asp
     * 2. TODO: check if pass and confirm pass is the same
     * 3. registerdb calls the api
     * 4.1. TODO: Clear fields when input is wrong
     * 4.2. TODO: redirect to home page when login is succesfull
     * 
     */
    function handleSubmit(e)
    {
        e.preventDefault();
        registerdb(email, password, username)
        //temporarily success always true. should change based on the registerdb function
        const success = true
        if(success){
            
        }
    }


}

export default Register;