import React from 'react';
import { Link } from 'react-router-dom';
import './TicTacToeMenu.css';

export function TicTacToeMenu(props) {

    return (
        <div className='TicTacToeMenu'>
            <div className="tttModeSelectBox">
            <div className="singlePlayerBox navBox">
                    <Link to="/tictactoesingleplayer">
                        <img src='singlePersonIcon.png' className="navIcon"></img>
                        <p className="navItem">Single-Player</p>
                    </Link>
                </div>
                <div className="multiPlayerBox navBox">
                    <Link to="/tictactoemultiplayer">
                        <img src='twoPersonIcon.png' className="navIcon"></img>
                        <p className="navItem">Local Multi-Player</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}