import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import {hangmanResetGame} from './actions';
import './HangmanGuess.css';
import { loadRandWord, setErrorMessage, setWordToGuess, startHangman, tttUpdateResult, updateGuessedLetters, updateNumberOfTries } from './actions';
import { HangmanDrawing } from './HangmanDrawing';

export function HangmanGuess(props) {
    const isWaiting = useSelector(state => state.isWaiting);
    const numLetters = useSelector(state => state.numLetters);
    const gameStarted = useSelector(state => state.hangmanGameStarted);
    const gameOver = useSelector(state => state.gameOver);
    const result = useSelector(state => state.gameResult);
    const guessedLetters = useSelector(state => state.guessedLetters);
    const wordToGuess = useSelector(state => state.wordToGuess);
    const randWord = useSelector(state => state.randWord);
    const numberOfTries = useSelector(state => state.numberOfTries);
    const errorMessage = useSelector(state => state.errorMessage);
    const dispatch = useDispatch();

    const [nL, setNL] = useState(numLetters);
    const [letterToGuess, setLetterToGuess] = useState('');

    const onConfirmLength = () => {
        if(nL.length>0){
            dispatch(startHangman(nL));
            dispatch(loadRandWord(nL, 0));
            dispatch(setWordToGuess(createArr(nL)));
        }
    }

    const createArr = (length) => {
        let arr = [];
        for (let i = 0; i < length; i++)
            arr.push("_");
        return arr;
    }

    const guessLetter = () => {
        const letter = letterToGuess.toLowerCase()
        const regex = /^[a-z]$/
        if (regex.test(letter)) {
            if (guessedLetters.indexOf(letter) >= 0) {
                dispatch(setErrorMessage(`You already guessed the letter '${letter}'.`))
            } else {
                let positions = []
                for (let i = 0; i < randWord.length; i++) {
                    if (randWord.word[i] == letter) {
                        positions.push(i)
                    }
                }
                if (positions.length > 0) {
                    positions.forEach(p => {
                        wordToGuess[p] = letter;
                    })
                    dispatch(setWordToGuess(wordToGuess))
                    if (!wordToGuess.includes('_')) {
                        dispatch(tttUpdateResult(true, 1))
                    }
                } else {
                    if (numberOfTries <= 0) {
                        dispatch(tttUpdateResult(true, 2))
                    } else {
                        dispatch(updateNumberOfTries(numberOfTries - 1))
                    }
                }
                guessedLetters.push(letter)
                dispatch(updateGuessedLetters(guessedLetters))
                dispatch(setErrorMessage(`The letter '${letter}' is in the word ${positions.length} times.`))
            }
        } else {
            dispatch(setErrorMessage('Input must be a single letter.'))
        }
        setLetterToGuess('')
    }

    let alreadyGuessed = <p className='hangmanContentP'>You have no previous guesses.</p>
    if (guessedLetters.length > 0) {
        alreadyGuessed = <p className='hangmanContentP'>Your previous guesses: <br></br>{guessedLetters.map(letter => <span key={letter + (Math.floor(Math.random() * 10000000))}> {letter} </span>)}</p>
    }

    if (!gameStarted) {
        window.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
              onConfirmLength()
            }
        });
        return (
            <div className='HangmanGuess'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div className='hangmanContent'>
                    <p className='hangmanContentP'>What length word do you want to guess?</p>
                    <div className='hangmanInput'>
                        <input className="numberIn" type="number" min="1" max="31"
                            value={nL} onChange={e => setNL(e.target.value)}></input>
                        <button onClick={onConfirmLength}>Confirm</button>
                    </div>
                    <br></br>
                    <p className='hangmanContentP'>Input must be from 1 to 31.</p>
                </div>
            </div>
        );
    }
    if (!gameOver) {
        window.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
              guessLetter()
            }
        });
        return (
            <div className='HangmanGuess'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div className='hangmanContent'>
                    <p className='hangmanContentP'>The current word is:</p>
                    <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                    <br></br>
                    <HangmanDrawing lives={numberOfTries} />
                    <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                    {alreadyGuessed}
                    <p className='hangmanContentP'>Guess a letter.</p>
                    <div className='hangmanInput'>
                        <input placeholder="Enter Here!" onChange={e => setLetterToGuess(e.target.value)}></input>
                        <button onClick={guessLetter}>Confirm</button>
                    </div>
                    <p className='hangmanContentP'>{errorMessage}</p>
                </div>
            </div>
        );
    }
    if (result == 1) {
        return (
            <div className='HangmanGuess'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div className='hangmanContent'>
                    <p className='hangmanContentP'>The current word is:</p>
                    <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                    <br></br>
                    <HangmanDrawing lives={numberOfTries} />
                    <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                    {alreadyGuessed}
                    <p className='hangmanContentP'>Congratulations! You guessed the word the AI picked.</p>
                    <p className='hangmanContentP'>{errorMessage}</p>
                </div>
            </div>
        );
    }
    return (
        <div className='HangmanGuess'>
            <h2 className='hangmanTitle'>Hangman</h2>
            <div className='hangmanContent'>
                <p className='hangmanContentP'>The current word is:</p>
                <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                <br></br>
                <HangmanDrawing lives={-1} />
                <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                {alreadyGuessed}
                <p className='hangmanContentP'>Game Over! The AI picked a word you could not guess ({randWord.word}).</p>
                <p className='hangmanContentP'>{errorMessage}</p>
            </div>
        </div>
    );


}