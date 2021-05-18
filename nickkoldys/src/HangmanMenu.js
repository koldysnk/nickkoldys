import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
//import {hangmanResetGame} from './actions';
import './HangmanMenu.css';

export function HangmanMenu(props) {
    const dispatch = useDispatch();

    const reset = () => {
        //dispatch(hangmanResetGame())
    }
    return (
        <div className='HangmanMenu'>
            <div className="hangmanModeSelectBox">
            <div className="singlePlayerBox hangmanNavBox" onClick={reset}>
                    <Link to="/hangman_guess">
                        <img src='singlePersonIcon.png' className="navIcon"></img>
                        <p className="navItem">Guess Word</p>
                    </Link>
                </div>
                <div className="multiPlayerBox hangmanNavBox" onClick={reset}>
                    <Link to="/hangman_choose">
                        <img src='robotIcon.png' className="navIcon"></img>
                        <p className="navItem">Choose Word</p>
                    </Link>
                </div>
                <div className="dictionaryBox hangmanNavBox" onClick={reset}>
                    <Link to="/hangman_dictionary">
                        <img src='dictionaryIcon.png' className="navIcon"></img>
                        <p className="navItem">Dictionary</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}