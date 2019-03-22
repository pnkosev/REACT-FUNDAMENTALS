import React, { Component } from 'react';

class BindingForm extends Component {
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount() {
        this.props.children.map(child => {
            if (child.type === 'input') {
                this.setState({
                    [child.props.name]: ''
                })
            }
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                {React.Children.map(this.props.children, child => {
                    if (child.type === 'input') {
                        return React.cloneElement(child, { onChange: this.handleChange.bind(this), ...child.props });
                    }
                    return child;
                })}
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default BindingForm;

