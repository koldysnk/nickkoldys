import React from 'react';
import './RecipeTile.css';
export function RecipeTile(props) {
    const description = 'This is a sample description of the recipe.'
    return (
        <div className="Recipe-Tile">
            <div className="Recipe-Tile-Image"></div>
            <div className="Recipe-Tile-Text">
                <h4>{props.name}</h4>
                <p>{description}</p>
            </div>
            <div className="Recipe-Tile-Star"></div>
        </div>
    );
}