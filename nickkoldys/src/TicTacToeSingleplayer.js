import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { TicTacToeBoard } from './TicTacToeBoard';
import {tttResetGame, tttAITurn, tttSetPlayerFirstAndReset} from './actions';
import './TicTacToeSingleplayer.css';

export function TicTacToeSingleplayer(props) {
    const turn = useSelector(state => state.turn);
    const gameOver = useSelector(state => state.gameOver);
    const result = useSelector(state => state.gameResult);
    const isWaiting = useSelector(state => state.isWaiting);
    const board = useSelector(state => state.tttBoard);
    const playerFirst = useSelector(state => state.playerFirst);
    const dispatch = useDispatch();

    let turnText = "Analyzing..."
    let playerActive = turn%2 == 0;
    let playable = playerActive;
    if(!isWaiting){
        if(playerFirst){
            turnText = (playerActive) ? "Player 1's Turn" : "AI Nick's Turn";
        }else{
            turnText = (playerActive) ? "AI Nick's Turn" : "Player 1's Turn";
        }

        if (gameOver){
            playable = false;
            if (result==0){
                turnText = "Game Over: Tie"
            }else if((result == 1 && playerFirst) || (result == 2 && !playerFirst)){
                turnText = 'Game Over: Player 1 Wins'
            }else{
                turnText = `Game Over: AI Nick Wins`
            }
        } 
        
    }else{
        playable = false;
    }

    
    useEffect(() => {
        if(!gameOver && ((!playerActive && playerFirst) || (playerActive && !playerFirst))){
            dispatch(tttAITurn(board, turn))
        }
    }, [dispatch,turn,playerFirst])

    const reset = () => {
        dispatch(tttResetGame())
    }

    const swapTurn = () => {
        dispatch(tttSetPlayerFirstAndReset(!playerFirst))
    }

    return (
        <div className='TicTacToeSingleplayer'>
            <h2 className='tttTitle'>Tic-Tac-Toe</h2>
            <p>{turnText}</p>
            <TicTacToeBoard playable={((playerFirst ? playable : !playable)  && !gameOver)}/>
            <div>
            <button className='tttSingleplayerButton tttButton' onClick={reset}>Reset</button>

            <button className='tttGoSecond tttButton' onClick={swapTurn}>Go {playerFirst ? 'Second' : 'First'}</button>
            </div>
            <h3 className='descriptionTitle'>Description</h3>
            <p className='descriptionText'>
                The Tic-Tac-Toe computer uses a rudementary MinMax algorithm to decide where to place it's piece.
                Because there is a relatively low number of game states in Tic-Tac-Toe the computer is able to 
                analyze all possible moves at an arbitrary depth to an end state without any optimization strategies.
            </p>
        </div>
    );
}