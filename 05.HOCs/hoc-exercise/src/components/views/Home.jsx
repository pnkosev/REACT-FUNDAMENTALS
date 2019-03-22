import React from 'react';
import withWarning from '../hocs/WithWarning';
import withError from '../hocs/WithError';

const Home = () => {
    return <h1>This is home yo</h1>;
}

const WithWarningHome = withWarning(Home);
const WithErrorHome = withError(Home);

export {
    Home,
    WithWarningHome,
    WithErrorHome
};