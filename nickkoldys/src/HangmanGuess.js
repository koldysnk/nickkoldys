import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
//import {hangmanResetGame} from './actions';
import './HangmanGuess.css';

export function HangmanGuess(props) {
    const dispatch = useDispatch();

    const reset = () => {
        //dispatch(hangmanResetGame())
    }
    return (
        <div className='HangmanGuess'>
        </div>
    );
}