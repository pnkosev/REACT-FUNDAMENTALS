import React, {Component} from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
            message: '',
            variant: '',
            open: false
        }
    }

    handleClose() {
        this.setState({
            open: false,
        });
    };

    postData = (url, headers, data) => {
        return fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        })
        .then(response => response.json())
    }

    registerUser(user) {
        const headers = {
            'Content-Type': 'application/json',
        };
        this.postData('http://localhost:9999/auth/signup', headers, user)
        .then(data => {
            if (data.errors) {
                this.setState({
                    message: data.errors[0].msg,
                    variant: 'error',
                    open: true,
                });
            } else {
                localStorage.setItem('username', data.username);
                localStorage.setItem('userId', data.userId);
                this.setState({
                    user: data.username,
                    message: `You successfully signed up, ${data.username}!`,
                    variant: 'success',
                    open: true,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                message: 'Server error!',
                variant: 'error',
                open: true,
            });
        });
    }

    loginUser(user) {
        // TODO: login a user and set sessionStorage items username and token
        const headers = {
            'Content-Type': 'application/json',
        };
        this.postData('http://localhost:9999/auth/signin', headers, user)
        .then(data => {
            if (data.error) {
                this.setState({
                    message: data.error,
                    variant: 'error',
                    open: true,
                });
            } else {
                localStorage.setItem('username', data.username);
                localStorage.setItem('token', data.token);
                this.setState({
                    user: data.username,
                    message: `${data.message}`,
                    variant: 'success',
                    open: true,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                message: 'Server error!',
                variant: 'error',
                open: true,
            });
        });
    }

    logout(event) {
        // TODO: prevent the default state
        // TODO: delete the data from the sessionStorage
        // TODO: update the state (user: null)
        const username = localStorage.getItem('username');
        event.preventDefault();
        localStorage.clear();
        this.setState({
            user: null,
            loginForm: !this.state.loginForm,
            message: `You successfully logged out! Hope to see you soon, ${username}!`,
            variant: 'success',
            open: true
        });
    }

    componentWillMount() {
        // TODO: check if there is a logged in user using the sessionStorage (if so, update the state, otherwise set the user to null)
        const user = localStorage.getItem('username');

        if (user) {
            this.setState({
                user,
            })
        } else {
            this.setState({
                user: null,
            })
        }

        // TODO: fetch all the games
        fetch('http://localhost:9999/feed/games')
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                data.errors.forEach(error => {
                    console.log(error);
                });
            } else {
                this.setState({
                    games: data.games
                });
            }
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                message: 'Server error!',
                variant: 'error',
                open: true,
            });
        });
    }

    createGame(game) {
        // TODO: create a game using fetch with a post method then fetch all the games and update the state
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        };
        this.postData('http://localhost:9999/feed/game/create', headers, game)
        .then(data => {
            if (data.errors) {
                data.errors.forEach(error => {
                    console.log(error);
                });
            } else {
                const allGames = this.state.games.slice();
                const newGame = data.game;
                this.setState({
                    games: [...allGames, newGame],
                    message: `${data.message}`,
                    variant: 'success',
                    open: true
                });
            }
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                message: 'Server error!',
                variant: 'error',
                open: true,
            });
        });
    }

    switchForm() {
        // TODO: switch the value of the loginForm property
        this.setState({
            loginForm: !this.state.loginForm,
        });
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter 
                    message={this.state.message} 
                    variant={this.state.variant}  
                    open={this.state.open}
                    handleClose={this.handleClose.bind(this)}
                />
            </main>
        )
    }
}

export default App;


