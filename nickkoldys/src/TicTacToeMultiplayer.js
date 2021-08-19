import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { TicTacToeBoard } from './TicTacToeBoard';
import {tttResetGame} from './actions';
import './TicTacToeMultiplayer.css';

export function TicTacToeMultiplayer(props) {
    const turn = useSelector(state => state.turn);
    const gameOver = useSelector(state => state.gameOver);
    const result = useSelector(state => state.gameResult);
    const isWaiting = useSelector(state => state.isWaiting);
    const dispatch = useDispatch();

    let turnText = "Analyzing..."
    let playable = true;

    if(!isWaiting){
        turnText = (turn % 2 == 0) ? "Player 1's Turn" : "Player 2's Turn";

        if (gameOver){
            playable = false;
            if (result==0){
                turnText = "Game Over: Tie"
            }else{
                turnText = `Game Over: Player ${result} Wins`
            }
        }
    }else{
        playable = false;
    }

    const reset = () => {
        dispatch(tttResetGame())
    }

    return (
        <div className='TicTacToeMultiplayer'>
            <h2 className='pageTitle'>Tic-Tac-Toe</h2>
            <p>{turnText}</p>
            <TicTacToeBoard playable={playable}/>
            <button className='tttSingleplayerButton tttButton' onClick={reset}>Reset</button>
        </div>
    );
}