import React from 'react';
import withWarning from '../hocs/WithWarning';
import withError from '../hocs/WithError';
import withForm from '../hocs/WithForm';

const Register = (props) => {
    return (
        <div className={props.error}>
            {
                props.error.length
                    ? <span className={`${props.error}-symbol`}>&#9888;</span>
                    : null
            }
            <div>
                <header>
                    <span className="title">Register</span>
                </header>
                <form onSubmit={props.handleFormSubmit}>
                    Username:
                <input type="text" name="username" onChange={props.handleChange} />
                    <br /> Email:
                <input type="text" name="email" onChange={props.handleChange} />
                    <br /> Password:
                <input type="password" name="password" onChange={props.handleChange} />
                    <br /> Repeat Password:
                <input type="password" name="confirmedPassword" onChange={props.handleChange} />
                    <br />
                    <input type="submit" value="Register" />
                </form>
            </div>
        </div>
    )
}

const WithWarningRegister = withWarning(Register);
const WithErrorRegister = withError(Register);
const WithFormRegister = withForm(Register);

export {
    WithWarningRegister,
    WithErrorRegister,
    WithFormRegister
}