import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
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
			<div className="Register">
				<h1>Register</h1>
				<form onSubmit={(event) => {
					event.preventDefault();
					this.props.registerUser(this.state);
				}}>
					<label htmlFor="username">Username</label>
					<input 
						type="text"
						id="username"
						name="username"
						onChange={this.handleChange}
						placeholder="Ivan Ivanov" />
					<label htmlFor="email">Email</label>
					<input 
						type="text" 
						id="email" 
						name="email"
						onChange={this.handleChange}
						placeholder="ivan@gmail.com" />
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						id="password" 
						name="password"
						onChange={this.handleChange}
						placeholder="******" />
					<input type="submit" value="REGISTER" />
				</form>
			</div>
		);
	}
}

export default Register;
