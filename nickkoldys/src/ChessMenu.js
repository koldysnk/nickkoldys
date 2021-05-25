import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import './ChessMenu.css';
import { chessResetGame, startWaiting, stopWaiting } from './actions';

export function ChessMenu(props) {
    const dispatch = useDispatch();

    const reset = () => {
        dispatch(startWaiting())
        dispatch(chessResetGame())
        dispatch(stopWaiting())
    }
    return (
        <div className='ChessMenu'>
            <div className="chessModeSelectBox">
            <div className="singlePlayerBox chessNavBox" onClick={reset}>
                    <Link to="/chess_singleplayer">
                        <img src='singlePersonIcon.png' className="navIcon"></img>
                        <p className="navItem">Single-Player</p>
                    </Link>
                </div>
                <div className="multiPlayerBox chessNavBox" onClick={reset}>
                    <Link to="/chess_multiplayer">
                        <img src='twoPersonIcon.png' className="navIcon"></img>
                        <p className="navItem">Local Multi-Player</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}