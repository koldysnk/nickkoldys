import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { chessResetGame,chessRandAITurn, startWaiting, stopWaiting, tttSetPlayerFirst } from './actions';
import { ChessBoard } from './ChessBoard';
import './ChessMultiplayer.css';
import { ChessPromotion } from './ChessPromotion';

export function ChessSingleplayer(props) {
    const turn = useSelector(state => state.turn);
    const gameOver = useSelector(state => state.gameOver);
    const result = useSelector(state => state.gameResult);
    const isWaiting = useSelector(state => state.isWaiting);
    const promotionActive = useSelector(state => state.promotionActive)
    const playerFirst = useSelector(state => state.playerFirst);
    const allAvailableMoves = useSelector(state => state.allAvailableMoves);
    const allAvailableMovesGenerated = useSelector(state => state.allAvailableMovesGenerated);
    const chessBoard = useSelector(state => state.chessBoard);
    const lastMove = useSelector(state => state.lastMove);
    const leftWhiteRookAvailable = useSelector(state => state.leftWhiteRookAvailable);
    const leftBlackRookAvailable = useSelector(state => state.leftBlackRookAvailable);
    const rightWhiteRookAvailable = useSelector(state => state.rightWhiteRookAvailable);
    const rightBlackRookAvailable = useSelector(state => state.rightBlackRookAvailable);
    const whiteKingAvailable = useSelector(state => state.whiteKingAvailable);
    const blackKingAvailable = useSelector(state => state.blackKingAvailable);
    const whiteKingPosition = useSelector(state => state.whiteKingPosition);
    const blackKingPosition = useSelector(state => state.blackKingPosition);
    const dispatch = useDispatch();

    let turnText = "Analyzing..."
    let playerActive = turn%2 == 0;
    let playable = playerActive;

    if(!isWaiting){
        turnText = (playable) ? "Player 1's Turn" : "AI Nick's Turn";

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
        if(!gameOver){
            if(!playerActive && playerFirst){
                dispatch(chessRandAITurn(chessBoard, turn,lastMove, blackKingAvailable, leftBlackRookAvailable, rightBlackRookAvailable, blackKingPosition))
            }else if(playerActive && !playerFirst){
                dispatch(chessRandAITurn(chessBoard, turn,lastMove, whiteKingAvailable, leftWhiteRookAvailable, rightWhiteRookAvailable, whiteKingPosition))
            }
        }
    }, [dispatch,turn])

    turnText = turnText.concat(" (Work in Progress)")

    const reset = () => {
        dispatch(startWaiting())
        dispatch(chessResetGame())
        dispatch(stopWaiting())
    }

    const swapTurn = () => {
        dispatch(startWaiting())
        dispatch(chessResetGame())
        dispatch(tttSetPlayerFirst(!playerFirst))
        dispatch(stopWaiting())
    }

    

    let board = <ChessBoard playable={((playerFirst ? playable : !playable)  && !gameOver)}/>
    if(promotionActive){
        board = <div className='chessBoardBox'>
        <ChessBoard playable={false}/>
        <ChessPromotion />
        </div>
    }

    return (
        <div className='ChessSingleplayer'>
            <h2 className='chessTitle'>Chess</h2>
            <p>{turnText}</p>
            {board}
            <div>
            <button className='chessSingleplayerButton chessButton' onClick={reset}>Reset</button>
            <button className='tttGoSecond tttButton' onClick={swapTurn}>Go {playerFirst ? 'Second' : 'First'}</button>
            </div>
        </div>
    );
}