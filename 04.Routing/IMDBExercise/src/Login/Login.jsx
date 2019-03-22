import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value,
		})
	}

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.props.logInUser(this.state);
        }}>
          <label htmlFor="usernameLogin">Username</label>
          <input 
            type="text" 
            id="usernameLogin"
            name="username"
            onChange={this.handleChange}
            placeholder="Ivan Ivanov" />
          <label htmlFor="passwordLogin">Password</label>
          <input 
            type="password" 
            id="passwordLogin"
            name="password"
            onChange={this.handleChange}
            placeholder="******" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
