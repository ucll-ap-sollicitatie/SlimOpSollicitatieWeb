import React, {Component} from 'react';
import {Link} from "react-router-dom";

class profile extends Component {
    render() {
        return (<div className="containter">
            <section>
            <img src="https://via.placeholder.com/150" alt="Profile Pic" style={imgstyle}/>
            <section>
                <p>Gebruikersnaam</p>
                <div></div>
                <button style={buttonStyle}>Verander Gebruikersnaam</button>


            </section>
                <section>
                    <h4>Jobtitel 1: </h4>
                    <ol>
                        <li>Skill A</li>
                        <li>Skill B</li>
                        <li>Skill C</li>
                        <button style={buttonStyle}>Verander Job</button>
                        <button style={buttonStyle}>Verwijder Job</button>
                    </ol>
                   <Link to="/addJob"><button style={buttonStyle}>Add job</button></Link>
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


export default profile;
