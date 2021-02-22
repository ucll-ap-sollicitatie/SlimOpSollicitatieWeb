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
                <h1>Change username</h1>
                <form onSubmit={handleSubmit} className="wite">
                    <label htmlFor="titel">Username</label>
                    <input type="text" placeholder="titel" id="titel" onChange={(e) => setUsername(e.target.value)}/>
                    <p id="userror" style={{display: "none"}}>Username cannot be empty</p>

                    <label htmlFor="pass">password</label>
                    <input type="password" placeholder="pass" id="pass" onChange={(e) => setPassword(e.target.value)}/>

                    <button>update username</button>
                </form>
            </div>
        </div>
    )

    function handleSubmit(e){
        //set in state
        if(username === ""){
            var elem = document.getElementById("userror")
            elem.style.display = "block";
        }
        else{
            updateUsername(username, props.email, password)
            history.push("/profile");    
        }
    }


    
}
const mapStateToProps = (state) => {
    return{
        email: state.users.email,
    }
}

export default connect(mapStateToProps) (UpdateUsername)