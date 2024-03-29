import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default class PrivateRoute extends Component {
    render() {
        if (localStorage.getItem('authToken') === null) {
            return <Redirect to="/login" />;
        };

        const path = this.props.children;

        return (
            <Route {...this.props}>
                {path}
            </Route>
        );
    }
}