import {updateUsername} from "./apiUser"
import React, { useState } from 'react';
import {connect} from "react-redux";

function UpdateUsername(props){
    const [username, setUsername] = useState('');

    return (
        <div className="centerPage">
            <div>
                <h1>Maak een nieuwe job aan</h1>
                <form onSubmit={handleSubmit} className="wite">
                    <label htmlFor="titel">Username</label>
                    <input type="text" placeholder="titel" id="titel" onChange={(e) => setUsername(e.target.value)}/>

                    <button>update username</button>
                </form>
            </div>
        </div>
    )

    function handleSubmit(){
        updateUsername(username, props.email)
    }


    
}
const mapStateToProps = (state) => {
    return{
        email: state.users.email,
    }
}

export default connect(mapStateToProps) (UpdateUsername)