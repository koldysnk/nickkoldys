import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startHangman, makeGuess, updateGuessedLetters, updateNumberOfTries, setGuessedCorrect, setWordToGuess, tttUpdateResult, wordLost } from './actions';
import './HangmanChoose.css';
import { HangmanDrawing } from './HangmanDrawing';
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
    const wordUpdated = useSelector(state => state.wordUpdated);
    const [positions, setPositions] = useState('');
    const [wordToUpdate, setWordToUpdate] = useState('');
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

    const updateWord = () => {
        dispatch(wordLost(wordToUpdate))
    }

    let alreadyGuessed = <p className='hangmanContentP'>The computer has no previous guesses.</p>
    if (guessedLetters.length > 0) {
        alreadyGuessed = <p className='hangmanContentP'>The computer's previous guesses: <br></br>{guessedLetters.map(letter => <span key={letter + (Math.floor(Math.random() * 10000000))}> {letter} </span>)}</p>
    }

    if (!gameStarted) {
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div className='hangmanContent'>
                    <p className='hangmanContentP'>What length word are you thinking of?</p>
                    <div className='hangmanInput'>
                        <input className="numberIn" type="number" min="1" max="31"
                            value={nL} onChange={e => setNL(parseInt(e.target.value))}></input>
                        <button onClick={onConfirmLength}>Confirm</button>
                    </div>
                    <br></br>
                    <p className='hangmanContentP'>Input must be from 1 to 31.</p>
                </div>
            </div>
        );
    }
    if (gameOver) {
        if (result == 2 ) {
            if(!wordUpdated){
            return (
                <div className='HangmanChoose'>
                    <h2 className='hangmanTitle'>Hangman</h2>
                    <div className='hangmanContent'>
                        <p className='hangmanContentP'>The current word is:</p>
                        <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                        <br></br>
                        <HangmanDrawing lives={-1} />
                        <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                        {alreadyGuessed}
                        <p className='hangmanContentP'>Congratulations! You picked a word the AI could not guess.</p>
                        <p className='hangmanContentP'>What was the word you picked?</p>
                        <div className='hangmanInput'>
                            <input placeholder="Enter Here!" onChange={e => setWordToUpdate(e.target.value)}></input>
                            <button onClick={updateWord}>Confirm</button>
                        </div>
                    </div>
                </div>
            );
            }else{
                return (
                    <div className='HangmanChoose'>
                        <h2 className='hangmanTitle'>Hangman</h2>
                        <div className='hangmanContent'>
                            <p className='hangmanContentP'>The current word is:</p>
                            <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                            <br></br>
                            <HangmanDrawing lives={-1} />
                            <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                            {alreadyGuessed}
                            <p className='hangmanContentP'>Congratulations! You picked a word the AI could not guess.</p>
                            <p className='hangmanContentP'>Thanks!</p>
                        </div>
                    </div>
                );
            }
        } else if(result == 3){
            return (
                <div className='HangmanChoose'>
                    <h2 className='hangmanTitle'>Hangman</h2>
                    <div className='hangmanContent'>
                        <p className='hangmanContentP'>The current word is:</p>
                        <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                        <br></br>
                        <HangmanDrawing lives={-1} />
                        <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                        {alreadyGuessed}
                        <p className='hangmanContentP'>The word you picked was not in the dictionary.</p>
                    </div>
                </div>
            );
        }
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div className='hangmanContent'>
                    <p className='hangmanContentP'>The current word is:</p>
                    <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                    <br></br>
                    <HangmanDrawing lives={numberOfTries} />
                    <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                    {alreadyGuessed}
                    <p className='hangmanContentP'>Looks like the AI guessed the word you picked.</p>
                </div>
            </div>
        );
    }
    if (isWaiting) {
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div className='hangmanContent'>
                    <p className='hangmanContentP'>The current word is:</p>
                    <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                    <br></br>
                    <HangmanDrawing lives={numberOfTries} />
                    <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                    {alreadyGuessed}
                    <p className='hangmanContentP'>The computer is guessing a letter.</p>
                </div>
            </div>
        );
    }
    if (guessedCorrect) {
        return (
            <div className='HangmanChoose'>
                <h2 className='hangmanTitle'>Hangman</h2>
                <div className='hangmanContent'>
                    <p className='hangmanContentP'>The current word is:</p>
                    <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                    <br></br>
                    <HangmanDrawing lives={numberOfTries} />
                    <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                    {alreadyGuessed}
                    <p className='hangmanContentP'>The computer's new guess is: {guess}</p>
                    <p className='hangmanContentP'>Enter the position(s) of the letter seperated by commas.</p>
                    <div className='hangmanInput'>
                        <input placeholder="Enter Here!" onChange={e => setPositions(e.target.value)}></input>
                        <button onClick={onConfirmLetter}>Confirm</button>
                    </div>
                    <p className='hangmanContentP'>{inputError}</p>
                </div>
            </div>
        );
    }
    return (
        <div className='HangmanChoose'>
            <h2 className='hangmanTitle'>Hangman</h2>
            <div className='hangmanContent'>
                <p className='hangmanContentP'>The current word is:</p>
                <p className='hangmanContentP'>{wordToGuess.map((letter, key) => <span key={key}> {letter} </span>)}</p>
                <br></br>
                <HangmanDrawing lives={numberOfTries} />
                <p className='hangmanContentP'>Incorrect guesses remaining: {numberOfTries}</p>
                {alreadyGuessed}
                <p className='hangmanContentP'>The computer's new guess is: {guess}</p>
                <p className='hangmanContentP'>Is this correct?</p>
                <div className='hangmanInput'>
                    <button onClick={onYes}>Yes</button>
                    <button onClick={onNo}>No</button>
                </div>
            </div>
        </div>
    );
}