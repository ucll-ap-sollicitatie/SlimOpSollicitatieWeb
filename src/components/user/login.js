import React, { Component } from 'react';
import {logindb} from "../user/apiUser"

class login extends Component {
    state = {
        email: '',
        password: ''
    }
 
    /**
     * Change the state of the id that called the function:
     * Ex. <input type="email" id="email" onChange={this.handleChange}/> calls handleChange:
     *          - the id is email, so the state that it will change is email
     */

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    /**
     * When a user submits the form,
     * 1. preventDefault: https://www.w3schools.com/jsref/event_preventdefault.asp
     * 2. logindb calls the api
     * 3.1. TODO: Clear fields when input is wrong
     * 3.2. TODO: redirect to home page when login is succesfull
     */
    handleSubmit = (e) => {
        //"arnobunckens@hotmail.com", "t"

        e.preventDefault();
        logindb(this.state.email, this.state.password)

        // If(TODO) succesful
        console.log(this.state)

    }

    render() {
        return (
            <div className="containter">
                <h1>Gelieve in te loggen</h1>
                <form onSubmit={this.handleSubmit} className="wite">
                    <label htmlFor="email">username</label>
                    <input type="email" id="email" onChange={this.handleChange}/>

                    <label htmlFor="password">password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>

                    <button>login</button>
                </form>
                
            </div>
        );
    }
}

export default login;




