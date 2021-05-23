import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { chessMakePieceActive, chessResetActivePiece, chessSetAvailableMoves, chessMovePiece } from './actions';
import './ChessBoard.css';

export function ChessBoard(props) {
    const playable = props.playable;
    const turn = useSelector(state => state.turn);
    const board = useSelector(state => state.chessBoard);
    const activePiece = useSelector(state => state.activePiece);
    const availableMoves = useSelector(state => state.availableMoves);
    const lastMove = useSelector(state => state.lastMove);
    const dispatch = useDispatch();

    let pieces = new Map()
    pieces.set('',{piece: <span className='chessPiece'></span>})
    pieces.set('wk',{piece: <span className='chessPiece'>&#9812;</span>})
    pieces.set('wq',{piece: <span className='chessPiece'>&#9813;</span>})
    pieces.set('wr',{piece: <span className='chessPiece'>&#9814;</span>})
    pieces.set('wb',{piece: <span className='chessPiece'>&#9815;</span>})
    pieces.set('wkn',{piece: <span className='chessPiece'>&#9816;</span>})
    pieces.set('wp',{piece: <span className='chessPiece'>&#9817;</span>})
    pieces.set('bk',{piece: <span className='chessPiece'>&#9818;</span>})
    pieces.set('bq',{piece: <span className='chessPiece'>&#9819;</span>})
    pieces.set('br',{piece: <span className='chessPiece'>&#9820;</span>})
    pieces.set('bb',{piece: <span className='chessPiece'>&#9821;</span>})
    pieces.set('bkn',{piece: <span className='chessPiece'>&#9822;</span>})
    pieces.set('bp',{piece: <span className='chessPiece'>&#9823;</span>})

    const takeTurn = (open,position) => {
        if(open){
            //dispatch(chessTakeTurn(position, board, turn))
        }
    }

    return (
        <div className='ChessBoard'>
            <div className="chessTable">
                {board.map((w, i) => {
                    return w.map((v,j) => {
                        const actionOnClick = () => {
                            if(i == activePiece.position.row && j == activePiece.position.col){
                                dispatch(chessResetActivePiece())
                                dispatch(chessSetAvailableMoves(new Map()))
                            }else if((v[0]=='w' && turn %2 == 0) || (v[0]=='b' && turn %2 == 1)){
                                dispatch(chessMakePieceActive(board,i,j,v,lastMove))
                            }else if(availableMoves.has(`${i}-${j}`)){
                                dispatch(chessMovePiece(board,activePiece,availableMoves.get(`${i}-${j}`), turn))
                            }
                        }
                        let image = pieces.get(v).piece
                        return <div key={`${i}-${j}`} className={`chessBoardTile ${(i%2==1) ? "oddChessRow" : 'evenChessRow'} t${i}-${j}`}>
                            <div className={(((v[0]=='w' && turn % 2 == 0) || (v[0]=='b' && turn % 2 == 1)) && playable)  ? `chessSquare chessSelectable ${availableMoves.has(`${i}-${j}`) ? 'chessSquareAvailable' : ''}` : `chessSquare ${availableMoves.has(`${i}-${j}`) ? 'chessSquareAvailable' : ''}`} onClick={actionOnClick}>
                                {image}
                            </div>
                        </div>
                    })
                })}
            </div>
        </div>
    );
}