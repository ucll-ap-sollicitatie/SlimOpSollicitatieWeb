import React, { Component } from 'react';
import {logindb} from "../user/apiUser"

class login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        //"arnobunckens@hotmail.com", "t"
        e.preventDefault();
        logindb(this.state.email, this.state.password)
        //console.log(this.state)
    }

    render() {
        return (
            <div className="containter">
                <h1>Gelieve in te loggen</h1>
                <form onSubmit={this.handleSubmit} className="wite">
                    <label for="username">username</label>
                    <input type="email" id="email" onChange={this.handleChange}/>

                    <label for="password">password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>

                    <button>login</button>
                </form>
                
            </div>
        );
    }
}

export default login;




