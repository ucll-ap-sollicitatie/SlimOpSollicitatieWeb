import React from 'react';

import {NavLink} from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            {/* To add a new page:
                - Follow instructions in App.js
                - add a new NavLink element with the path and label
            */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/camera">Camera</NavLink>
            <NavLink to="/profile">My Profile</NavLink>
        </div>
    );
}

export default Navigation;