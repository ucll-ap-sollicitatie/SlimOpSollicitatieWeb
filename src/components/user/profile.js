import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";




class profile extends Component {

    render() {
        const {email} = this.props
        console.log(email)
        return (<div className="containter">
            <section>
                <img src="https://via.placeholder.com/150" alt="Profile Pic" style={imgstyle}/>
                <section>
                    <p>{email}</p>
                    <button style={buttonStyle}>Wijzig Gebruikersnaam</button>


                </section>
                <section>
                    <h4>Jobtitel 1: </h4>
                    <ol>
                        <li>Skill A</li>
                        <li>Skill B</li>
                        <li>Skill C</li>
                        <button style={buttonStyle}>Wijzig Job</button>
                        <button style={buttonStyle}>Verwijder Job</button>
                    </ol>
                    <Link to="/addJob">
                        <button style={buttonStyle}>Add job</button>
                    </Link>
                </section>
            </section>


        </div>);
    }
}

const imgstyle = {
    margin: 15
}

const buttonStyle = {
    margin: 7
}

const mapStateToProps = (state) => {
    return{
        email: state.users.email
    }
}

export default connect(mapStateToProps, null) (profile);
