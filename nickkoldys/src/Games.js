import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';
import anime from 'animejs/lib/anime.es.js';

export function Games(props) {

    return (
        <div className='Games'>
            <div className="gameTile ticTacToeTile">
                <h2 className='gameTileTitle ticTacToeTileTitle'>Chess</h2>
            </div>
        </div>
    );
}