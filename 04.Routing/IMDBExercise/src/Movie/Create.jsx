import React, { Component } from 'react';
import './Create.css';

class Create extends Component {
  constructor(props) {
		super(props);

		this.state = {
			title: null,
      storyLine: null,
      trailerUrl: null,
      poster: null
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const id = target.id;
		const value = target.value;

		this.setState({
			[id]: value,
		})
  }
  
  render() {
    return (
      <div className="Create">
        <h1>Create Movie</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.props.handleCreateMovie(this.state);
        }}>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            onChange={this.handleChange}
            placeholder="Titanic" />
          <label htmlFor="storyLine">Story Line</label>
          <input 
            type="text" 
            id="storyLine" 
            onChange={this.handleChange}
            placeholder="Text" />
          <label htmlFor="trailerUrl">Trailer Url</label>
          <input 
            type="text" 
            id="trailerUrl" 
            onChange={this.handleChange}
            placeholder="https://www.youtube.com/watch?v=DNyKDI9pn0Q" />
          <label htmlFor="poster">Movie Poster</label>
          <input 
            type="text" 
            id="poster" 
            onChange={this.handleChange}
            placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzg6o0KjhufKFU1iBNr1zuyi0YDNgCUw4Ky5SNATZDVKaIUkiAA" />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default Create;
