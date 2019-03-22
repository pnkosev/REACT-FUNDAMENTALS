import React from 'react';

const StoryLine = (props) => {
    const movie = props.movies[props.currentlySelectedMovie];
    return (
        <div>
            <h1>StoryLine for {movie.title} </h1>
            <span>
                <p>
                    {movie.storyLine}
                </p>
            </span>
        </div>
    )
}
    

export default StoryLine;