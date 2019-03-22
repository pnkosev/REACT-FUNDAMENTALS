import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const UserHeader = (props) => {
  return (
    <span>
      <Link to="/">Welcome, {props.username}!</Link>
      <a href="/user/logout" onClick={props.logout} >Logout</a>
    </span>
  )
}

const AdminHeader = (props) => {
  return (
    <span>
      <Link to="/">Welcome, {props.username}!</Link>
      <Link to="/movie/create">Create</Link>
      <a href="/user/logout" onClick={props.logout} >Logout</a>
    </span>
  )
}

const AnonymousHeader = (props) => {
  return (
    <span>
      <Link to="/user/register">Register</Link>
      <Link to="/user/login">Login</Link>
    </span>
  )
}

class Header extends Component {
  render() {
    return (
      <div className="Header">
         <header><Link to="/" className="logo">Interactive IMDB</Link>
            <div className="header-right">
                <Link to="/">Home</Link>
                {
                  this.props.user ? (
                    this.props.isAdmin ? (
                      <AdminHeader {...this.props} />
                    ) : (
                    <UserHeader {...this.props} />
                    ))
                    : (
                    <AnonymousHeader />
                  )
                }
            </div>
        </header>
      </div>
    );
  }
}

export default Header;


