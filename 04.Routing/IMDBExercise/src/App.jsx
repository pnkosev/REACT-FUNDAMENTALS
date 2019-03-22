import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import history from './JS/history';
import navigateTo from './JS/nav';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Movie/Create';
import StoryLine from './Movie/StoryLine';
import Header from './Header/Header';
import NoMatch from './Denial/NoMatch';
import AccessDenied from './Denial/AccessDenied';
import './App.css';
import Trailer from './Movie/Trailer';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			username: null,
			isAdmin: false,
			movies: [],
			currentlySelectedMovie: null,
			isLoading: true,
		}

		this.registerUser = this.registerUser.bind(this);
		this.logInUser = this.logInUser.bind(this);
		this.logout = this.logout.bind(this);

		this.handleCreateMovie = this.handleCreateMovie.bind(this);
		this.selectMovie = this.selectMovie.bind(this);
	}

	postData = (url, headers, data) => {
		return Promise.resolve(
			fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(data),
			})
			.then(response => response.json())
		)
	}

	registerUser(user) {
		const headers = {
			'Content-Type': 'application/json',
		};
		this.postData('http://localhost:9999/auth/signup', headers, user)
			.then(data => {
				if (data.errorMsg) {
					toast.error('🦄' + data.errorMsg);
					this.setState({
						isLoading: false,
					});
				} else {
					localStorage.setItem('username', data.username);
					localStorage.setItem('userId', data.userId);

					toast.success('🦄' + data.message);
					navigateTo("/");

					this.setState({
						user: true,
						username: data.username,
						isLoading: false,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	logInUser(user) {
		const headers = {
			'Content-Type': 'application/json',
		};
		this.postData('http://localhost:9999/auth/signin', headers, user)
			.then(data => {
				if (data.errorMsg) {
					toast.error('🦄' + data.errorMsg);
					this.setState({
						isLoading: false,
					});
				} else {
					localStorage.setItem('username', data.username);
					localStorage.setItem('userId', data.userId);
					localStorage.setItem('token', data.token);
					localStorage.setItem('isAdmin', data.isAdmin);

					toast.success('🦄' + data.message);
					navigateTo('/');

					this.setState({
						user: true,
						username: data.username,
						isAdmin: data.isAdmin,
						isLoading: false,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	logout(event) {
		event.preventDefault();
		localStorage.clear();
		this.setState({
			user: null,
			username: null,
			isAdmin: false
		});
		toast.success('🦄 You have successfully logged out!');
		navigateTo('/');
	}

	handleCreateMovie(movie) {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token'),
		};

		this.postData('http://localhost:9999/feed/movie/create', headers, movie)
		.then(data => {
			if (data.errorMsg) {
				toast.error('🦄' + data.errorMsg);
				this.setState({
					isLoading: false,
				});
			} else {
				const allMovies = this.state.movies.slice();
				const { movie } = data;
				this.setState({
					movies: [...allMovies, movie],
					isLoading: false,
				});

				toast.success('🦄' + data.message);
				navigateTo('/');
			}
		})
		.catch(err => {
			console.log(err)
		})
	}

	selectMovie(index) {
		this.setState({
			currentlySelectedMovie: index,
		})
	}

	componentDidMount() {
		const username = localStorage.getItem('username');
		const isAdmin = localStorage.getItem('isAdmin') === 'true';
		if (username) {
			this.setState({
				user: true,
				username,
				isAdmin
			})
		} else {
			this.setState({
				user: null,
				username: null,
				isAdmin: false
			})
		}

		fetch('http://localhost:9999/feed/movies')
		.then(response => response.json())
		.then(data => {
			if (data.errorMsg) {
				toast.error('🦄' + data.errorMsg);
			} else {
				this.setState({
					movies: data.movies,
					isLoading: false,
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}

	render() {
		//const { user, username, isAdmin } = this.state;
		return (
			<Router history={history}>
				<div className="App">
					<Header {...this.state} logout={this.logout} />
					<ToastContainer
						position="top-right"
						autoClose={1500}
						hideProgressBar
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnVisibilityChange={false}
						draggable
						pauseOnHover={false}
						closeButton={false}
					/>
					<Switch>
						<Route exact path="/" 
							render={() => 
								<Home {...this.state} selectMovie={this.selectMovie} />
							} 
						/>
						<Route exact path="/user/register" 
							render={() => 
								<Register registerUser={this.registerUser} />
							} 
						/>
						<Route exact path="/user/login" 
							render={() => 
								<Login logInUser={this.logInUser} />
							} 
						/>
						<Route exact path="/movie/create" render={() => (
							!this.state.isAdmin ? (
								this.state.user ? (
									<AccessDenied />
								) : (
										<Redirect to="/user/login" />
									))
								: (
									<Create handleCreateMovie={this.handleCreateMovie} />
								)
						)} />
						<Route exact path="/movie/:id/storyLine" 
							render={(props) => 
								<StoryLine 
									{...props} 
									movies={this.state.movies} 
									currentlySelectedMovie={this.state.currentlySelectedMovie} 
								/>
							} 
						/>
						<Route exact path="/movie/:id/trailer" 
							render={(props) => 
								<Trailer 
									{...props} 
									movies={this.state.movies} 
									currentlySelectedMovie={this.state.currentlySelectedMovie} 
								/>
							} 
						/>
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
