import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

const Welcome = () => {
    return (
        <h1>Hello, from React!</h1>
    )
};

const Cya = () => {
    return (
        <h1>Cya, from React!</h1>
    )
};

const CompBlender = () => {
    return (
    <div>
        <Welcome />
        <Cya />
    </div>
    )
};

ReactDOM.render(<CompBlender />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
