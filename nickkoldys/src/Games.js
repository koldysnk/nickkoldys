import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

export function Games(props) {

    return (
        <div className='Games'>
            <Link to="/tictactoe_menu">
            <div className="gameTile ticTacToeTile">
                <h2 className='gameTileTitle ticTacToeTileTitle'>Tic-Tac-Toe</h2>
                <p className='gameTileText ticTacToeTileText'>Play Tic-Tac-Toe against an AI or local multiplayer.<br></br>The Tic-Tac-Toe AI uses a MinMax algorithm to decide it's next move.</p>
            </div>
            </Link>
            <Link  to="/hangman_menu">
            <div className="gameTile hangmanTile">
                <h2 className='gameTileTitle hangmanTileTitle'>Hangman</h2>
                <p className='gameTileText hangmanTileText'>Play Hangman and guess against the AI or make the AI guess.<br></br>The Hangman AI uses regular expressions to reduce SQL queery results and adjusts the database after each game.</p>
            </div>
            </Link>
            <div className="gameTile chessTile">
                <h2 className='gameTileTitle chessTileTitle'>Chess</h2>
                <p className='gameTileText chessTileText'>Play Chess against an AI or local multiplayer. (Coming Soon)</p>
            </div>
        </div>
    );
}