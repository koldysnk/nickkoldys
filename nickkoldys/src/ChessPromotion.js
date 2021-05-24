import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chessMakePieceActive, chessResetActivePiece, chessSetAvailableMoves, chessMovePiece } from './actions';
import './ChessBoard.css';

export function ChessPromotion(props) {
    
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


    return (
        <div className='ChessPromotion'>
        </div>
    );
}