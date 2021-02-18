import React, { useState } from 'react';
import {logindb} from "../user/apiUser"
import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import {loginUser} from "../../redux/Features/userSlice"
import { StaticRouter } from 'react-router-dom';


// TODO login ---> Login
function Login(props)
{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('Nothing to report');

    return (
        <div className="containter">
            <h1>Gelieve in te loggen</h1>
            <form onSubmit={handleSubmit} className="wite">
                <label htmlFor="email">username</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button>login</button>

                <p>{status}</p>
            </form>
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

        //"arnobunckens@hotmail.com", "t"

        e.preventDefault();
        
        const result = await logindb(email, password)
        console.log("result")
        setStatus(`Received ${result}`);

        console.log("response write")

        props.loginUser(email, password)
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
        loginUser: (email) => {
            dispatch({type: 'LOGIN_USER', payload: email})
        }
    }
}
//connect state with page
export default connect(mapStateToProps,mapDispatchToProps) (Login);