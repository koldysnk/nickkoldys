import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {startHangman} from './actions';
import './HangmanChoose.css';

export function HangmanChoose(props) {
    const isWaiting = useSelector(state => state.isWaiting);
    const numLetters = useSelector(state => state.numLetters);
    const gameStarted = useSelector(state => state.hangmanGameStarted);
    const gameOver = useSelector(state => state.gameOver);
    const guessedLetters = useSelector(state => state.guessedLetters);
    const wordToGuess = useSelector(state => state.wordToGuess);
    const guess = useSelector(state => state.mostRecentLetter);
    const numberOfTries = useSelector(state => state.numberOfTries);
    const [positions, setPositions] = useState('');
    const [inputError, setinputError] = useState('');
    const dispatch = useDispatch();

    const [nL, setNL] = useState(numLetters);

    const onConfirm = () => {
        dispatch(startHangman(nL));
    }

    const reset = () => {
        //dispatch(hangmanResetGame())
    }

    if (!gameStarted) {
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div>
                    <p>What length word are you thinking of?</p>
                    <input className="numberIn" type="number" min="1" max="31" 
                        value={nL} onChange={e => setNL(parseInt(e.target.value))}></input>
                    <button onClick={onConfirm}>Confirm</button>
                    <br></br>
                    <p>Input must be from 1 to 31.</p>
                </div>
            </div>
        );
    }
    if(gameOver){
        return (
            <div className='HangmanChoose'>
                Game Over
            </div>
        );
    }
    return (
        <div className='HangmanChoose'>
        </div>
    );
}