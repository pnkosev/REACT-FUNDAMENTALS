import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import validator from 'validator';
import toastr from 'toastr';

import { WithErrorArticle, WithWarningArticle } from './views/Article';
import { WithFormRegister, WithErrorRegister, WithWarningRegister } from './views/Register';
import { WithFormLogin, WithErrorLogin, WithWarningLogin } from './views/Login';
import { WithErrorHome, WithWarningHome } from './views/Home'
import Header from './common/Header';
import './App.css';

toastr.options.newestOnTop = false;
toastr.options.closeButton = true;

function validateRegisterForm(payload) {
	let errors = {};
	let isFormValid = true;
	let message = '';

	if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
		isFormValid = false;
		errors.email = 'Please provide a correct email address.';
	}

	if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
		isFormValid = false;
		errors.password = 'Password must have at least 3 characters.';
	}

	if (!payload || payload.password !== payload.confirmedPassword) {
		isFormValid = false;
		errors.passwordsDontMatch = 'Passwords do not match!';
	}

	if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
		isFormValid = false;
		errors.name = 'Please provide your name.';
	}

	if (!isFormValid) {
		message = 'Form Validation Failed!';
	}

	return {
		success: isFormValid,
		message: message,
		errors: errors
	};
}

function validateLoginForm(payload) {
	let errors = {};
	let isFormValid = true;
	let message = '';

	if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
		isFormValid = false;
		errors.password = 'Please provide your password.';
	}

	if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
		isFormValid = false;
		errors.name = 'Please provide your name.';
	}

	if (!isFormValid) {
		message = 'Form Validation Failed!';
	}

	return {
		success: isFormValid,
		message: message,
		errors: errors
	};
}

class App extends Component {
	render() {
		return (
			<Router>
				<section>
					<Header />
					<Switch>
						<Route path="/" exact component={WithErrorHome} />
						<Route path="/article" exact component={WithWarningArticle} />
						<Route path="/register" exact render={(props) => 
							<WithFormRegister 
								validateForm={validateRegisterForm}
								{...props}
							/>
						} />
						<Route path="/login" exact render={(props) => 
							<WithFormLogin
								validateForm={validateLoginForm}
								{...props}
							/>
						} />
					</Switch>
				</section>
			</Router>
		);
	}
}

export default App;