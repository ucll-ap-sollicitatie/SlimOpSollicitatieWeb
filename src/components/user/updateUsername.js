import {updateUsername} from "./apiUser"
import React, { useState } from 'react';
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";

function UpdateUsername(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    return (
        <div className="centerPage">
            <div>
                <h1>Maak een nieuwe job aan</h1>
                <form onSubmit={handleSubmit} className="wite">
                    <label htmlFor="titel">Username</label>
                    <input type="text" placeholder="titel" id="titel" onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="titel">password</label>
                    <input type="password" placeholder="titel" id="titel" onChange={(e) => setPassword(e.target.value)}/>

                    <button>update username</button>
                </form>
            </div>
        </div>
    )

    function handleSubmit(){
        //set in state
        updateUsername(username, props.email, password)
        history.push("/profile");
    }


    
}
const mapStateToProps = (state) => {
    return{
        email: state.users.email,
    }
}

export default connect(mapStateToProps) (UpdateUsername)