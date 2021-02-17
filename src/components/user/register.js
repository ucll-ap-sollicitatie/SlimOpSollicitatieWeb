import React, { Component } from 'react';
import {registerdb} from "../user/apiUser"

class register extends Component {
    state = {
        email: '',
        password: '',
        username: ''
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
     * 2. TODO: check if pass and confirm pass is the same
     * 3. registerdb calls the api
     * 4.1. TODO: Clear fields when input is wrong
     * 4.2. TODO: redirect to home page when login is succesfull
     * 
     */
    handleSubmit = (e) => {
        e.preventDefault();
        registerdb(this.state.email, this.state.password, this.state.username)
        console.log(this.state)
    }

    render() {
        return (
            <div className="containter">
                <h1>Gelieve in te loggen</h1>
                <form onSubmit={this.handleSubmit} className="wite">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange}/>

                    <label htmlFor="username">username</label>
                    <input type="username" id="username" onChange={this.handleChange}/>

                    <label htmlFor="password">password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                    
                    <label htmlFor="confpassword">confirm password</label>
                    <input type="password" id="confpassword" onChange={this.handleChange}/>

                    <button>login</button>
                </form>
                
            </div>
        );
    }
}

export default register;