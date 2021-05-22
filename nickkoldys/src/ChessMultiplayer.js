import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { ChessBoard } from './ChessBoard';
//import {chessResetGame} from './actions';
import './ChessMultiplayer.css';

export function ChessMultiplayer(props) {
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
        //dispatch(chessResetGame())
    }

    return (
        <div className='ChessMultiplayer'>
            <h2 className='chessTitle'>Chess</h2>
            <p>{turnText}</p>
            <ChessBoard playable={playable}/>
            <button className='chessSingleplayerButton chessButton' onClick={reset}>Reset</button>
        </div>
    );
}