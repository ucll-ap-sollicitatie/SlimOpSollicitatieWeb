import React, { useState } from 'react';
import {logindb} from "../user/apiUser"
import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import {loginUser} from "../../redux/Features/userSlice"
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
    const [status, setStatus] = useState('Nothing to report'); //needed?

    return (
        <div className="centerPage">
        <div className="loginPage">
            <h1>Gelieve in te loggen</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Username</label>
                <input type="email" placeholder="Username" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button>Login</button>
                <p>{status}</p>
            </form>
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
    async function handleSubmit(e)
    {
        e.preventDefault();
        const result = await logindb(email, password)
        console.log("result:")
        console.log(result)
        if(result.email){
            setStatus(`Received ${result.email}`);
            props.loginUser(result.email, result.username, result.jobs)
            history.push("/");
        }
        // If(TODO) succesful
    }
}


// function Reduc(){
//     const dispatch = useDispatch()
//     return dispatch
// }
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
        loginUser: (email, username, jobs) => {
            dispatch({type: 'LOGIN_USER', payload: {email, username, jobs}})
        }
    }
}
//connect state with page
export default connect(mapStateToProps,mapDispatchToProps) (Login);