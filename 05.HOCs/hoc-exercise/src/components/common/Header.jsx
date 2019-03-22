import React from 'react';
import { NavLink } from "react-router-dom";


const Header = () => {
    return (
        <nav>
            <header><span className="title">Navigation</span></header>
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="active">Homie</NavLink>
                </li>
                <li>
                    <NavLink to="/article" activeClassName="active">Article</NavLink>
                </li>
                <li>
                    <NavLink to="/register" activeClassName="active">Register</NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeClassName="active">Log in</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Header;