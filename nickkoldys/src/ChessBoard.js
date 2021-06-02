import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chessMakePieceActive, chessResetActivePiece, chessSetAvailableMoves, chessMovePiece, chessCheckForMate, chessGetAllAvailableMoves, startWaiting, stopWaiting, tttUpdateResult } from './actions';
import './ChessBoard.css';

export function ChessBoard(props) {
    const playable = props.playerActive;
    const turn = useSelector(state => state.turn);
    const isWaiting = useSelector(state => state.isWaiting);
    const board = useSelector(state => state.chessBoard);
    const activePiece = useSelector(state => state.activePiece);
    const availableMoves = useSelector(state => state.availableMoves);
    const lastMove = useSelector(state => state.lastMove);
    const leftWhiteRookAvailable = useSelector(state => state.leftWhiteRookAvailable);
    const leftBlackRookAvailable = useSelector(state => state.leftBlackRookAvailable);
    const rightWhiteRookAvailable = useSelector(state => state.rightWhiteRookAvailable);
    const rightBlackRookAvailable = useSelector(state => state.rightBlackRookAvailable);
    const whiteKingAvailable = useSelector(state => state.whiteKingAvailable);
    const blackKingAvailable = useSelector(state => state.blackKingAvailable);
    const whiteKingPosition = useSelector(state => state.whiteKingPosition);
    const blackKingPosition = useSelector(state => state.blackKingPosition);
    const allAvailableMoves = useSelector(state => state.allAvailableMoves);
    const allAvailableMovesGenerated = useSelector(state => state.allAvailableMovesGenerated);
    const dispatch = useDispatch();

    let pieces = new Map()
    pieces.set('', { piece: <span className='chessPiece'></span> })
    pieces.set('wk', { piece: <span className='chessPiece'>&#9812;</span> })
    pieces.set('wq', { piece: <span className='chessPiece'>&#9813;</span> })
    pieces.set('wr', { piece: <span className='chessPiece'>&#9814;</span> })
    pieces.set('wb', { piece: <span className='chessPiece'>&#9815;</span> })
    pieces.set('wkn', { piece: <span className='chessPiece'>&#9816;</span> })
    pieces.set('wp', { piece: <span className='chessPiece'>&#9817;</span> })
    pieces.set('bk', { piece: <span className='chessPiece'>&#9818;</span> })
    pieces.set('bq', { piece: <span className='chessPiece'>&#9819;</span> })
    pieces.set('br', { piece: <span className='chessPiece'>&#9820;</span> })
    pieces.set('bb', { piece: <span className='chessPiece'>&#9821;</span> })
    pieces.set('bkn', { piece: <span className='chessPiece'>&#9822;</span> })
    pieces.set('bp', { piece: <span className='chessPiece'>&#9823;</span> })

    // console.log('*********************')
    // if (chessCheckForMate(board, whiteKingPosition, 'w')) {
    //     console.log('White in check')
    // } else {
    //     console.log('White not in check')
    // }
    // if (chessCheckForMate(board, blackKingPosition, 'b')) {
    //     console.log('Black in check')
    // } else {
    //     console.log('Black not in check')
    // }
    // console.log(allAvailableMoves)



    useEffect(() => {
        if (!allAvailableMovesGenerated) {
            console.log('New turns generated')
            if (turn % 2 == 0) {
                dispatch(startWaiting())
                dispatch(chessGetAllAvailableMoves(board, lastMove, whiteKingAvailable, leftWhiteRookAvailable, rightWhiteRookAvailable, whiteKingPosition, turn))
                dispatch(stopWaiting())
            } else {
                dispatch(startWaiting())
                dispatch(chessGetAllAvailableMoves(board, lastMove, blackKingAvailable, leftBlackRookAvailable, rightBlackRookAvailable, blackKingPosition, turn))
                dispatch(stopWaiting())
            }
        } else {
            if (allAvailableMoves.size == 0) {
                if (turn % 2 == 0) {
                    if (chessCheckForMate(board, whiteKingPosition, 'w')) {
                        tttUpdateResult(true, 2)
                    } else {
                        tttUpdateResult(true, 0)
                    }
                } else {
                    if (chessCheckForMate(board, blackKingPosition, 'b')) {
                        tttUpdateResult(true, 1)
                    } else {
                        tttUpdateResult(true, 0)
                    }
                }
            }
        }
    }, [dispatch, turn]);

    useEffect(() => {
        //console.log('check end')
        if (allAvailableMoves.size == 0 && turn > 0) {
            if (turn % 2 == 0) {
                if (chessCheckForMate(board, whiteKingPosition, 'w')) {
                    dispatch(tttUpdateResult(true, 2))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            } else {
                if (chessCheckForMate(board, blackKingPosition, 'b')) {
                    dispatch(tttUpdateResult(true, 1))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            }
        }
    }, [dispatch, allAvailableMovesGenerated])
    console.log('********************')
    return (
        <div className='ChessBoard'>
            <div className="chessTable">
                {board.map((w, i) => {
                    return w.map((v, j) => {
                        const actionOnClick = () => {
                            if (playable) {
                                if (i == activePiece.position.row && j == activePiece.position.col) {
                                    dispatch(startWaiting())
                                    dispatch(chessResetActivePiece())
                                    dispatch(chessSetAvailableMoves(new Map()))
                                    dispatch(stopWaiting())
                                } else if (allAvailableMoves.has(`${i}-${j}`)) {
                                    dispatch(startWaiting())
                                    dispatch(chessMakePieceActive(allAvailableMoves.get(`${i}-${j}`), i, j, v))
                                    dispatch(stopWaiting())
                                } else if (availableMoves.has(`${i}-${j}`)) {
                                    dispatch(startWaiting())
                                    dispatch(chessMovePiece(board, activePiece, availableMoves.get(`${i}-${j}`), turn))
                                    dispatch(stopWaiting())
                                }
                            }
                        }
                        let image = pieces.get(v).piece
                        if ((i == lastMove.startPosition.row && j == lastMove.startPosition.col) || (i == lastMove.endPosition.row && j == lastMove.endPosition.col)) {
                            return <div key={`${i}-${j}`} className={`chessBoardTile ${(i % 2 == 1) ? "oddChessRow" : 'evenChessRow'} t${i}-${j}`}>
                                <div className='chessLastMove'>
                                    <div className={(((v[0] == 'w' && turn % 2 == 0) || (v[0] == 'b' && turn % 2 == 1)) && playable) ? `chessSquare ${allAvailableMoves.has(`${i}-${j}`) ? 'chessSelectable' : ''} ${availableMoves.has(`${i}-${j}`) ? 'chessSquareAvailable' : ''}` : `chessSquare ${availableMoves.has(`${i}-${j}`) ? 'chessSquareAvailable' : ''}`} onClick={actionOnClick}>
                                        {image}
                                    </div>
                                </div>
                            </div>
                        }
                        return <div key={`${i}-${j}`} className={`chessBoardTile ${(i % 2 == 1) ? "oddChessRow" : 'evenChessRow'} t${i}-${j}`}>
                            <div className={(((v[0] == 'w' && turn % 2 == 0) || (v[0] == 'b' && turn % 2 == 1)) && playable) ? `chessSquare ${allAvailableMoves.has(`${i}-${j}`) ? 'chessSelectable' : ''} ${availableMoves.has(`${i}-${j}`) ? 'chessSquareAvailable' : ''}` : `chessSquare ${availableMoves.has(`${i}-${j}`) ? 'chessSquareAvailable' : ''}`} onClick={actionOnClick}>
                                {image}
                            </div>
                        </div>
                    })
                })}
            </div>
        </div>
    );
}