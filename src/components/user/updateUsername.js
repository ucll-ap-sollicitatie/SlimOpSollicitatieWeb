import {updateUsername} from "./apiUser"
import React, { useState } from 'react';
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { Helmet } from 'react-helmet';

function UpdateUsername(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    return (
        <div className="centerPage">
        <Helmet>
            <title>SOS - Verander gebruikersnaam</title>
        </Helmet>

            <div>
                <h1>Verander naam</h1>
                <form onSubmit={handleSubmit} className="wite">
                    <label htmlFor="titel">naam</label>
                    <input type="text" placeholder="titel" id="titel" onChange={(e) => setUsername(e.target.value)}/>
                    <p id="userror" style={{display: "none"}}>Gelieve een naam in te vullen</p>

                    <label htmlFor="pass">Wachtwoord</label>
                    <input type="password" placeholder="pass" id="pass" onChange={(e) => setPassword(e.target.value)}/>
                    <p id="passerror" style={{display: "none"}}>Wachtwoord fout</p>

                    <button>Verander jouw naam</button>
                </form>
            </div>
        </div>
    )

    async function handleSubmit(e){
        e.preventDefault();

        //set in state
        if(username === ""){
            var elem = document.getElementById("userror")
            elem.style.display = "block";
        }
        else{
            var i = await updateUsername(username, props.email, password)
            console.log(i)
            if(i === true){
                setUsername(username)
                props.updateUsername(username)
                history.push("/profile");    
            }
            else{
                var elem = document.getElementById("passerror")
                elem.style.display = "block";
            }
        }

    }


    
}
const mapStateToProps = (state) => {
    return{
        email: state.users.email,
        username: state.users.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateUsername: (username) => {
            dispatch({type: 'UPDATE_USERNAME', payload: {username}})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (UpdateUsername)
