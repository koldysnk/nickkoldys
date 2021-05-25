import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { ChessBoard } from './ChessBoard';
//import {chessResetGame} from './actions';
import './ChessMultiplayer.css';
import { ChessPromotion } from './ChessPromotion';

export function ChessMultiplayer(props) {
    const turn = useSelector(state => state.turn);
    const gameOver = useSelector(state => state.gameOver);
    const result = useSelector(state => state.gameResult);
    const isWaiting = useSelector(state => state.isWaiting);
    const promotionActive = useSelector(state => state.promotionActive)
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

    turnText = turnText.concat(" (Work in Progress)")

    const reset = () => {
        
    }

    

    let board = <ChessBoard playable={playable}/>
    if(promotionActive){
        board = <div className='chessBoardBox'>
        <ChessBoard playable={false}/>
        <ChessPromotion />
        </div>
    }

    return (
        <div className='ChessMultiplayer'>
            <h2 className='chessTitle'>Chess</h2>
            <p>{turnText}</p>
            {board}
            <button className='chessSingleplayerButton chessButton' onClick={reset}>Reset</button>
        </div>
    );
}