import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {tttTakeTurn} from './actions';
import './TicTacToeBoard.css';

export function TicTacToeBoard(props) {
    const playable = props.playable;
    const turn = useSelector(state => state.turn);
    const board = useSelector(state => state.tttBoard);
    const dispatch = useDispatch();


    
    const takeTurn = (open,position) => {
        if(open){
            dispatch(tttTakeTurn(position, board, turn))
        }
    }

    return (
        <div className='TicTacToeBoard'>
            <div className="tttTable">
                {board.map((v, i) => {
                    const turnOnClick= () => {
                        if(playable){
                            takeTurn((v == 0) ? true : false,i)
                        }
                    }
                    let image = <div></div>
                    if(v == 1){
                        image = <img className='tttImage' src="x.png"></img>
                    }else if(v == 2){
                        image = <img className='tttImage' src="o.png"></img>
                    }
                    return <div key={i} className={`tttTile t${i}`} onClick={turnOnClick}>
                        <div className={((v == 0) && playable)  ? "tttSquare tttSelectable" : "tttSquare"}>
                            {image}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}