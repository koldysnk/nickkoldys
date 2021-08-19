import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { chessResetGame,chessRandAITurn, startWaiting, stopWaiting, tttSetPlayerFirst, chessBasicAITurn, chessBasicWeightedAITurn,chessBasicMinMaxAITurn, chessAlphaBetaMinMaxAITurn,chessAlphaBetaAndQuiescenceMinMaxAITurn } from './actions';
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
    const maxRecursionLevel = useSelector(state => state.maxRecursionLevel);
    const lastThreeMoveNodeCount = useSelector(state => state.lastThreeMoveNodeCount);
    const boardStateCount = useSelector(state => state.boardStateCount);
    const dispatch = useDispatch();

    let turnText = "Analyzing..."
    let playerActive = (turn%2 == 0 && playerFirst) || (turn%2 == 1 && !playerFirst);

    if(!isWaiting){
        turnText = (playerActive) ? "Player 1's Turn" : "AI Nick's Turn";

        if (gameOver){
            playerActive = false;
            if (result==0){
                turnText = "Game Over: Tie"
            }else if((result == 1 && playerFirst) || (result == 2 && !playerFirst)){
                turnText = 'Game Over: Player 1 Wins'
            }else{
                turnText = `Game Over: AI Nick Wins`
            }
        }
    }else{
        playerActive = false;
    }

    useEffect(() => {
        if(!gameOver && !playerActive){
            // if(playerFirst){
            //     dispatch(chessBasicWeightedAITurn(chessBoard, turn,lastMove, blackKingAvailable, leftBlackRookAvailable, rightBlackRookAvailable, blackKingPosition))
            // }else{
            //     dispatch(chessBasicWeightedAITurn(chessBoard, turn,lastMove, whiteKingAvailable, leftWhiteRookAvailable, rightWhiteRookAvailable, whiteKingPosition))
            // }
            dispatch(chessBasicMinMaxAITurn(chessBoard, turn, lastMove, whiteKingAvailable, leftWhiteRookAvailable, rightWhiteRookAvailable, whiteKingPosition, blackKingAvailable, leftBlackRookAvailable, rightBlackRookAvailable, blackKingPosition,boardStateCount))
            //dispatch(chessAlphaBetaMinMaxAITurn(chessBoard, turn,lastMove, whiteKingAvailable, leftWhiteRookAvailable, rightWhiteRookAvailable, whiteKingPosition, blackKingAvailable, leftBlackRookAvailable, rightBlackRookAvailable, blackKingPosition,maxRecursionLevel,lastThreeMoveNodeCount,boardStateCount))
        }
        // else if(!gameOver){
        //     dispatch(chessAlphaBetaAndQuiescenceMinMaxAITurn(chessBoard, turn,lastMove, whiteKingAvailable, leftWhiteRookAvailable, rightWhiteRookAvailable, whiteKingPosition, blackKingAvailable, leftBlackRookAvailable, rightBlackRookAvailable, blackKingPosition,maxRecursionLevel,lastThreeMoveNodeCount,boardStateCount))
        // }
    }, [dispatch,turn,playerFirst])

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

    

    let board = <ChessBoard playerActive={playerActive  && !gameOver}/>
    if(promotionActive){
        board = <div className='chessBoardBox'>
        <ChessBoard playerActive={false}/>
        <ChessPromotion />
        </div>
    }

    return (
        <div className='ChessSingleplayer'>
            <h2 className='pageTitle'>Chess</h2>
            <p>{turnText}</p>
            {board}
            <div>
            <button className='chessSingleplayerButton chessButton' onClick={reset}>Reset</button>
            <button className='tttGoSecond tttButton' onClick={swapTurn}>Go {playerFirst ? 'Second' : 'First'}</button>
            </div>
            <h3 className='descriptionTitle'>Description</h3>
            <p className='descriptionText'>
                The chess AI I developed uses a combination of multiple commonly known game AI techniques.
                The AI is deterministic and the back bone of the algorithm is MinMax analysis. The 
                evaluation function uses both piece availability and piece position to detirmine a score for each side.
                To improve the efficiency of the MinMax tree I added Alph Beta pruning which reduces the amount of node searches but does not change
                the outcome of the analysis. Move ordering is used to find Beta cut offs earlier which greatly reduces the 
                number of nodes searched. I am currently working on adding a quiescence search to continue evaluating after 
                the max depth is reached until there are only quiet moves left.
            </p>
            <br></br>
        </div>
    );
}