import React from 'react';

import {NavLink} from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

const Navigation = () => {
    return (
        <div>
            <Navbar expand="lg" style={{backgroundColor: '#4190eb'}}>
                <Container>
                    <Navbar.Brand>
                        <Image src="logo-dynamo-wit.png" width="200px"/>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        {/* To add a new page:
                            - Follow instructions in App.js
                            - add a new NavLink element with the path and label
                        */}
                        <NavLink className="px-3 text-white" to="/">Home</NavLink>
                        <NavLink className="px-3 text-white" to="/login">Login</NavLink>
                        <NavLink className="px-3 text-white" to="/register">Register</NavLink>
                        <NavLink className="px-3 text-white" to="/camera">Camera</NavLink>
                        <NavLink className="px-3 text-white" to="/profile">My Profile</NavLink>
                    </Nav>
                </Container>
            </Navbar>

        </div>
    );
}

export default Navigation;
