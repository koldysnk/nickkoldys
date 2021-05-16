import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {tttResetGame} from './actions';
import './TicTacToeMenu.css';

export function TicTacToeMenu(props) {
    const dispatch = useDispatch();

    const reset = () => {
        dispatch(tttResetGame())
    }
    return (
        <div className='TicTacToeMenu'>
            <div className="tttModeSelectBox">
            <div className="singlePlayerBox tttNavBox" onClick={reset}>
                    <Link to="/tictactoesingleplayer">
                        <img src='singlePersonIcon.png' className="navIcon"></img>
                        <p className="navItem">Single-Player</p>
                    </Link>
                </div>
                <div className="multiPlayerBox tttNavBox" onClick={reset}>
                    <Link to="/tictactoemultiplayer">
                        <img src='twoPersonIcon.png' className="navIcon"></img>
                        <p className="navItem">Local Multi-Player</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}