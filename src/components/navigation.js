import React from 'react';

import {Link, NavLink, useHistory} from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import {connect} from "react-redux";


const Navigation = (props) => {
    const history = useHistory();

    let loggedIn = false;

    if(props.email != null){
        loggedIn = true;
    }


   if(loggedIn){
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
                        <NavLink className="nav-item nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-item nav-link" to="/camera">Camera</NavLink>
                        <NavLink className="nav-item nav-link" to="/profile">My Profile</NavLink>
                        <NavLink className="nav-item nav-link" to="/feedback">Feedback</NavLink>
                        <Link onClick={handleClick} className="nav-item nav-link" > Logout</Link>

                    </Nav>
                </Container>
            </Navbar>

        </div>
    );
   }
   else return (
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
                       <NavLink className="nav-item nav-link" to="/">Home</NavLink>
                       <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                       <NavLink className="nav-item nav-link" to="/register">Register</NavLink>

                   </Nav>
               </Container>
           </Navbar>

       </div>
   )
    function handleClick(){
        props.logoutUser()
        history.push("/login");

    }


}

const mapStateToProps = (state) => {
    return{
        email: state.users.email,
        name: state.users.username,
        jobs: state.users.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logoutUser: (email) => {
            dispatch({type: 'LOGOUT_USER'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navigation);
