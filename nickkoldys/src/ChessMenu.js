import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
//import {chessResetGame} from './actions';
import './ChessMenu.css';

export function ChessMenu(props) {
    const dispatch = useDispatch();

    const reset = () => {
        //dispatch(chessResetGame())
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