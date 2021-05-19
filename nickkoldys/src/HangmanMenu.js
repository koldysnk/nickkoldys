import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import './HangmanMenu.css';
import { setHangmanGameStarted, updateGuessedLetters, updateNumberOfTries, setGuessedCorrect } from './actions';

export function HangmanMenu(props) {
    const dispatch = useDispatch();

    const reset = () => {
        dispatch(setHangmanGameStarted(false));
        dispatch(setGuessedCorrect(false));
        dispatch(updateNumberOfTries(10));
        dispatch(updateGuessedLetters([]))
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