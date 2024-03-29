import React, { useState } from 'react';
import {logindb} from "../user/apiUser"
import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import { StaticRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";

// TODO login ---> Login
function Login(props)
{
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <div className="centerPage">
        <div className="loginPage">
            <h1>Gelieve in te loggen</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Username" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Wachtwoord</label>
                <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button>Inloggen</button>
                <div onClick={navToRegister}>Nog geen account? klik <b>hier</b> om een nieuw account aan te maken</div>
            </form>
            <div>
                <p id="error" className="error" style={{display: "none"}}>Foute email of wachtwoord</p>
            </div>
        </div>
        </div>
    );

    /**
     * When a user submits the form,
     * 1. preventDefault: https://www.w3schools.com/jsref/event_preventdefault.asp
     * 2. logindb calls the api
     * 3.1. TODO: Clear fields when input is wrong
     * 3.2. TODO: redirect to home page when login is succesful
     */

     function navToRegister(){
        history.push('register')
     }
    async function handleSubmit(e)
    {
        e.preventDefault();
        console.log("test:")

        const result = await logindb(email, password)
        console.log("result:")
        if(result.email != null){
            props.loginUser(result.email, result.username, result.voornaam, result.jobs)
            history.push("/");
        }
        else{
            var elem = document.getElementById("error")
            if (elem.style.display === "none") {
                elem.style.display = "block";
              }
        }
    }
}


const mapStateToProps = (state) => {
    console.log("state")
    console.log(state)
    return{
        email: state.users
    }
}

/**
 * maps the props to the dispatch so that you can dispatch within a class
 */
const mapDispatchToProps = (dispatch) => {
    return{
        loginUser: (email, username,voornaam, jobs) => {
            dispatch({type: 'LOGIN_USER', payload: {email, username, voornaam, jobs}})
        }
    }
}
//connect state with page
export default connect(mapStateToProps,mapDispatchToProps) (Login);