import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { TicTacToeBoard } from './TicTacToeBoard';
import {tttResetGame, tttAITurn} from './actions';
import './TicTacToeSingleplayer.css';

export function TicTacToeSingleplayer(props) {
    const turn = useSelector(state => state.turn);
    const gameOver = useSelector(state => state.gameOver);
    const result = useSelector(state => state.gameResult);
    const isWaiting = useSelector(state => state.isWaiting);
    const board = useSelector(state => state.tttBoard);
    const dispatch = useDispatch();

    let turnText = "Analyzing..."
    let playerActive = turn%2 == 0;
    let playable = playerActive;

    if(!isWaiting){
        turnText = (playerActive) ? "Player 1's Turn" : "AI Nick's Turn";

        if (gameOver){
            playable = false;
            if (result==0){
                turnText = "Game Over: Tie"
            }else if(result == 1){
                turnText = 'Game Over: Player 1 Wins'
            }else{
                turnText = `Game Over: AI Nick Wins`
            }
        }else if(!playerActive){
            console.log('AI turn')
            dispatch(tttAITurn(board, turn))
        }
        
    }else{
        playable = false;
    }

    const reset = () => {
        dispatch(tttResetGame())
    }

    return (
        <div className='TicTacToeSingleplayer'>
            <h2 className='tttTitle'>Tic-Tac-Toe</h2>
            <p>{turnText}</p>
            <TicTacToeBoard playable={playable}/>
            <button className='tttSingleplayerButton' onClick={reset}>Reset</button>
        </div>
    );
}