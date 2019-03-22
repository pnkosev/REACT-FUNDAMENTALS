import React, { Component } from 'react';

function withError(WrappedComponent) {
    return class WithError extends Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
        }

        componentDidCatch(error, info) {
            if (this.state.hasError) {
                console.log(error, info);
            }
        }

        render() {
            if (this.state.hasError) {
                return <h1>Please excuse us, we are working onto solving the problem!</h1>;
            }
            return <WrappedComponent {...this.props} />;
        }
    }
}

export default withError;