import React from 'react';
import ReactPlayer from 'react-player'
import './Create.css';

const Trailer = (props) => {
    const movie = props.movies[props.currentlySelectedMovie];
    return (
        <div className="Trailer">
            <h1>StoryLine for {movie.title} </h1>
            <span>
                <ReactPlayer url={movie.trailerUrl} playing />
            </span>
        </div>
    )
}
    

export default Trailer;