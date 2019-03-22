import React from 'react';
import withWarning from '../hocs/WithWarning';
import withError from '../hocs/WithError';
import withForm from '../hocs/WithForm';

const Login = (props) => {
	return (
		<div className={props.error}>
			{
				props.error.length
					? <span className={`${props.error}-symbol`}>&#9888;</span>
					: null
			}
			<div>
				<header>
					<span className="title">Login</span>
				</header>
				<form onSubmit={props.handleFormSubmit}>
					Username:
            	<input type="text" name="username" onChange={props.handleChange} />
					<br /> Password:
            	<input type="password" name="password" onChange={props.handleChange} />
					<br />
					<input type="submit" value="Login" />
				</form>
			</div>
		</div>
	);
};

const WithWarningLogin = withWarning(Login);
const WithErrorLogin = withError(Login);
const WithFormLogin = withForm(Login);

export {
	WithWarningLogin,
	WithErrorLogin,
	WithFormLogin
}