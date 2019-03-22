import React from 'react';
import './House.css';

const House = function(props) {
    return (
        <div className="House" onMouseEnter={() => props.houseHoverEvent(props.id)}>
            <img src={props.imageUrl} alt=""></img>
        </div>
    );
};

export default House;