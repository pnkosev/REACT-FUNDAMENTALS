import React from 'react';
import './register.css';

class RegisterForm extends React.Component {
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
        });
    }

    render() {
        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.registerUser(this.state)
                }}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        id="usernameReg" 
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange} />
                    <label>Email</label>
                    <input 
                        type="text" 
                        id="emailReg" 
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        id="passwordReg"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} />
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}
export default RegisterForm;