import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startHangman, makeGuess, updateGuessedLetters, updateNumberOfTries, setGuessedCorrect, setWordToGuess, tttUpdateResult } from './actions';
import './HangmanChoose.css';
import { Spinner } from './Spinner';

export function HangmanChoose(props) {
    const isWaiting = useSelector(state => state.isWaiting);
    const numLetters = useSelector(state => state.numLetters);
    const gameStarted = useSelector(state => state.hangmanGameStarted);
    const gameOver = useSelector(state => state.gameOver);
    const result = useSelector(state => state.gameResult);
    const guessedLetters = useSelector(state => state.guessedLetters);
    const wordToGuess = useSelector(state => state.wordToGuess);
    const guess = useSelector(state => state.mostRecentLetter);
    const numberOfTries = useSelector(state => state.numberOfTries);
    const guessedCorrect = useSelector(state => state.guessedCorrect);
    const [positions, setPositions] = useState('');
    const [inputError, setinputError] = useState('');
    const dispatch = useDispatch();

    const [nL, setNL] = useState(numLetters);

    const onConfirmLength = () => {
        dispatch(startHangman(nL));
        dispatch(setWordToGuess(createArr(nL)));
        performGuess()
    }

    const performGuess = () => {
        let guessed = '1';
        if (guessedLetters.length > 0) {
            guessed = guessedLetters.join('');
        }
        dispatch(makeGuess(nL, makeRegex(), guessed));
    }

    const makeRegex = () => {
        let regex = '';
        if (guessedLetters.length === 0) {
            regex = `[a-z]{${numLetters}}`;
        } else {
            for (let i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess[i] === '_') {
                    regex = regex.concat('[^' + guessedLetters.join('') + ']');
                } else {
                    regex = regex.concat(wordToGuess[i]);
                }
            }
        }
        return regex;
    };

    const createArr = (length) => {
        let arr = [];
        for (let i = 0; i < length; i++)
            arr.push("_");
        return arr;
    }

    const onNo = () => {
        if (numberOfTries === 0) {
            dispatch(tttUpdateResult(true, 2));
        } else {
            guessedLetters.push(guess);

            dispatch(updateGuessedLetters(guessedLetters));
            dispatch(updateNumberOfTries(numberOfTries - 1));
            performGuess()
        }
    }

    const onYes = () => {
        dispatch(setGuessedCorrect(true));
    }

    const onConfirmLetter = () => {
        let pos = positions.split(',');
        let iE = true;
        let ns = makeNumbers();

        for (let i = 0; i < pos.length; i++) {
            let num = parseInt(pos[i]);
            if (!ns.includes(num) || wordToGuess[num - 1] !== '_') {
                iE = false;
            }
        }

        if (iE) {
            for (let i = 0; i < pos.length; i++) {
                let num = parseInt(pos[i]) - 1;
                wordToGuess[num] = guess;
            }
            setinputError('');
            dispatch(setGuessedCorrect(false));
            guessedLetters.push(guess);
            dispatch(updateGuessedLetters(guessedLetters));
            dispatch(setWordToGuess(wordToGuess));
            if (wordToGuess.includes('_')) {
                performGuess()
            } else {
                dispatch(tttUpdateResult(true, 1));
            }

        } else {
            setinputError(`Please enter valid comma seperated positions.`);
        }
    }

    const makeNumbers = () => {
        let arr = [];
        for (let i = 0; i < numLetters; i++) {
            arr.push(i + 1);
        }
        return arr;
    }

    // useEffect(() => {
    //     dispatch(setGuessedCorrect(false));
    //     dispatch(setJustUpdated(false));
    //     dispatch(setWordToGuess(createArr(numLetters)));
    //     dispatch(updateNumberOfTries(10));
    //     dispatch(updateGuessedLetters([]));
    // }, [dispatch, numLetters]);

    let alreadyGuessed = <p>The computer has no previous guesses.</p>
    if (guessedLetters.length > 0) {
        alreadyGuessed = <p>The computer's previous guesses: {guessedLetters.map(letter => <span key={letter + (Math.floor(Math.random() * 10000000))}> {letter} </span>)}</p>
    }

    if (!gameStarted) {
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div>
                    <p>What length word are you thinking of?</p>
                    <input className="numberIn" type="number" min="1" max="31"
                        value={nL} onChange={e => setNL(parseInt(e.target.value))}></input>
                    <button onClick={onConfirmLength}>Confirm</button>
                    <br></br>
                    <p>Input must be from 1 to 31.</p>
                </div>
            </div>
        );
    }
    if (gameOver) {
        if (result == 2) {
            return (
                <div className='HangmanChoose'>
                    <h2 className='hangmanTitle'>Hangman</h2>
                    <p>The current word is:</p>
                    <p>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                    {alreadyGuessed}
                    <p>Incorrect guesses remaining: {numberOfTries}</p>
                    <p>Congratulations! You picked a word the AI could not guess.</p>
                </div>
            );
        }
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <p>The current word is:</p>
                <p>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                {alreadyGuessed}
                <p>Incorrect guesses remaining: {numberOfTries}</p>
                <p>Looks like the AI guessed the word you picked.</p>
            </div>
        );
    }
    if (isWaiting) {
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <p>The current word is:</p>
                <p>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                {alreadyGuessed}
                <p>Incorrect guesses remaining: {numberOfTries}</p>
                <p>The computer is guessing a letter.</p>
                <Spinner />
            </div>
        );
    }
    if (guessedCorrect) {
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <p>The current word is:</p>
                <p>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                {alreadyGuessed}
                <p>Incorrect guesses remaining: {numberOfTries}</p>
                <p>The computer's new guess is: {guess}</p>
                <p>Enter the position(s) of the letter seperated by commas.</p>
                <input placeholder="Enter Here!" onChange={e => setPositions(e.target.value)}></input>
                <button onClick={onConfirmLetter}>Confirm</button>
                <p>{inputError}</p>
            </div>
        );
    }
    return (
        <div className='HangmanChoose'>
            <h2 className='hangmanTitle'>Hangman</h2>
            <p>The current word is:</p>
            <p>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
            {alreadyGuessed}
            <p>Incorrect guesses remaining: {numberOfTries}</p>
            <p>The computer's new guess is: {guess}</p>
            <p>Is this correct?</p>
            <button onClick={onYes}>Yes</button>
            <button onClick={onNo}>No</button>
        </div>
    );
}