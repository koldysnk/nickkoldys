import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

export function Games(props) {

    return (
        <div className='Games'>
            <Link to="/tictactoemenu">
            <div className="gameTile ticTacToeTile">
                <h2 className='gameTileTitle ticTacToeTileTitle'>Tic-Tac-Toe</h2>
                <p className='gameTileText ticTacToeTileText'>Play Tic-Tac-Toe against an AI or local multiplayer.</p>
            </div>
            </Link>
            <div className="gameTile hangmanTile">
                <h2 className='gameTileTitle hangmanTileTitle'>Hangman</h2>
                <p className='gameTileText hangmanTileText'>Play Hangman against an AI or local multiplayer. (Coming Soon)</p>
            </div>
            <div className="gameTile chessTile">
                <h2 className='gameTileTitle chessTileTitle'>Chess</h2>
                <p className='gameTileText chessTileText'>Play Chess against an AI or local multiplayer. (Coming Soon)</p>
            </div>
        </div>
    );
}