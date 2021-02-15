import React, { Component } from 'react';

class register extends Component {
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
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <div className="containter">
                <h1>Gelieve in te loggen</h1>
                <form onSubmit={this.handleSubmit} className="wite">
                    <label for="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange}/>

                    <label for="password">password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                    
                    <label for="confpassword">confirm password</label>
                    <input type="password" id="confpassword" onChange={this.handleChange}/>

                    <button>login</button>
                </form>
                
            </div>
        );
    }
}

export default register;