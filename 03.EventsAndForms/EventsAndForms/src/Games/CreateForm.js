import React from 'react';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            imageUrl: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    clearData(){
        this.setState({
            title: '',
            description: '',
            imageUrl: '',
        })
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
            <div className="create-form">
                <h1>Create game</h1>
                <form onSubmit={(event) => {
                    // TODO: prevent the default behaviour of the click event, call the createGame function and pass it the data from the form
                    event.preventDefault();
                    this.props.createGame(this.state);
                    this.clearData();
                }}>
                    <label>Title</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange} />
                    <label>Description</label>
                    <textarea 
                        type="text" 
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}/>
                    <label>ImageUrl</label>
                    <input 
                        type="text" 
                        id="imageUrl"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.handleChange}/>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
};

export default CreateForm;

